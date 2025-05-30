import { useEffect, useState } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StatsCards from "./components/StatsCards";
import PlayerTable from "./components/PlayerTable";

// Mock data generator
const generateMockPlayers = () => {
  const usernames = [
    "NinjaWarrior",
    "ShadowBlade",
    "DragonSlayer",
    "PixelHero",
    "EpicGamer",
    "ProGamer123",
    "GameMaster",
    "LevelUp",
    "BossKiller",
    "SpeedRunner",
    "DarkKnight",
    "LightWarrior",
    "CyberNinja",
    "RetroGamer",
    "ElitePlayer",
  ];

  return usernames.map((username) => ({
    username,
    currentLevel: Math.floor(Math.random() * 15) + 1,
    deaths: Math.floor(Math.random() * 20),
    totalTime: Math.floor(Math.random() * 120) + 30,
  }));
};

export default function PlayerStatsDashboard() {
  const [stats, setStats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data
    setIsLoading(true);
    setTimeout(() => {
      setStats(generateMockPlayers());
      setIsLoading(false);
    }, 1000);
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStats(generateMockPlayers());
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStats();
  };

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Username,Level,Deaths,Time Played,Status\n" +
      stats
        .map(
          (player) =>
            `${player.username},${player.currentLevel},${player.deaths},${
              player.totalTime
            },${player.currentLevel > 5 ? "Advanced" : "Beginner"}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "player_stats.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate statistics
  const totalDeaths = stats.reduce((acc, player) => acc + player.deaths, 0);
  const averageTime =
    stats.length > 0
      ? (
          stats.reduce((acc, player) => acc + player.totalTime, 0) /
          stats.length
        ).toFixed(1)
      : 0;
  const topPlayer = stats.reduce(
    (max, player) =>
      player.currentLevel > (max?.currentLevel || 0) ? player : max,
    null
  );

  // Filter stats based on search and level filter
  const filteredStats = stats.filter((player) => {
    const matchesSearch = player.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      filterLevel === "all" ||
      (filterLevel === "beginner" && player.currentLevel <= 5) ||
      (filterLevel === "advanced" && player.currentLevel > 5);
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="dashboard-container">
      {/* Arcade-style scanlines overlay */}
      <div className="scanlines" />

      {/* Animated border glow effect */}
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
        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Player Table */}
        <PlayerTable
          stats={stats}
          filteredStats={filteredStats}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
        />
      </div>
    </div>
  );
}
