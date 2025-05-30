const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all players with their stats
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.username,
        ps.current_level,
        ps.deaths,
        ps.total_time,
        CASE 
          WHEN ps.current_level > 5 THEN 'ADVANCED'
          ELSE 'BEGINNER'
        END as status
      FROM players p
      JOIN player_stats ps ON p.id = ps.player_id
      ORDER BY ps.current_level DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get dashboard statistics
router.get("/stats", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        COUNT(DISTINCT p.id) as total_players,
        SUM(ps.deaths) as total_deaths,
        AVG(ps.total_time) as avg_time,
        (
          SELECT username 
          FROM players p2
          JOIN player_stats ps2 ON p2.id = ps2.player_id
          ORDER BY ps2.current_level DESC
          LIMIT 1
        ) as top_player,
        (
          SELECT current_level
          FROM player_stats
          ORDER BY current_level DESC
          LIMIT 1
        ) as top_level
      FROM players p
      JOIN player_stats ps ON p.id = ps.player_id
    `);
    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search players
router.get("/search", async (req, res) => {
  const { term } = req.query;
  try {
    const [rows] = await db.query(
      `
      SELECT 
        p.username,
        ps.current_level,
        ps.deaths,
        ps.total_time,
        CASE 
          WHEN ps.current_level > 5 THEN 'ADVANCED'
          ELSE 'BEGINNER'
        END as status
      FROM players p
      JOIN player_stats ps ON p.id = ps.player_id
      WHERE p.username LIKE ?
      ORDER BY ps.current_level DESC
    `,
      [`%${term}%`]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error searching players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Filter players by level
router.get("/filter", async (req, res) => {
  const { level } = req.query;
  try {
    let query = `
      SELECT 
        p.username,
        ps.current_level,
        ps.deaths,
        ps.total_time,
        CASE 
          WHEN ps.current_level > 5 THEN 'ADVANCED'
          ELSE 'BEGINNER'
        END as status
      FROM players p
      JOIN player_stats ps ON p.id = ps.player_id
    `;

    if (level === "beginner") {
      query += " WHERE ps.current_level <= 5";
    } else if (level === "advanced") {
      query += " WHERE ps.current_level > 5";
    }

    query += " ORDER BY ps.current_level DESC";

    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error filtering players:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
