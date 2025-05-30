import { Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPlayers, resetPlayerStats } from "../services/api";

const LEVEL_THRESHOLD = 5;
const TABLE_HEADERS = ["PLAYER", "LEVEL", "DEATHS", "TIME", "STATUS", "ACTION"];
const FILTER_OPTIONS = {
  ALL: "all",
  BEGINNER: "beginner",
  ADVANCED: "advanced",
};

// Utility functions
const generatePlayerId = (player) =>
  player.id || `player-${player.username}-${Math.random()}`;

const processPlayerData = (data) =>
  Array.isArray(data)
    ? data.map((player) => ({
        ...player,
        id: generatePlayerId(player),
      }))
    : [];

const filterPlayers = (players, searchTerm, filterLevel) =>
  players.filter((player) => {
    const matchesSearch = player.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLevel =
      filterLevel === FILTER_OPTIONS.ALL ||
      (filterLevel === FILTER_OPTIONS.BEGINNER &&
        player.current_level <= LEVEL_THRESHOLD) ||
      (filterLevel === FILTER_OPTIONS.ADVANCED &&
        player.current_level > LEVEL_THRESHOLD);
    return matchesSearch && matchesLevel;
  });

const LoadingSkeleton = () => (
  <div className="bg-blue-950 border-2 border-yellow-400 rounded-lg p-6">
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 bg-yellow-400/20 rounded"></div>
      <div className="h-4 w-32 bg-yellow-400/20 rounded"></div>
      <div className="h-96 bg-yellow-400/10 rounded"></div>
    </div>
  </div>
);

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filterLevel,
  setFilterLevel,
}) => (
  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
      <input
        type="text"
        placeholder="SEARCH_PLAYERS..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="filter-select"
      >
        <option value={FILTER_OPTIONS.ALL}>ALL_LEVELS</option>
        <option value={FILTER_OPTIONS.BEGINNER}>BEGINNER_≤5</option>
        <option value={FILTER_OPTIONS.ADVANCED}>ADVANCED_&gt;5</option>
      </select>
    </div>
  </div>
);

const PlayerAvatar = ({ username }) => (
  <div
    className="w-10 h-10 border-2 border-yellow-400 flex items-center justify-center font-bold"
    style={{ boxShadow: "0 0 10px #facc15" }}
  >
    {username.charAt(0).toUpperCase()}
  </div>
);

const PlayerRow = ({ player, onReset }) => (
  <tr className="table-row">
    <td className="table-cell p-4">
      <div className="flex items-center gap-3">
        <PlayerAvatar username={player.username} />
        <span>{player.username}</span>
      </div>
    </td>
    <td className="p-4">
      <span
        className="px-4 py-2 bg-blue-800/50 border border-yellow-400 text-yellow-400 font-mono font-bold"
        style={{ textShadow: "0 0 5px #facc15" }}
      >
        LVL_{player.current_level}
      </span>
    </td>
    <td className="p-4">
      <span
        className={`font-mono font-bold ${
          player.deaths > 10 ? "text-red-400" : "text-yellow-400"
        }`}
        style={{
          textShadow: `0 0 5px ${player.deaths > 10 ? "#f87171" : "#facc15"}`,
        }}
      >
        {player.deaths}
      </span>
    </td>
    <td className="p-4">
      <span
        className="text-yellow-400 font-mono"
        style={{ textShadow: "0 0 5px #facc15" }}
      >
        {player.total_time}M
      </span>
    </td>
    <td className="p-4">
      <span
        className={`px-3 py-1 border font-mono font-bold ${
          player.current_level > LEVEL_THRESHOLD
            ? "border-yellow-400 text-yellow-400 bg-blue-800/20"
            : "border-yellow-300 text-yellow-300 bg-blue-800/20"
        }`}
        style={{ textShadow: "0 0 5px currentColor" }}
      >
        {player.current_level > LEVEL_THRESHOLD ? "ADVANCED" : "BEGINNER"}
      </span>
    </td>
    <td className="p-4">
      <div className="flex gap-3">
        <button
          className="text-yellow-400 hover:text-yellow-300 font-mono font-bold"
          style={{ textShadow: "0 0 5px #facc15" }}
        >
          VIEW
        </button>
        <button
          onClick={() => onReset(player.id)}
          className="text-red-400 hover:text-red-300 font-mono font-bold"
          style={{ textShadow: "0 0 5px #f87171" }}
        >
          RESET
        </button>
      </div>
    </td>
  </tr>
);

const NoResultsFound = () => (
  <div className="text-center py-16">
    <Search
      className="h-16 w-16 text-yellow-400 mx-auto mb-6"
      style={{ filter: "drop-shadow(0 0 10px #facc15)" }}
    />
    <p
      className="text-red-400 font-mono text-xl font-bold"
      style={{ textShadow: "0 0 10px #f87171" }}
    >
      NO_RECORDS_FOUND
    </p>
    <p className="text-yellow-400 font-mono mt-2">
      &gt; ADJUST_SEARCH_PARAMETERS
    </p>
  </div>
);

const PlayerTable = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState(FILTER_OPTIONS.ALL);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchPlayers();
        setStats(processPlayerData(data));
      } catch (error) {
        console.error("Error loading stats:", error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleReset = async (playerId) => {
    try {
      await resetPlayerStats(playerId);
      const updatedStats = await fetchPlayers();
      setStats(processPlayerData(updatedStats));
    } catch (error) {
      console.error("Error resetting player:", error);
    }
  };

  const filteredStats = filterPlayers(stats, searchTerm, filterLevel);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-blue-950 border-2 border-yellow-400 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="dashboard-title text-3xl">PLAYER_DATABASE</h2>
          <p className="text-yellow-300 font-mono mt-1">
            &gt; SHOWING {filteredStats.length} OF {stats.length} RECORDS
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
        />
      </div>

      <div
        className="overflow-x-auto border-2 border-yellow-400"
        style={{ boxShadow: "0 0 15px #facc15" }}
      >
        <table className="w-full">
          <thead>
            <tr className="table-header">
              {TABLE_HEADERS.map((header) => (
                <th key={header} className="table-header-cell p-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStats.map((player) => (
              <PlayerRow
                key={player.id}
                player={player}
                onReset={handleReset}
              />
            ))}
          </tbody>
        </table>
      </div>

      {filteredStats.length === 0 && <NoResultsFound />}
    </div>
  );
};

export default PlayerTable;
