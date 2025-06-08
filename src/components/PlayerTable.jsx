import { Search, Filter, Monitor, Smartphone, Zap, Puzzle, Skull, Sword } from "lucide-react";

const LEVEL_THRESHOLD = 5;
const TABLE_HEADERS = ["PLAYER", "PUZZLE_ROOMS", "CAUSE_OF_DEATH", "TIME", "RUNS", "ENEMIES", "TOP_UPGRADE"];
const FILTER_OPTIONS = {
  ALL: "all",
  BEGINNER: "beginner",
  ADVANCED: "advanced",
};

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
        className="search-input pl-10 pr-4 py-2 bg-blue-800/30 border border-yellow-400 text-yellow-400 placeholder-yellow-400/60 font-mono"
      />
    </div>
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-400" />
      <select
        value={filterLevel}
        onChange={(e) => setFilterLevel(e.target.value)}
        className="filter-select pl-10 pr-4 py-2 bg-blue-800/30 border border-yellow-400 text-yellow-400 font-mono"
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
    className="w-10 h-10 border-2 border-yellow-400 flex items-center justify-center font-bold text-yellow-400"
    style={{ boxShadow: "0 0 10px #facc15" }}
  >
    {username.charAt(0).toUpperCase()}
  </div>
);

const PlayerRow = ({ player, onReset }) => (
  <tr className="border-b border-yellow-400/30 hover:bg-blue-800/20">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <PlayerAvatar username={player.username} />
        <span className="text-yellow-400 font-mono">{player.username}</span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <Puzzle className="h-4 w-4 text-purple-400" />
        <span
          className="px-3 py-1 bg-blue-800/50 border border-purple-400 text-purple-400 font-mono font-bold rounded"
          style={{ textShadow: "0 0 5px #c084fc" }}
        >
          {player.riddle_stats?.total_solved || 0}
        </span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <Skull className="h-4 w-4 text-red-400" />
        <span
          className="text-red-400 font-mono text-sm max-w-32 truncate"
          style={{ textShadow: "0 0 5px #f87171" }}
          title={player.cause_of_death || "Unknown"}
        >
          {player.cause_of_death || "Unknown"}
        </span>
      </div>
    </td>
    <td className="p-4">
      <span
        className="text-yellow-400 font-mono"
        style={{ textShadow: "0 0 5px #facc15" }}
      >
        {Math.round(player.total_time / 60)}M
      </span>
    </td>
    <td className="p-4">
      <span
        className="text-yellow-400 font-mono"
        style={{ textShadow: "0 0 5px #facc15" }}
      >
        {player.total_runs}
      </span>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <Sword className="h-4 w-4 text-red-400" />
        <span
          className="text-yellow-400 font-mono"
          style={{ textShadow: "0 0 5px #facc15" }}
        >
          {player.total_enemies || 0}
        </span>
      </div>
    </td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-yellow-400" />
        <span 
          className="text-yellow-400 font-mono"
          title={player.upgrades.most_selected}
        >
          {player.upgrades.most_selected && player.upgrades.most_selected.length > 15 
            ? player.upgrades.most_selected.substring(0, 15) + "..." 
            : player.upgrades.most_selected || "None"}
        </span>
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

const PlayerTable = ({ 
  stats = [], 
  filteredStats = [], 
  searchTerm = "", 
  setSearchTerm, 
  filterLevel = "all", 
  setFilterLevel, 
  onDataUpdate 
}) => {
  const handleReset = async (playerId) => {
    try {
      // Import the reset function here to avoid circular dependencies
      const { resetPlayerStats } = await import("../services/api");
      await resetPlayerStats(playerId);
      
      // Refresh the data in the parent component
      if (onDataUpdate) {
        onDataUpdate();
      }
    } catch (error) {
      console.error("Error resetting player:", error);
      alert("Failed to reset player stats. Please try again.");
    }
  };

  // If no data is provided, show loading
  if (!stats || stats.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-blue-950 border-2 border-yellow-400 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 
            className="text-3xl font-bold text-yellow-400 font-mono"
            style={{ textShadow: "0 0 10px #facc15" }}
          >
            PLAYER_DATABASE
          </h2>
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
        className="overflow-x-auto border-2 border-yellow-400 rounded"
        style={{ boxShadow: "0 0 15px #facc15" }}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-blue-800/50 border-b-2 border-yellow-400">
              {TABLE_HEADERS.map((header) => (
                <th 
                  key={header} 
                  className="p-4 text-left text-yellow-400 font-mono font-bold"
                  style={{ textShadow: "0 0 5px #facc15" }}
                >
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

      {filteredStats.length === 0 && stats.length > 0 && <NoResultsFound />}
    </div>
  );
};

export default PlayerTable;