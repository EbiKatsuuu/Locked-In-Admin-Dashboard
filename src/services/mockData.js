const mockPlayers = [
  {
    username: "ShadowNinja",
    current_level: 8,
    deaths: 12,
    total_time: 3600,
    status: "ADVANCED",
    time_per_run: [420, 380, 450, 390, 410],
    upgrades: {
      most_selected: "Double Jump",
      least_selected: "Time Slow",
      upgrade_stats: {
        "Double Jump": 15,
        "Dash": 12,
        "Shield": 8,
        "Time Slow": 3
      }
    },
    death_locations: {
      stage_deaths: 8,
      boss_deaths: 4,
      death_details: [
        { level: 3, location: "stage", reason: "Spike Trap" },
        { level: 5, location: "boss", reason: "Boss Attack" },
        { level: 7, location: "stage", reason: "Falling" }
      ]
    },
    riddle_stats: {
      most_solved: "Logic Puzzle",
      least_solved: "Pattern Recognition",
      riddle_details: {
        "Logic Puzzle": 12,
        "Word Play": 10,
        "Math Challenge": 8,
        "Pattern Recognition": 5
      }
    },
    platform: "PC"
  },
  {
    username: "PixelWarrior",
    current_level: 4,
    deaths: 8,
    total_time: 2400,
    status: "BEGINNER",
    time_per_run: [380, 420, 350, 400],
    upgrades: {
      most_selected: "Dash",
      least_selected: "Shield",
      upgrade_stats: {
        "Dash": 10,
        "Double Jump": 8,
        "Time Slow": 5,
        "Shield": 2
      }
    },
    death_locations: {
      stage_deaths: 6,
      boss_deaths: 2,
      death_details: [
        { level: 2, location: "stage", reason: "Enemy Attack" },
        { level: 4, location: "boss", reason: "Boss Attack" }
      ]
    },
    riddle_stats: {
      most_solved: "Word Play",
      least_solved: "Math Challenge",
      riddle_details: {
        "Word Play": 8,
        "Logic Puzzle": 6,
        "Pattern Recognition": 4,
        "Math Challenge": 3
      }
    },
    platform: "Mobile"
  },
  {
    username: "CyberKnight",
    current_level: 7,
    deaths: 15,
    total_time: 4200,
    status: "ADVANCED",
    time_per_run: [450, 400, 480, 420, 460],
    upgrades: {
      most_selected: "Time Slow",
      least_selected: "Dash",
      upgrade_stats: {
        "Time Slow": 14,
        "Shield": 12,
        "Double Jump": 9,
        "Dash": 4
      }
    },
    death_locations: {
      stage_deaths: 10,
      boss_deaths: 5,
      death_details: [
        { level: 4, location: "stage", reason: "Falling" },
        { level: 6, location: "boss", reason: "Boss Attack" },
        { level: 7, location: "stage", reason: "Spike Trap" }
      ]
    },
    riddle_stats: {
      most_solved: "Math Challenge",
      least_solved: "Word Play",
      riddle_details: {
        "Math Challenge": 11,
        "Pattern Recognition": 9,
        "Logic Puzzle": 7,
        "Word Play": 5
      }
    },
    platform: "PC"
  },
  {
    username: "NeonRunner",
    current_level: 3,
    deaths: 5,
    total_time: 1800,
    status: "BEGINNER",
    time_per_run: [350, 380, 360],
    upgrades: {
      most_selected: "Shield",
      least_selected: "Time Slow",
      upgrade_stats: {
        "Shield": 9,
        "Double Jump": 7,
        "Dash": 5,
        "Time Slow": 2
      }
    },
    death_locations: {
      stage_deaths: 4,
      boss_deaths: 1,
      death_details: [
        { level: 2, location: "stage", reason: "Enemy Attack" },
        { level: 3, location: "boss", reason: "Boss Attack" }
      ]
    },
    riddle_stats: {
      most_solved: "Pattern Recognition",
      least_solved: "Logic Puzzle",
      riddle_details: {
        "Pattern Recognition": 7,
        "Word Play": 6,
        "Math Challenge": 4,
        "Logic Puzzle": 3
      }
    },
    platform: "Mobile"
  },
  {
    username: "QuantumGamer",
    current_level: 9,
    deaths: 20,
    total_time: 5400,
    status: "ADVANCED",
    time_per_run: [480, 450, 500, 460, 490],
    upgrades: {
      most_selected: "Double Jump",
      least_selected: "Shield",
      upgrade_stats: {
        "Double Jump": 18,
        "Time Slow": 15,
        "Dash": 12,
        "Shield": 5
      }
    },
    death_locations: {
      stage_deaths: 12,
      boss_deaths: 8,
      death_details: [
        { level: 5, location: "stage", reason: "Spike Trap" },
        { level: 7, location: "boss", reason: "Boss Attack" },
        { level: 9, location: "stage", reason: "Falling" }
      ]
    },
    riddle_stats: {
      most_solved: "Logic Puzzle",
      least_solved: "Pattern Recognition",
      riddle_details: {
        "Logic Puzzle": 15,
        "Math Challenge": 12,
        "Word Play": 10,
        "Pattern Recognition": 8
      }
    },
    platform: "PC"
  }
];

const mockStats = {
  total_players: 5,
  total_deaths: 60,
  avg_time: 3480,
  top_player: "QuantumGamer",
  top_level: 9,
  platform_distribution: {
    PC: 3,
    Mobile: 2
  },
  upgrade_stats: {
    most_popular: "Double Jump",
    least_popular: "Shield",
    distribution: {
      "Double Jump": 57,
      "Dash": 43,
      "Time Slow": 39,
      "Shield": 36
    }
  },
  death_locations: {
    stage_deaths: 40,
    boss_deaths: 20
  },
  riddle_stats: {
    most_solved: "Logic Puzzle",
    least_solved: "Pattern Recognition",
    distribution: {
      "Logic Puzzle": 43,
      "Math Challenge": 38,
      "Word Play": 37,
      "Pattern Recognition": 33
    }
  }
};

export { mockPlayers, mockStats }; 