import { database } from "./firebase";
import { ref, get, remove, set } from 'firebase/database';

// Transform Firebase data to match component expectations
const transformPlayerData = (firebaseData) => {
  if (!firebaseData) return [];
  
  const players = [];
  
  Object.keys(firebaseData).forEach(playerName => {
    const playerRuns = firebaseData[playerName];
    const runsArray = Object.values(playerRuns);
    
    // Calculate aggregate stats for this player
    const totalRuns = runsArray.length;
    const totalDeaths = runsArray.filter(run => !run.wasCompleted).length;
    const totalTime = runsArray.reduce((sum, run) => sum + (run.runDuration || 0), 0);
    const highestLevel = Math.max(...runsArray.map(run => run.highestStageReached || 1));
    const totalUpgrades = runsArray.reduce((sum, run) => sum + (run.totalUpgradesCollected || 0), 0);
    const totalPuzzles = runsArray.reduce((sum, run) => sum + (run.puzzleRoomsEntered || 0), 0);
    const totalEnemies = runsArray.reduce((sum, run) => sum + (run.enemiesKilled || 0), 0);
    
    // Find most recent cause of death (excluding "New run started")
    const getMostRecentCauseOfDeath = () => {
      // Sort runs by timestamp (most recent first)
      const sortedRuns = runsArray
        .filter(run => run.causeOfDeath && run.causeOfDeath !== "New run started")
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      
      if (sortedRuns.length > 0) {
        return sortedRuns[0].causeOfDeath;
      }
      
      // If no meaningful death found, check all runs
      const allSorted = runsArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      return allSorted[0]?.causeOfDeath || "Unknown";
    };
    
    // Find most collected upgrade
    const upgradeFrequency = {};
    runsArray.forEach(run => {
      if (run.mostCollectedUpgrade && run.mostCollectedUpgrade !== "") {
        const upgradeName = run.mostCollectedUpgrade.replace(/"/g, ''); // Remove quotes
        upgradeFrequency[upgradeName] = (upgradeFrequency[upgradeName] || 0) + 1;
      }
    });
    const mostCollectedUpgrade = Object.keys(upgradeFrequency).length > 0 
      ? Object.keys(upgradeFrequency).reduce((a, b) => 
          upgradeFrequency[a] > upgradeFrequency[b] ? a : b
        )
      : "None";
    
    players.push({
      id: `player-${playerName}`,
      username: playerName,
      current_level: highestLevel,
      deaths: totalDeaths,
      total_time: Math.round(totalTime), // in seconds
      total_runs: totalRuns,
      total_enemies: totalEnemies,
      platform: Math.random() > 0.5 ? "PC" : "Mobile", // Since platform isn't in the data
      cause_of_death: getMostRecentCauseOfDeath(), // Added this missing field
      upgrades: {
        most_selected: mostCollectedUpgrade,
        total_collected: totalUpgrades
      },
      riddle_stats: {
        most_solved: "Logic Puzzle", // Placeholder since riddle types aren't specified
        total_solved: totalPuzzles
      },
      runs: runsArray
    });
  });
  
  return players;
};

// Calculate aggregate stats from all player data
const calculateAggregateStats = (players) => {
  if (!players || players.length === 0) {
    return {
      total_players: 0,
      total_enemies_defeated: 0,
      total_puzzle_rooms_entered: 0,
      most_collected_upgrade: "None",
      upgrade_distribution: {}
    };
  }

  const totalPlayers = players.length;
  const totalEnemiesDefeated = players.reduce((sum, player) => sum + (player.total_enemies || 0), 0);
  const totalPuzzleRooms = players.reduce((sum, player) => sum + (player.riddle_stats.total_solved || 0), 0);
  
  // Find most collected upgrade across all players
  const globalUpgradeFreq = {};
  players.forEach(player => {
    // Count each player's runs and their upgrades
    if (player.runs) {
      player.runs.forEach(run => {
        if (run.mostCollectedUpgrade && run.mostCollectedUpgrade !== "") {
          const upgradeName = run.mostCollectedUpgrade.replace(/"/g, '');
          globalUpgradeFreq[upgradeName] = (globalUpgradeFreq[upgradeName] || 0) + 1;
        }
      });
    }
  });
  
  const mostCollectedUpgrade = Object.keys(globalUpgradeFreq).length > 0 
    ? Object.keys(globalUpgradeFreq).reduce((a, b) => 
        globalUpgradeFreq[a] > globalUpgradeFreq[b] ? a : b
      )
    : "None";

  return {
    total_players: totalPlayers,
    total_enemies_defeated: totalEnemiesDefeated,
    total_puzzle_rooms_entered: totalPuzzleRooms,
    most_collected_upgrade: mostCollectedUpgrade,
    upgrade_distribution: globalUpgradeFreq
  };
};

export const fetchPlayers = async () => {
  try {
    // Changed from '/' to '/runs' to access the runs node
    const dbRef = ref(database, '/runs');
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return transformPlayerData(data);
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const fetchPlayerStats = async () => {
  try {
    const players = await fetchPlayers();
    return calculateAggregateStats(players);
  } catch (error) {
    console.error("Error fetching player stats:", error);
    throw error;
  }
};

export const fetchStats = async () => {
  return await fetchPlayerStats();
};

export const searchPlayers = async (term) => {
  try {
    const players = await fetchPlayers();
    return players.filter(player =>
      player.username.toLowerCase().includes(term.toLowerCase())
    );
  } catch (error) {
    console.error("Error searching players:", error);
    throw error;
  }
};

export const filterPlayers = async (level) => {
  try {
    const players = await fetchPlayers();
    
    if (level === "beginner") {
      return players.filter(player => player.current_level <= 5);
    } else if (level === "advanced") {
      return players.filter(player => player.current_level > 5);
    }
    return players;
  } catch (error) {
    console.error("Error filtering players:", error);
    throw error;
  }
};

export const resetPlayerStats = async (playerId) => {
  try {
    // Extract player name from ID
    const playerName = playerId.replace('player-', '');
    // Updated path to include 'runs' node
    const playerRef = ref(database, `/runs/${playerName}`);
    
    // Remove all runs for this player
    await remove(playerRef);
    
    console.log(`Player ${playerName} stats reset successfully`);
    return true;
  } catch (error) {
    console.error("Error resetting player stats:", error);
    throw error;
  }
};

// Additional utility functions for Firebase operations
export const addPlayerRun = async (playerName, runData) => {
  try {
    // Updated path to include 'runs' node
    const runRef = ref(database, `/runs/${playerName}/${runData.runId}`);
    await set(runRef, runData);
    console.log(`Run data added for player ${playerName}`);
    return true;
  } catch (error) {
    console.error("Error adding player run:", error);
    throw error;
  }
};

export const getPlayerRuns = async (playerName) => {
  try {
    // Updated path to include 'runs' node
    const playerRef = ref(database, `/runs/${playerName}`);
    const snapshot = await get(playerRef);
    
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching player runs:", error);
    throw error;
  }
};