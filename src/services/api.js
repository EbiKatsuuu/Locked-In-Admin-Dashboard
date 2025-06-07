import { mockPlayers, mockStats } from './mockData';

const API_URL = "http://localhost:5000/api";

export const fetchPlayers = async () => {
  return mockPlayers;
};

export const fetchStats = async () => {
  return mockStats;
};

export const searchPlayers = async (term) => {
  return mockPlayers.filter(player =>
    player.username.toLowerCase().includes(term.toLowerCase())
  );
};

export const filterPlayers = async (level) => {
  if (level === "beginner") {
    return mockPlayers.filter(player => player.current_level <= 5);
  } else if (level === "advanced") {
    return mockPlayers.filter(player => player.current_level > 5);
  }
  return mockPlayers;
};

export const fetchPlayerStats = async () => {
  return mockStats;
};

export const resetPlayerStats = async (playerId) => {
  // Since we're using mock data, we'll just return the same data
  return mockStats;
};
