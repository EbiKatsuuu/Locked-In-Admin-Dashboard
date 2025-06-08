import { Users, Sword, Puzzle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPlayerStats } from "../services/api";

const STATS_CONFIG = [
  {
    icon: Users,
    label: "TOTAL_PLAYERS",
    key: "total_players",
    suffix: "REGISTERED",
    formatter: (data) => data.total_players || 0,
  },
  {
    icon: Sword,
    label: "ENEMIES_DEFEATED",
    key: "total_enemies_defeated", 
    suffix: "KILLS",
    formatter: (data) => data.total_enemies_defeated || 0,
  },
  {
    icon: Puzzle,
    label: "PUZZLE_ROOMS",
    key: "total_puzzle_rooms_entered",
    suffix: "ENTERED",
    formatter: (data) => data.total_puzzle_rooms_entered || 0,
  },
  {
    icon: Zap,
    label: "TOP_UPGRADE",
    key: "most_collected_upgrade",
    suffix: (data) => {
      const upgradeName = data.most_collected_upgrade || "None";
      const count = data.upgrade_distribution?.[upgradeName] || 0;
      return `${count} USES`;
    },
    formatter: (data) => {
      const upgrade = data.most_collected_upgrade || "None";
      // Truncate long upgrade names for display
      return upgrade.length > 15 ? upgrade.substring(0, 15) + "..." : upgrade;
    },
  }
];

const processStatsData = (data) => ({
  ...data,
  total_players: parseInt(data.total_players) || 0,
  total_enemies_defeated: parseInt(data.total_enemies_defeated) || 0,
  total_puzzle_rooms_entered: parseInt(data.total_puzzle_rooms_entered) || 0,
  most_collected_upgrade: data.most_collected_upgrade || "None",
  upgrade_distribution: data.upgrade_distribution || {}
});

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, idx) => (
      <div
        key={idx}
        className="stat-card bg-blue-950 border-2 border-yellow-400 rounded-lg p-6 animate-pulse"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-yellow-400/20 rounded"></div>
            <div className="h-8 w-16 bg-white/20 rounded"></div>
            <div className="h-3 w-24 bg-yellow-400/20 rounded"></div>
          </div>
          <div className="h-14 w-14 border-2 border-yellow-400/20 rounded-md"></div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorDisplay = ({ error }) => (
  <div className="bg-blue-950 border-2 border-red-400 rounded-lg p-6">
    <p className="text-red-400 font-mono">Error loading stats: {error}</p>
  </div>
);

const StatIcon = ({ Icon }) => (
  <div
    className="h-14 w-14 border-2 border-yellow-400 flex items-center justify-center rounded-md"
    style={{ boxShadow: "0 0 15px #facc15" }}
  >
    <Icon className="h-7 w-7 text-yellow-400" />
  </div>
);

const StatCard = ({ stat, data }) => {
  const value = stat.formatter(data);
  const suffix = typeof stat.suffix === "function" ? stat.suffix(data) : stat.suffix;

  return (
    <div className="stat-card bg-blue-950 border-2 border-yellow-400 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-yellow-400 font-mono text-sm">{stat.label}</p>
          <p 
            className="text-2xl font-bold text-white"
            style={{ textShadow: "0 0 10px #fff" }}
            title={stat.key === "most_collected_upgrade" ? data.most_collected_upgrade : undefined}
          >
            {String(value)}
          </p>
          <p className="text-yellow-300 font-mono text-xs">{String(suffix)}</p>
        </div>
        <StatIcon Icon={stat.icon} />
      </div>
    </div>
  );
};

const StatsCards = ({ stats: propStats }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      // If stats are passed as props, use them directly
      if (propStats) {
        setStats(processStatsData(propStats));
        setLoading(false);
        return;
      }

      // Otherwise fetch from API
      try {
        const data = await fetchPlayerStats();
        setStats(processStatsData(data));
      } catch (error) {
        console.error("Error loading stats:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [propStats]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS_CONFIG.map((stat, idx) => (
        <StatCard key={idx} stat={stat} data={stats} />
      ))}
    </div>
  );
};

export default StatsCards;