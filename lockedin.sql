-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 08:39 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lockedin`
--

-- --------------------------------------------------------

--
-- Table structure for table `death_logs`
--

CREATE TABLE `death_logs` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `died_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `death_logs`
--

INSERT INTO `death_logs` (`id`, `player_id`, `level`, `died_at`) VALUES
(1, 1, 1, '2025-05-22 16:59:21'),
(2, 1, 1, '2025-05-22 16:59:21'),
(3, 1, 2, '2025-05-23 16:59:21'),
(4, 1, 3, '2025-05-24 16:59:21'),
(5, 1, 4, '2025-05-25 16:59:21'),
(6, 1, 5, '2025-05-26 16:59:21'),
(7, 1, 6, '2025-05-27 16:59:21'),
(8, 1, 7, '2025-05-28 16:59:21'),
(9, 1, 8, '2025-05-29 16:59:21'),
(10, 2, 1, '2025-05-18 16:59:21'),
(11, 2, 2, '2025-05-19 16:59:21'),
(12, 2, 3, '2025-05-20 16:59:21'),
(13, 2, 4, '2025-05-21 16:59:21'),
(14, 2, 5, '2025-05-22 16:59:21'),
(15, 2, 6, '2025-05-23 16:59:21'),
(16, 2, 7, '2025-05-24 16:59:21'),
(17, 2, 8, '2025-05-25 16:59:21'),
(18, 2, 9, '2025-05-26 16:59:21'),
(19, 2, 10, '2025-05-27 16:59:21'),
(20, 2, 11, '2025-05-28 16:59:21'),
(21, 2, 12, '2025-05-29 16:59:21'),
(22, 3, 1, '2025-05-26 16:59:21'),
(23, 3, 2, '2025-05-27 16:59:21'),
(24, 3, 3, '2025-05-28 16:59:21'),
(25, 3, 4, '2025-05-29 16:59:21'),
(26, 4, 1, '2025-05-23 16:59:21'),
(27, 4, 2, '2025-05-24 16:59:21'),
(28, 4, 3, '2025-05-25 16:59:21'),
(29, 4, 4, '2025-05-26 16:59:21'),
(30, 4, 5, '2025-05-27 16:59:21'),
(31, 4, 6, '2025-05-28 16:59:21'),
(32, 4, 7, '2025-05-29 16:59:21'),
(33, 5, 1, '2025-05-27 16:59:21'),
(34, 5, 2, '2025-05-28 16:59:21'),
(35, 5, 3, '2025-05-29 16:59:21');

-- --------------------------------------------------------

--
-- Table structure for table `level_history`
--

CREATE TABLE `level_history` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `level` int(11) NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `level_history`
--

INSERT INTO `level_history` (`id`, `player_id`, `level`, `completed_at`) VALUES
(1, 1, 1, '2025-05-22 16:59:21'),
(2, 1, 2, '2025-05-23 16:59:21'),
(3, 1, 3, '2025-05-24 16:59:21'),
(4, 1, 4, '2025-05-25 16:59:21'),
(5, 1, 5, '2025-05-26 16:59:21'),
(6, 1, 6, '2025-05-27 16:59:21'),
(7, 1, 7, '2025-05-28 16:59:21'),
(8, 1, 8, '2025-05-29 16:59:21'),
(9, 2, 1, '2025-05-18 16:59:21'),
(10, 2, 2, '2025-05-19 16:59:21'),
(11, 2, 3, '2025-05-20 16:59:21'),
(12, 2, 4, '2025-05-21 16:59:21'),
(13, 2, 5, '2025-05-22 16:59:21'),
(14, 2, 6, '2025-05-23 16:59:21'),
(15, 2, 7, '2025-05-24 16:59:21'),
(16, 2, 8, '2025-05-25 16:59:21'),
(17, 2, 9, '2025-05-26 16:59:21'),
(18, 2, 10, '2025-05-27 16:59:21'),
(19, 2, 11, '2025-05-28 16:59:21'),
(20, 2, 12, '2025-05-29 16:59:21'),
(21, 3, 1, '2025-05-26 16:59:21'),
(22, 3, 2, '2025-05-27 16:59:21'),
(23, 3, 3, '2025-05-28 16:59:21'),
(24, 3, 4, '2025-05-29 16:59:21'),
(25, 4, 1, '2025-05-23 16:59:21'),
(26, 4, 2, '2025-05-24 16:59:21'),
(27, 4, 3, '2025-05-25 16:59:21'),
(28, 4, 4, '2025-05-26 16:59:21'),
(29, 4, 5, '2025-05-27 16:59:21'),
(30, 4, 6, '2025-05-28 16:59:21'),
(31, 4, 7, '2025-05-29 16:59:21'),
(32, 5, 1, '2025-05-27 16:59:21'),
(33, 5, 2, '2025-05-28 16:59:21'),
(34, 5, 3, '2025-05-29 16:59:21');

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `username`, `created_at`, `last_login`) VALUES
(1, 'ShadowNinja', '2025-05-30 16:59:20', NULL),
(2, 'DragonSlayer', '2025-05-30 16:59:20', NULL),
(3, 'CyberPunk', '2025-05-30 16:59:20', NULL),
(4, 'PixelWarrior', '2025-05-30 16:59:20', NULL),
(5, 'EpicGamer', '2025-05-30 16:59:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `player_stats`
--

CREATE TABLE `player_stats` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `current_level` int(11) NOT NULL DEFAULT 1,
  `deaths` int(11) NOT NULL DEFAULT 0,
  `total_time` int(11) NOT NULL DEFAULT 0,
  `status` enum('BEGINNER','ADVANCED') DEFAULT NULL,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `player_stats`
--

INSERT INTO `player_stats` (`id`, `player_id`, `current_level`, `deaths`, `total_time`, `status`, `last_updated`) VALUES
(1, 1, 8, 15, 180, 'ADVANCED', '2025-05-30 16:59:21'),
(2, 2, 12, 25, 300, 'ADVANCED', '2025-05-30 16:59:21'),
(3, 3, 4, 6, 60, 'BEGINNER', '2025-05-30 16:59:21'),
(4, 4, 7, 12, 150, 'ADVANCED', '2025-05-30 16:59:21'),
(5, 5, 3, 5, 45, 'BEGINNER', '2025-05-30 16:59:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `death_logs`
--
ALTER TABLE `death_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indexes for table `level_history`
--
ALTER TABLE `level_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `player_id` (`player_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `death_logs`
--
ALTER TABLE `death_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `level_history`
--
ALTER TABLE `level_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `player_stats`
--
ALTER TABLE `player_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `death_logs`
--
ALTER TABLE `death_logs`
  ADD CONSTRAINT `death_logs_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

--
-- Constraints for table `level_history`
--
ALTER TABLE `level_history`
  ADD CONSTRAINT `level_history_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);

--
-- Constraints for table `player_stats`
--
ALTER TABLE `player_stats`
  ADD CONSTRAINT `player_stats_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
