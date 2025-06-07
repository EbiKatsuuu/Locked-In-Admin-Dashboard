import { Monitor, Smartphone, Puzzle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPlayerStats } from "../services/api";

const STATS_CONFIG = [
  {
    icon: Monitor,
    label: "PC_PLAYERS",
    key: "platform_distribution",
    suffix: "USERS",
    formatter: (data) => data.platform_distribution?.PC || 0,
  },
  {
    icon: Smartphone,
    label: "MOBILE_PLAYERS",
    key: "platform_distribution",
    suffix: "USERS",
    formatter: (data) => data.platform_distribution?.Mobile || 0,
  },
  {
    icon: Puzzle,
    label: "TOP_RIDDLE",
    key: "riddle_stats",
    suffix: (data) => `${data.riddle_stats?.distribution?.[data.riddle_stats?.most_solved] || 0} SOLVES`,
    formatter: (data) => data.riddle_stats?.most_solved || "N/A",
  },
  {
    icon: Zap,
    label: "TOP_UPGRADE",
    key: "upgrade_stats",
    suffix: (data) => `${data.upgrade_stats?.distribution?.[data.upgrade_stats?.most_popular] || 0} USES`,
    formatter: (data) => data.upgrade_stats?.most_popular || "N/A",
  }
];

const processStatsData = (data) => ({
  ...data,
  total_players: parseInt(data.total_players) || 0,
  total_deaths: parseInt(data.total_deaths) || 0,
  avg_time: parseFloat(data.avg_time) || 0,
  top_level: parseInt(data.top_level) || 0,
  riddle_stats: data.riddle_stats || {},
  upgrade_stats: data.upgrade_stats || {}
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
          <p className="text-2xl font-bold text-white">{String(value)}</p>
          <p className="text-yellow-300 font-mono text-xs">{String(suffix)}</p>
        </div>
        <StatIcon Icon={stat.icon} />
      </div>
    </div>
  );
};

const StatsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
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
  }, []);

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
