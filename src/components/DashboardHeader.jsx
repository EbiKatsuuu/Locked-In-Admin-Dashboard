import { RefreshCw, Download, Settings } from "lucide-react";

const DashboardHeader = ({ isLoading, handleRefresh, handleExport }) => {
  return (
    <div className="dashboard-header">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative">
            <h1 className="dashboard-title">LOCKED IN</h1>
            <div className="dashboard-subtitle">ADMIN TERMINAL</div>
            <div className="dashboard-status">
              &gt; MONITORING PLAYER DATA...
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="arcade-button arcade-button-primary"
            >
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
              REFRESH
            </button>
            <button
              onClick={handleExport}
              className="arcade-button arcade-button-secondary"
            >
              <Download className="h-4 w-4" />
              EXPORT
            </button>
            <button className="arcade-button arcade-button-secondary">
              <Settings className="h-4 w-4" />
              CONFIG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
