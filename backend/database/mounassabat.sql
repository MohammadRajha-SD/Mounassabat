-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 24, 2024 at 09:27 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mounassabat`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `admins_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `annonces`
--

DROP TABLE IF EXISTS `annonces`;
CREATE TABLE IF NOT EXISTS `annonces` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accepted_at` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `sub_category_id` bigint UNSIGNED NOT NULL,
  `sous_category_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` enum('normal','vip') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'normal',
  PRIMARY KEY (`id`),
  KEY `annonces_user_id_foreign` (`user_id`),
  KEY `annonces_sub_category_id_foreign` (`sub_category_id`),
  KEY `annonces_sous_category_id_foreign` (`sous_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `annonces`
--

INSERT INTO `annonces` (`id`, `title`, `description`, `image`, `price`, `location`, `accepted_at`, `user_id`, `sub_category_id`, `sous_category_id`, `created_at`, `updated_at`, `type`) VALUES
(20, 'i need to get this annonce', 'some details goes here  as you know and thank you very much', '[\"storage\\/images\\/img_1729799203_.png\"]', '1900', 'Ain Beni Mathar', NULL, 2, 24, 22, '2024-10-25 02:46:44', '2024-10-25 02:46:44', 'vip'),
(18, 'afafa', 'fafafaf', '[\"storage\\/images\\/img_1729767281_.png\"]', '242424', 'Agadir', NULL, 2, 25, 27, '2024-10-24 17:54:41', '2024-10-24 17:54:41', 'normal'),
(19, 'testt11', 'test22', '[\"storage\\/images\\/img_1729767393_.png\"]', '6666', 'Ain Leuh', NULL, 2, 25, 27, '2024-10-24 17:56:33', '2024-10-24 17:56:33', 'vip'),
(6, 'Title is here', 'body is here', '[\"storage\\/images\\/img_1729082304_.png\",\"storage\\/images\\/img_1729091513_.png\"]', '999', 'Ain Beni Mathar', 'now()', 2, 11, NULL, '2024-08-04 19:38:24', '2024-10-16 19:38:24', 'vip'),
(7, 'afaf', 'afaff', '[\"storage\\/images\\/img_1729091513_.png\"]', '333', 'Ahfir', 'now', 2, 24, 22, '2024-10-14 22:11:53', '2024-09-14 22:11:53', 'normal'),
(8, '111111', '111111111', '[\"storage\\/images\\/img_1729684417_.png\"]', '111111', 'Ahfir', NULL, 2, 20, NULL, '2024-10-23 18:53:38', '2024-10-23 18:53:38', 'normal'),
(9, '111111', '111111111', '[\"storage\\/images\\/img_1729684418_.png\"]', '111111', 'Ahfir', NULL, 2, 20, NULL, '2024-10-23 18:53:38', '2024-10-23 18:53:38', 'normal'),
(10, 'title', 'text', '[\"storage\\/images\\/img_1729697488_.png\"]', '141', 'Agadir', NULL, 2, 24, 22, '2024-10-23 22:31:28', '2024-10-23 22:31:28', 'vip'),
(11, 'title', 'text', '[\"storage\\/images\\/img_1729697738_.png\"]', '141', 'Agadir', NULL, 2, 24, 22, '2024-10-23 22:35:38', '2024-10-23 22:35:38', 'vip'),
(12, 'title newd', 'test here', '[\"storage\\/images\\/img_1729697843_.png\"]', '25325', 'Ain Beni Mathar', NULL, 2, 14, NULL, '2024-10-23 22:37:23', '2024-10-23 22:37:23', 'vip'),
(13, 'test13', 'teexttest12', '[\"storage\\/images\\/img_1729698067_.png\"]', '40', 'Azemmour', NULL, 2, 13, NULL, '2024-10-23 22:41:07', '2024-10-23 22:41:07', 'vip'),
(14, 'aloo', 'alos33535', '[\"storage\\/images\\/img_1729698448_.png\"]', '24242', 'Agadir', NULL, 2, 13, NULL, '2024-10-23 22:47:28', '2024-10-23 22:47:28', 'normal'),
(15, 'aaaaaaa', 'vvvvvvvvvvvvvvv', '[\"storage\\/images\\/img_1729699757_.png\"]', '4214124', 'Ahfir', NULL, 2, 24, 22, '2024-10-23 23:09:17', '2024-10-23 23:09:17', 'vip'),
(16, 'AAAAAAAAAAAAAAAAAAA', 'CCCCCCCCCCCCCCCCCc', '[\"storage\\/images\\/img_1729700539_.png\"]', '12121212', 'Agadir', NULL, 2, 13, NULL, '2024-10-23 23:22:19', '2024-10-23 23:22:19', 'vip'),
(17, 'sgsgs', 'sgsgsg', '[\"storage\\/images\\/img_1729710380_.png\"]', '444', 'Ain Beni Mathar', NULL, 2, 15, NULL, '2024-10-24 02:06:22', '2024-10-24 02:06:22', 'vip');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Marriage', '2024-10-03 23:35:58', NULL),
(2, 'Fete De Naissance', '2024-10-03 23:35:58', NULL),
(3, 'BabyShower', '2024-10-03 23:35:58', NULL),
(4, 'Anniversaire', '2024-10-03 23:35:58', NULL),
(5, 'Conférence', '2024-10-03 23:35:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clients_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-09-30 05:41:57', '2024-09-30 05:41:57'),
(2, 3, '2024-10-04 22:53:21', '2024-10-04 22:53:21'),
(3, 5, '2024-10-09 15:48:19', '2024-10-09 15:48:19'),
(4, 6, '2024-10-11 18:30:25', '2024-10-11 18:30:25'),
(5, 7, '2024-10-22 21:02:39', '2024-10-22 21:02:39'),
(6, 8, '2024-10-23 05:28:36', '2024-10-23 05:28:36');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `sender_id` bigint UNSIGNED NOT NULL,
  `receiver_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `conversations_sender_id_receiver_id_unique` (`sender_id`,`receiver_id`),
  KEY `conversations_receiver_id_foreign` (`receiver_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `sender_id`, `receiver_id`, `created_at`, `updated_at`) VALUES
(1, 3, 7, '2024-10-23 02:03:16', '2024-10-23 02:03:16'),
(2, 3, 2, '2024-10-23 16:07:06', '2024-10-23 16:07:06');

-- --------------------------------------------------------

--
-- Table structure for table `conversation_user`
--

DROP TABLE IF EXISTS `conversation_user`;
CREATE TABLE IF NOT EXISTS `conversation_user` (
  `conversation_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`conversation_id`,`user_id`),
  KEY `conversation_user_user_id_foreign` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `annonce_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favoris_user_id_foreign` (`user_id`),
  KEY `favoris_annonce_id_foreign` (`annonce_id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favoris`
--

INSERT INTO `favoris` (`id`, `user_id`, `annonce_id`, `created_at`, `updated_at`) VALUES
(42, 3, 6, '2024-10-17 08:16:28', '2024-10-17 08:16:28'),
(40, 3, 4, '2024-10-17 08:13:08', '2024-10-17 08:13:08'),
(43, 3, 5, '2024-10-17 08:16:36', '2024-10-17 08:16:36'),
(44, 3, 3, '2024-10-17 08:16:37', '2024-10-17 08:16:37');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(10, 'default', '{\"uuid\":\"3560c964-88d7-4d11-8319-85b4b0ec3bb5\",\"displayName\":\"App\\\\Jobs\\\\UpdateVipAnnoncesJob\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"App\\\\Jobs\\\\UpdateVipAnnoncesJob\",\"command\":\"O:29:\\\"App\\\\Jobs\\\\UpdateVipAnnoncesJob\\\":0:{}\"}}', 0, NULL, 1729765156, 1729765156);

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `conversation_id` bigint UNSIGNED NOT NULL,
  `sender_id` bigint UNSIGNED NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_conversation_id_foreign` (`conversation_id`),
  KEY `messages_sender_id_foreign` (`sender_id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `sender_id`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(2, 1, 3, 'test', 0, '2024-10-23 02:44:41', '2024-10-23 02:44:41'),
(3, 1, 3, 'test1', 0, '2024-10-23 03:08:01', '2024-10-23 03:08:01'),
(4, 1, 3, 'test2', 0, '2024-10-23 03:08:04', '2024-10-23 03:08:04'),
(5, 1, 3, 'test3', 0, '2024-10-23 03:08:05', '2024-10-23 03:08:05'),
(6, 1, 3, 'test', 0, '2024-10-23 03:08:06', '2024-10-23 03:08:06'),
(7, 1, 3, 'test', 0, '2024-10-23 03:08:08', '2024-10-23 03:08:08'),
(8, 1, 3, 'aa', 0, '2024-10-23 03:08:10', '2024-10-23 03:08:10'),
(9, 1, 3, 'aa', 0, '2024-10-23 03:08:11', '2024-10-23 03:08:11'),
(10, 1, 3, 'xx', 0, '2024-10-23 03:08:12', '2024-10-23 03:08:12'),
(13, 1, 3, 'a', 0, '2024-10-23 04:33:39', '2024-10-23 04:33:39'),
(11, 1, 3, 'sex', 0, '2024-10-23 03:08:14', '2024-10-23 03:08:14'),
(12, 1, 3, 'aa', 0, '2024-10-23 04:33:26', '2024-10-23 04:33:26'),
(14, 1, 7, 'test&nbsp;', 0, '2024-10-23 04:34:17', '2024-10-23 04:34:17'),
(15, 1, 7, 'test&nbsp;', 0, '2024-10-23 04:34:39', '2024-10-23 04:34:39'),
(16, 1, 3, 'test&nbsp; &nbsp;', 0, '2024-10-23 04:35:14', '2024-10-23 04:35:14'),
(17, 1, 3, 'aaaaaaa&nbsp;', 0, '2024-10-23 04:35:32', '2024-10-23 04:35:32'),
(18, 1, 3, 'yup', 0, '2024-10-23 04:48:00', '2024-10-23 04:48:00'),
(19, 1, 7, 'hi', 0, '2024-10-23 04:49:54', '2024-10-23 04:49:54'),
(20, 1, 3, 'test', 0, '2024-10-23 05:00:07', '2024-10-23 05:00:07'),
(21, 1, 3, 'aaa', 0, '2024-10-23 05:25:38', '2024-10-23 05:25:38'),
(22, 1, 3, 'Im Mohammad&nbsp;', 0, '2024-10-23 05:25:45', '2024-10-23 05:25:45'),
(23, 1, 3, 'Im Mohamad', 0, '2024-10-23 05:26:07', '2024-10-23 05:26:07'),
(24, 1, 3, 'test', 0, '2024-10-23 05:26:22', '2024-10-23 05:26:22'),
(25, 1, 7, 'aaaaaaaaaaaaaaaaaaaaaaaa', 0, '2024-10-23 05:26:43', '2024-10-23 05:26:43'),
(26, 1, 3, 'aaaaaaafafaf', 0, '2024-10-23 05:26:51', '2024-10-23 05:26:51'),
(27, 1, 3, 'testaaa', 0, '2024-10-23 05:26:58', '2024-10-23 05:26:58'),
(28, 1, 7, 'aaaaaaaa', 0, '2024-10-23 05:29:44', '2024-10-23 05:29:44'),
(29, 2, 3, 'Mhmd', 0, '2024-10-23 16:28:51', '2024-10-23 16:28:51'),
(30, 2, 3, 'Hey man', 0, '2024-10-23 16:29:02', '2024-10-23 16:29:02'),
(31, 2, 3, 'aaaaaaaaaaaa', 0, '2024-10-23 16:30:05', '2024-10-23 16:30:05'),
(32, 2, 3, 'Ahm', 0, '2024-10-23 16:30:44', '2024-10-23 16:30:44');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2024_06_22_023455_create_admins_table', 1),
(4, '2024_06_22_023506_create_prestataires_table', 1),
(5, '2024_06_22_023514_create_clients_table', 1),
(6, '2024_06_22_023543_create_reclamations_table', 1),
(7, '2024_06_24_161622_create_categories_table', 1),
(8, '2024_06_24_161643_create_sub_categories_table', 1),
(9, '2024_06_24_161653_create_sous_categories_table', 1),
(10, '2024_06_24_161717_create_annonces_table', 1),
(11, '2024_06_24_170928_create_favoris_table', 1),
(12, '2024_09_30_102407_add_remmeber_token_to_users_table', 2),
(15, '2024_10_08_150144_add_google_id_to_users_table', 3),
(16, '2024_10_16_122917_add_type_to_annonces_table', 4),
(22, '2024_10_22_082851_create_messages_table', 8),
(18, '2024_10_22_104307_create_sessions_table', 6),
(19, '0001_01_01_000002_create_jobs_table', 7),
(23, '2024_10_22_175710_create_conversations_table', 8),
(24, '2024_10_22_185110_conversation_user', 8),
(28, '2024_10_23_120005_create_payments_table', 9),
(29, '2024_10_23_185955_add_annonce_duration_and_amount_to_payments_table', 10);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `annonce_id` bigint UNSIGNED NOT NULL,
  `payment_method` enum('card','paypal') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'card',
  `status` enum('completed','pending','failed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `annonce_duration` int NOT NULL DEFAULT '3',
  `amount` decimal(10,2) NOT NULL DEFAULT '49.00',
  PRIMARY KEY (`id`),
  KEY `payments_annonce_id_foreign` (`annonce_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `annonce_id`, `payment_method`, `status`, `created_at`, `updated_at`, `annonce_duration`, `amount`) VALUES
(1, 14, 'card', 'completed', '2024-10-11 22:47:28', '2024-10-19 22:47:28', 3, 49.00),
(2, 15, 'card', 'completed', '2024-10-11 22:47:28', '2024-10-23 23:09:17', 3, 49.00),
(3, 16, 'card', 'completed', '2024-10-23 23:22:19', '2024-10-23 23:22:19', 3, 49.00),
(4, 17, 'card', 'completed', '2024-10-24 02:06:22', '2024-10-24 02:06:22', 14, 109.00),
(5, 19, 'card', 'completed', '2024-10-24 17:56:33', '2024-10-24 17:56:33', 30, 299.00),
(6, 20, 'paypal', 'completed', '2024-10-25 02:46:44', '2024-10-25 02:46:44', 30, 29.90);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 4, 'authToken', '8d4e9f8c28d89a17c562dfb9f0e907b6a090b3357861916f54c8157010f4e42e', '[\"*\"]', NULL, NULL, '2024-10-09 15:27:49', '2024-10-09 15:27:49'),
(2, 'App\\Models\\User', 4, 'authToken', '0a603cf01d00f44faf1d04126fca88fbbb76e2ec0c95fac4f0fe939a7cf403b7', '[\"*\"]', NULL, NULL, '2024-10-09 15:32:55', '2024-10-09 15:32:55'),
(3, 'App\\Models\\User', 5, 'authToken', 'e1a8afa28a3b9e81c992c04195482dcd5c410eeecd80b57c743343041ed24624', '[\"*\"]', NULL, NULL, '2024-10-09 15:55:35', '2024-10-09 15:55:35'),
(4, 'App\\Models\\User', 5, 'authToken', 'baad18832b8e127df3f398ce4298290a8ed622750df3a7ad5193051643126694', '[\"*\"]', NULL, NULL, '2024-10-09 15:58:43', '2024-10-09 15:58:43'),
(5, 'App\\Models\\User', 5, 'authToken', '2845b923666c6443f7513ffc1e67051d0531f926e678ba9084a1a7852ba2cdd0', '[\"*\"]', NULL, NULL, '2024-10-09 16:08:23', '2024-10-09 16:08:23'),
(6, 'App\\Models\\User', 5, 'authToken', '835aba7a99c7682559088f4d0209bcac1abee1cf270ca24d6a622272a166fb47', '[\"*\"]', NULL, NULL, '2024-10-09 16:09:58', '2024-10-09 16:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `prestataires`
--

DROP TABLE IF EXISTS `prestataires`;
CREATE TABLE IF NOT EXISTS `prestataires` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prestataires_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prestataires`
--

INSERT INTO `prestataires` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 2, '2024-10-02 21:16:17', '2024-10-02 21:16:17');

-- --------------------------------------------------------

--
-- Table structure for table `reclamations`
--

DROP TABLE IF EXISTS `reclamations`;
CREATE TABLE IF NOT EXISTS `reclamations` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reclamations_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reclamations`
--

INSERT INTO `reclamations` (`id`, `user_id`, `message`, `created_at`, `updated_at`) VALUES
(15, 3, 'Découvrons les meilleurs Prestataires des événements', '2024-10-05 07:36:30', '2024-10-05 07:36:30'),
(8, 3, 'Découvrons les meilleurs Prestataires des événements', '2024-10-05 07:31:55', '2024-10-05 07:31:55'),
(9, 3, 'Découvrons les meilleurs Prestataires des événements', '2024-10-05 07:32:25', '2024-10-05 07:32:25'),
(12, 3, 'Découvrons les meilleurs Prestataires des événements', '2024-10-05 07:32:29', '2024-10-05 07:32:29');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('uMg0MtySn3RqJoKLiAcxnPzp2qi8ln8RWVx5wjNJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR25KNWRtdXVaV001RlRwUTBGbEtXVmpGTmlNZlI2cVNZcmxSeVQwVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729594562),
('wHzjOve4HI0OVBipyiyLeOHdSNLkvrCokcuSljcl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicG1KOFcxZnhUY2o3SDdGVU1Oc29oaWhkZXJuRG9vVkI5WjQxOGV6cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1729594554);

-- --------------------------------------------------------

--
-- Table structure for table `sous_categories`
--

DROP TABLE IF EXISTS `sous_categories`;
CREATE TABLE IF NOT EXISTS `sous_categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sub_category_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sous_categories_sub_category_id_foreign` (`sub_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sous_categories`
--

INSERT INTO `sous_categories` (`id`, `name`, `sub_category_id`, `created_at`, `updated_at`) VALUES
(1, 'Salle de fete', 2, '2024-10-03 23:35:58', NULL),
(2, 'Villa privée', 2, '2024-10-03 23:35:58', NULL),
(3, 'Salle de Réception', 2, '2024-10-03 23:35:58', NULL),
(4, 'Orchester', 6, '2024-10-03 23:35:58', NULL),
(5, 'Orcheste Chaabi / Tarab', 6, '2024-10-03 23:35:58', NULL),
(6, 'DJ (Animateur)', 6, '2024-10-03 23:35:58', NULL),
(7, 'Issawa / DQAYQYA', 6, '2024-10-03 23:35:58', NULL),
(8, 'Awniyat', 6, '2024-10-03 23:35:58', NULL),
(9, 'Amdah', 6, '2024-10-03 23:35:58', NULL),
(10, 'Traiteur Pour Anniversaire Enfants', 23, '2024-10-03 23:35:58', NULL),
(11, 'Animateur', 23, '2024-10-03 23:35:58', NULL),
(12, 'Clown', 23, '2024-10-03 23:35:58', NULL),
(13, 'Patissier ou Boulanger', 23, '2024-10-03 23:35:58', NULL),
(14, 'Décorateur de Fete', 23, '2024-10-03 23:35:58', NULL),
(15, 'Lieu de Réception', 23, '2024-10-03 23:35:58', NULL),
(16, 'Photographe et Vidéographer', 23, '2024-10-03 23:35:58', NULL),
(17, 'Patisserie / Wedding Cake', 23, '2024-10-03 23:35:58', NULL),
(18, 'Locataire de jeux et dattractions', 23, '2024-10-03 23:35:58', NULL),
(19, 'Magasin de déguisements', 23, '2024-10-03 23:35:58', NULL),
(20, 'Traiteur Anniversaire Adulte', 24, '2024-10-03 23:35:58', NULL),
(21, 'Patissier ou Boulanger', 24, '2024-10-03 23:35:58', NULL),
(22, 'Décorateur de Fete', 24, '2024-10-03 23:35:58', NULL),
(23, 'Photographe et Vidéographer', 24, '2024-10-03 23:35:58', NULL),
(24, 'DJ ou groupe de Musique', 24, '2024-10-03 23:35:58', NULL),
(25, 'Lieu de Réception', 24, '2024-10-03 23:35:58', NULL),
(26, 'Traiteur Conférence', 25, '2024-10-03 23:35:58', NULL),
(27, 'Salle Hotel', 25, '2024-10-03 23:35:58', NULL),
(28, 'Traiteur pour Event pro', 26, '2024-10-03 23:35:58', NULL),
(29, 'Salle Hotel', 26, '2024-10-03 23:35:58', NULL),
(30, 'Traiteur Pour Séminaire', 27, '2024-10-03 23:35:58', NULL),
(31, 'Salle Hotel', 27, '2024-10-03 23:35:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
CREATE TABLE IF NOT EXISTS `sub_categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_categories_category_id_foreign` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Traiteur Pour Mariage', 1, '2024-10-03 23:35:58', NULL),
(2, 'Lieu de réception', 1, '2024-10-03 23:35:58', NULL),
(3, 'Nagafa (Planification de marriage)', 1, '2024-10-03 23:35:58', NULL),
(4, 'Tyafer / Chocolatier', 1, '2024-10-03 23:35:58', NULL),
(5, 'Photographe et vidéographe', 1, '2024-10-03 23:35:58', NULL),
(6, 'Musique', 1, '2024-10-03 23:35:58', NULL),
(7, 'Serveur Freelance', 1, '2024-10-03 23:35:58', NULL),
(8, 'Femme de Menage Freelance', 1, '2024-10-03 23:35:58', NULL),
(9, 'Agence de voyage (Lien de Miel)', 1, '2024-10-03 23:35:58', NULL),
(10, 'Patisserie / Wedding Cake', 1, '2024-10-03 23:35:58', NULL),
(11, 'Adoul / Cérémonie', 1, '2024-10-03 23:35:58', NULL),
(12, 'Locataire des Robes de mariée et tenues pour le marié', 1, '2024-10-03 23:35:58', NULL),
(13, 'Artiste ou Animateur', 2, '2024-10-03 23:35:58', NULL),
(14, 'Décorateur de Fete', 2, '2024-10-03 23:35:58', NULL),
(15, 'Henné', 2, '2024-10-03 23:35:58', NULL),
(16, 'Lieu de réception', 2, '2024-10-03 23:35:58', NULL),
(17, 'Location de matériel Patissier ou boulanger', 2, '2024-10-03 23:35:58', NULL),
(18, 'Photographer ou Vidéographer', 2, '2024-10-03 23:35:58', NULL),
(19, 'Traiteur Pour Sbouaa', 2, '2024-10-03 23:35:58', NULL),
(20, 'Agence Décoration', 3, '2024-10-03 23:35:58', NULL),
(21, 'Patisserie / Wedding Cake', 3, '2024-10-03 23:35:58', NULL),
(22, 'Traiteur Pour Baby Shower', 3, '2024-10-03 23:35:58', NULL),
(23, 'Anniversaire Pour Enfants', 4, '2024-10-03 23:35:58', NULL),
(24, 'Anniversaire Pour Adultes', 4, '2024-10-03 23:35:58', NULL),
(25, 'Colloque', 5, '2024-10-03 23:35:58', NULL),
(26, 'Evénement professionnel', 5, '2024-10-03 23:35:58', NULL),
(27, 'Séminaire', 5, '2024-10-03 23:35:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `banned_at` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `role`, `email`, `email_verified_at`, `password`, `banned_at`, `created_at`, `updated_at`, `remember_token`, `google_id`) VALUES
(1, 'Amir', 'Rajha', '7667253735', 'admin', 'admin@example.com', NULL, '$2y$12$/ZvzFjA.f.aTAxCFH7XDduwjITt65BhQeOa7daUJJNGTtz.jvaOs.', NULL, '2024-09-30 05:41:57', '2024-09-30 05:41:57', NULL, NULL),
(2, 'Provider', 'user', '1412414124', 'prestataire', 'provider@gmail.com', NULL, '$2y$12$DFFgON6cayOYsKdJ.zBLK.pAHJFDsZQFPTilL.pfyVSy3I26mjTmS', NULL, '2024-10-02 21:16:17', '2024-10-17 08:48:57', NULL, NULL),
(3, 'Client', 'User', '7667253722', 'client', 'client@gmail.com', NULL, '$2y$12$n4jbHriCduyJ5w0F4P3r6uKsZ9B0Y.8HkiYyIuk80RHYjWpQRYmcG', NULL, '2024-10-04 22:53:21', '2024-10-04 22:53:21', NULL, NULL),
(5, 'Mhmd', 'Rajha', '1234567890', 'client', 'mohammadrajha2@gmail.com', NULL, '$2y$12$HoDJyAu2s.ZyjmT9YvxwhOpTlv1jkqL9zzkNay.TQxKvAblJPnFCK', NULL, '2024-10-09 15:48:19', '2024-10-09 16:08:23', NULL, '106179609623895453921'),
(6, 'Amir', 'Rajha', '7667253733', 'client', 'xxx@gmail.com', NULL, '$2y$12$z6KvAGO5bjkBvK1lHvvfheugztjTFNWspb0YDBUvsLC5Eii0Q/FJK', NULL, '2024-10-11 18:30:25', '2024-10-11 18:30:25', NULL, NULL),
(7, 'Mhmd', 'Mhmd', '1000100011', 'client', 'mhmd@gmail.com', NULL, '$2y$12$n4jbHriCduyJ5w0F4P3r6uKsZ9B0Y.8HkiYyIuk80RHYjWpQRYmcG', NULL, '2024-10-22 21:02:39', '2024-10-22 21:02:39', NULL, NULL),
(8, 'ali', 'ali', '1141414143', 'client', 'ali@gmail.com', NULL, '$2y$12$dQdhLTdm6PfaLKrTH7Ifz.Yu3.YXPwFI/JG9k.UbyknFwsfLDFntm', NULL, '2024-10-23 05:28:36', '2024-10-23 05:28:36', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
