-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2023 at 03:20 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pss_project_rozvrh`
--

-- --------------------------------------------------------

--
-- Table structure for table `predmet`
--

CREATE TABLE `predmet` (
  `id` int(11) NOT NULL,
  `ucitel_id` int(11) NOT NULL,
  `rozvrh_den_id` int(11) NOT NULL,
  `nazev` varchar(50) NOT NULL,
  `zkratka` varchar(5) NOT NULL,
  `ucebna` varchar(20) NOT NULL,
  `poradi` int(11) NOT NULL,
  `nahradni` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `predmet`
--

INSERT INTO `predmet` (`id`, `ucitel_id`, `rozvrh_den_id`, `nazev`, `zkratka`, `ucebna`, `poradi`, `nahradni`) VALUES
(1, 1, 1, 'Weby', 'WA', '18', 1, b'0'),
(2, 2, 1, 'Weby', 'WA', '2', 2, b'0'),
(3, 2, 1, 'Programovani', 'PV', '16', 3, b'0'),
(4, 1, 1, 'Cviceni IT', 'CIT', '3', 4, b'0'),
(5, 1, 1, 'Multimedia a hry.', 'MVH', '16', 5, b'0'),
(6, 2, 1, 'Site a systemy', 'PSS', '16', 6, b'0'),
(7, 1, 1, 'Programovani', 'PV', '25', 7, b'0'),
(8, 1, 2, 'Weby', 'WA', '24', 1, b'0'),
(9, 1, 2, 'Site a systemy', 'PSS', '29', 2, b'0'),
(10, 2, 2, 'Multimedia a hry.', 'MVH', '12', 3, b'0'),
(11, 2, 2, 'Multimedia a hry.', 'MVH', '8', 4, b'0'),
(12, 1, 3, 'Cesky jazyk', 'CJ', '23', 1, b'0'),
(13, 2, 3, 'Telocvik', 'TV', '9', 2, b'0'),
(14, 2, 3, 'Cesky jazyk', 'CJ', '22', 3, b'0'),
(15, 2, 3, 'Weby', 'WA', '11', 4, b'0'),
(16, 2, 3, 'Weby', 'WA', '12', 5, b'0'),
(17, 1, 4, 'Telocvik', 'TV', '15', 1, b'0'),
(18, 1, 4, 'Site a systemy', 'PSS', '25', 2, b'0'),
(19, 1, 4, 'Site a systemy', 'PSS', '18', 3, b'0'),
(20, 2, 4, 'Site a systemy', 'PSS', '21', 4, b'0'),
(21, 2, 4, 'Multimedia a hry.', 'MVH', '30', 5, b'0'),
(22, 1, 4, 'Cviceni IT', 'CIT', '11', 6, b'0'),
(23, 1, 5, 'Matematika', 'M', '4', 1, b'0'),
(24, 2, 5, 'Multimedia a hry.', 'MVH', '7', 2, b'0'),
(25, 2, 5, 'Programovani', 'PV', '8', 3, b'0'),
(26, 2, 5, 'Cviceni IT', 'CIT', '5', 4, b'0'),
(27, 2, 6, 'Pocitacove site a systemy', 'CIT', '14', 1, b'0'),
(28, 1, 6, 'Pocitacove site a systemy', 'PV', '14', 2, b'0'),
(29, 1, 6, 'Weby', 'WA', '14', 3, b'0'),
(30, 1, 6, 'Weby', 'WA', '14', 4, b'0'),
(31, 2, 6, 'Weby', 'WA', '17', 5, b'0'),
(32, 1, 6, 'Pocitacove site a systemy', 'CIT', '17', 6, b'0'),
(33, 2, 7, 'Weby', 'WA', '14', 1, b'0'),
(34, 1, 7, 'Pocitacove site a systemy', 'CIT', '14', 2, b'0'),
(35, 1, 7, 'Pocitacove site a systemy', 'CJ', '14', 3, b'0'),
(36, 1, 7, 'Weby', 'WA', '14', 4, b'0'),
(37, 2, 7, 'Weby', 'WA', '17', 5, b'0'),
(38, 1, 7, 'Weby', 'WA', '17', 6, b'0'),
(39, 1, 7, 'Pocitacove site a systemy', 'TV', '14', 7, b'0'),
(40, 1, 8, 'Pocitacove site a systemy', 'WA', '14', 1, b'0'),
(41, 1, 8, 'Pocitacove site a systemy', 'PSS', '17', 2, b'0'),
(42, 2, 8, 'Weby', 'WA', '17', 3, b'0'),
(43, 2, 8, 'Pocitacove site a systemy', 'PSS', '17', 4, b'0'),
(44, 1, 1, 'Nahradni', 'NA', '18', 1, b'1'),
(45, 1, 7, 'Ekonomika', 'EK', '14', 7, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `rozvrh_den`
--

CREATE TABLE `rozvrh_den` (
  `id` int(11) NOT NULL,
  `tyden_id` int(11) NOT NULL,
  `den` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rozvrh_den`
--

INSERT INTO `rozvrh_den` (`id`, `tyden_id`, `den`) VALUES
(1, 1, 'pondeli'),
(2, 1, 'utery'),
(3, 1, 'streda'),
(4, 1, 'ctvrtek'),
(5, 1, 'patek'),
(6, 2, 'pondeli'),
(7, 2, 'utery'),
(8, 2, 'ctvrtek');

-- --------------------------------------------------------

--
-- Table structure for table `rozvrh_tyden`
--

CREATE TABLE `rozvrh_tyden` (
  `id` int(11) NOT NULL,
  `trida_id` int(11) DEFAULT NULL,
  `ucitel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rozvrh_tyden`
--

INSERT INTO `rozvrh_tyden` (`id`, `trida_id`, `ucitel_id`) VALUES
(1, 1, NULL),
(2, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `trida_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `jmeno` varchar(20) NOT NULL,
  `prijmeni` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `trida_id`, `username`, `password`, `jmeno`, `prijmeni`, `email`) VALUES
(1, 1, 'knedla', 'knedla', 'Velkej', 'Knedlik', 'knedlik@jecna.cz'),
(2, 1, 'stilec2', 'stilec', 'Michal', 'Stilec', 'stilec2@jecna.cz');

-- --------------------------------------------------------

--
-- Table structure for table `trida`
--

CREATE TABLE `trida` (
  `id` int(11) NOT NULL,
  `ucitel_id` int(11) NOT NULL,
  `Nazev` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trida`
--

INSERT INTO `trida` (`id`, `ucitel_id`, `Nazev`) VALUES
(1, 1, 'C3b');

-- --------------------------------------------------------

--
-- Table structure for table `ucitel`
--

CREATE TABLE `ucitel` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `zkratka` varchar(4) NOT NULL,
  `jmeno` varchar(30) NOT NULL,
  `prijmeni` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ucitel`
--

INSERT INTO `ucitel` (`id`, `username`, `password`, `zkratka`, `jmeno`, `prijmeni`, `email`, `role`) VALUES
(1, 'masopust', 'masopust', 'Ma', 'Lukas', 'Masopust', 'masopust@jecna.cz', 'admin'),
(2, 'neugebauerova', 'neugebauerova', 'Ne', 'Eva', 'Neugebauerova', 'evaneuge@jecna.cz', 'ucitel');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `predmet`
--
ALTER TABLE `predmet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rozvrh_den`
--
ALTER TABLE `rozvrh_den`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rozvrh_tyden`
--
ALTER TABLE `rozvrh_tyden`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `trida`
--
ALTER TABLE `trida`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Nazev` (`Nazev`);

--
-- Indexes for table `ucitel`
--
ALTER TABLE `ucitel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `predmet`
--
ALTER TABLE `predmet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `rozvrh_den`
--
ALTER TABLE `rozvrh_den`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `rozvrh_tyden`
--
ALTER TABLE `rozvrh_tyden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trida`
--
ALTER TABLE `trida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ucitel`
--
ALTER TABLE `ucitel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
