import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import PlayerTable from "./components/PlayerTable";
import { fetchPlayers, fetchPlayerStats } from "./services/api";

export default function PlayerStatsDashboard() {
  const [stats, setStats] = useState([]);
  const [aggregateStats, setAggregateStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Load both player data and aggregate stats
      const [playersData, statsData] = await Promise.all([
        fetchPlayers(),
        fetchPlayerStats()
      ]);
      
      setStats(playersData);
      setAggregateStats(statsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error.message);
      // Set empty data as fallback
      setStats([]);
      setAggregateStats({
        total_players: 0,
        total_deaths: 0,
        avg_time: 0,
        top_level: 0,
        platform_distribution: { PC: 0, Mobile: 0 },
        upgrade_stats: { most_popular: "None", distribution: {} },
        riddle_stats: { most_solved: "None", distribution: {} }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadAllData();
  };

  const handleExport = () => {
    if (stats.length === 0) {
      alert("No data to export");
      return;
    }

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Username,Level,Deaths,Time Played (minutes),Total Runs,Platform,Top Upgrade,Puzzles Solved\n" +
      stats
        .map(
          (player) =>
            `${player.username},${player.current_level},${player.deaths},${
              Math.round(player.total_time / 60)
            },${player.total_runs},${player.platform},"${player.upgrades.most_selected}",${player.riddle_stats.total_solved}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `player_stats_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter stats based on search and level filter
  const filteredStats = stats.filter((player) => {
    const matchesSearch = player.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      filterLevel === "all" ||
      (filterLevel === "beginner" && player.current_level <= 5) ||
      (filterLevel === "advanced" && player.current_level > 5);
    return matchesSearch && matchesLevel;
  });

  // Error display component
  if (error && stats.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="scanlines" />
        <div className="border-glow">
          <div className="border-glow-top" />
          <div className="border-glow-bottom" />
          <div className="border-glow-left" />
          <div className="border-glow-right" />
        </div>

        <DashboardHeader
          isLoading={isLoading}
          handleRefresh={handleRefresh}
          handleExport={handleExport}
        />

        <div className="relative max-w-7xl mx-auto px-8 py-8">
          <div className="bg-red-950 border-2 border-red-400 rounded-lg p-6 text-center">
            <h2 className="text-red-400 font-mono text-xl font-bold mb-4">
              CONNECTION_ERROR
            </h2>
            <p className="text-red-300 font-mono mb-4">
              Failed to connect to Firebase database
            </p>
            <p className="text-yellow-400 font-mono text-sm mb-4">
              Error: {error}
            </p>
            <button
              onClick={handleRefresh}
              className="arcade-button arcade-button-primary"
              disabled={isLoading}
            >
              RETRY_CONNECTION
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="scanlines" />

      <div className="border-glow">
        <div className="border-glow-top" />
        <div className="border-glow-bottom" />
        <div className="border-glow-left" />
        <div className="border-glow-right" />
      </div>

      <DashboardHeader
        isLoading={isLoading}
        handleRefresh={handleRefresh}
        handleExport={handleExport}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Show connection status */}
        {error && (
          <div className="bg-yellow-950 border-2 border-yellow-400 rounded-lg p-4">
            <p className="text-yellow-400 font-mono text-sm">
              ⚠️ Warning: Using cached data. Connection error: {error}
            </p>
          </div>
        )}

        <StatsCards stats={aggregateStats} />

        <PlayerTable
          stats={stats}
          filteredStats={filteredStats}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          onDataUpdate={loadAllData}
        />
      </div>
    </div>
  );
}
