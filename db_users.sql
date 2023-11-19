-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2023 at 05:03 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_users`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_user`
--

CREATE TABLE `app_user` (
  `id` bigint(20) NOT NULL,
  `actived` bit(1) NOT NULL,
  `code_verification` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `solde` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `app_user`
--

INSERT INTO `app_user` (`id`, `actived`, `code_verification`, `email`, `nom`, `password`, `prenom`, `role`, `solde`) VALUES
(1, b'1', NULL, 'bank@gmail.com', 'bank', '$2a$10$FSE3/v1FBILiMYetBxsJuOGJPjJ6z.ma6ApTuMrKiB6OwnQMAtxX6', 'bank', 'BANKING', 0),
(2, b'1', NULL, 'youness.hallaoui18@gmail.com', 'Elhalloui', '$2a$10$sUAeQTjzXIzu15aHUyJdFOQGS4SqrCCgUCV030FOtj6G3JA5oMEFO', 'youness', 'CUSTOMER', 25200),
(3, b'1', NULL, 'youness3.toyouness18@gmail.com', 'elhallaoui_2', '$2a$10$LKuj2d9bnMEu3wB009y0j.8LGTm3kfrJKvTMp9BKOrIFYItwUBJHG', 'youness_2', 'CUSTOMER', 2700),
(4, b'1', NULL, 'y.elhallaoui5185@uca.ac.ma', 'elhallaouiUca', '$2a$10$zC2LLg2sQmT76Gq5jPZB3e.J0yvY0ziANo6z6WapvQOpwa8lYhzMG', 'younessUca', 'CUSTOMER', 18141),
(5, b'1', NULL, 'said@gmail.com', 'elhallaoui', '$2a$10$qk69PQPULrUw8BKsIEZjO.r9eROuyOrBIYtgxHX3v3.MxMQy75lLi', 'said', 'CUSTOMER', 40000),
(9, b'0', NULL, 'jilali@gmail.com', 'jilali', '$2a$10$5gz3Qlf6yC06lBoEvSt5z.2Dk4XY/ceT9dahavUcKMRKyU.LsfazW', 'omar', 'CUSTOMER', 0);

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `id` bigint(20) NOT NULL,
  `amount` double NOT NULL,
  `date` datetime DEFAULT NULL,
  `beneficiaire_id` bigint(20) DEFAULT NULL,
  `verseur_id` bigint(20) DEFAULT NULL,
  `active` bit(1) NOT NULL,
  `code_verification_operatiom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`id`, `amount`, `date`, `beneficiaire_id`, `verseur_id`, `active`, `code_verification_operatiom`) VALUES
(5, 170, '2023-11-19 13:33:35', 2, 3, b'1', NULL),
(6, 140, '2023-11-19 13:34:55', 3, 2, b'1', NULL),
(7, 100, '2023-11-19 15:17:25', 4, 2, b'1', NULL),
(8, 1400, '2023-11-19 15:28:50', 3, 2, b'1', NULL),
(9, 1700, '2023-11-19 15:46:30', 2, 3, b'1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_user`
--
ALTER TABLE `app_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_1j9d9a06i600gd43uu3km82jw` (`email`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlfinw7b3ckqq6wownei7fi186` (`beneficiaire_id`),
  ADD KEY `FKkegjrnvm4hx5pa3q240dnm053` (`verseur_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `app_user`
--
ALTER TABLE `app_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `operation`
--
ALTER TABLE `operation`
  ADD CONSTRAINT `FKkegjrnvm4hx5pa3q240dnm053` FOREIGN KEY (`verseur_id`) REFERENCES `app_user` (`id`),
  ADD CONSTRAINT `FKlfinw7b3ckqq6wownei7fi186` FOREIGN KEY (`beneficiaire_id`) REFERENCES `app_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
