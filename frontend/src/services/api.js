const API_URL = "http://localhost:5000/api";

export const fetchPlayers = async () => {
  const response = await fetch(`${API_URL}/players`);
  if (!response.ok) throw new Error("Failed to fetch players");
  return response.json();
};

export const fetchStats = async () => {
  const response = await fetch(`${API_URL}/players/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats");
  return response.json();
};

export const searchPlayers = async (term) => {
  const response = await fetch(`${API_URL}/players/search?term=${term}`);
  if (!response.ok) throw new Error("Failed to search players");
  return response.json();
};

export const filterPlayers = async (level) => {
  const response = await fetch(`${API_URL}/players/filter?level=${level}`);
  if (!response.ok) throw new Error("Failed to filter players");
  return response.json();
};

export const fetchPlayerStats = async () => {
  try {
    const response = await fetch(`${API_URL}/players/stats`);
    if (!response.ok) {
      throw new Error("Failed to fetch player stats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching player stats:", error);
    return [];
  }
};

export const resetPlayerStats = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}/reset`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to reset player stats");
    }
    return await response.json();
  } catch (error) {
    console.error("Error resetting player stats:", error);
    throw error;
  }
};
