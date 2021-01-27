-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2021 a las 22:59:43
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `citmatel_lt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `dia_actual` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `dia_actual`) VALUES
(1, '2021-01-13 16:04:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `siglas` varchar(50) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `municipio` varchar(50) NOT NULL,
  `oace` varchar(50) NOT NULL,
  `osde` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `reup` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `siglas`, `nombre`, `provincia`, `municipio`, `oace`, `osde`, `email`, `reup`) VALUES
(3, 'CITMATEL', 'Empresa de Tecnologías de la Información y Servicios Telemáticos', 'La Habana', 'Playa', 'CITMA', 'INNOMAX', 'https://webmail.lastunas.cu', '211.0.12071');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `energia`
--

CREATE TABLE `energia` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `plan` int(11) NOT NULL,
  `consumo` int(11) NOT NULL,
  `lectura` int(11) NOT NULL,
  `lectura_hpicd1` int(11) NOT NULL,
  `lectura_hpicd2` int(11) NOT NULL,
  `lectura_hpicn1` int(11) NOT NULL,
  `lectura_hpicn2` int(11) NOT NULL,
  `plan_hpicd` decimal(10,2) NOT NULL,
  `plan_hpicn` decimal(10,2) NOT NULL,
  `id_serv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `energia`
--

INSERT INTO `energia` (`id`, `fecha`, `plan`, `consumo`, `lectura`, `lectura_hpicd1`, `lectura_hpicd2`, `lectura_hpicn1`, `lectura_hpicn2`, `plan_hpicd`, `plan_hpicn`, `id_serv`) VALUES
(1, '2020-10-01', 40, 32, 70607, 0, 0, 0, 0, '0.00', '0.00', 2),
(2, '2020-10-02', 90, 60, 70667, 0, 0, 0, 0, '0.00', '0.00', 2),
(9, '2020-10-05', 40, 36, 70703, 0, 0, 0, 0, '0.00', '0.00', 2),
(10, '2020-10-06', 40, 36, 70739, 0, 0, 0, 0, '0.00', '0.00', 2),
(11, '2020-10-07', 40, 36, 70775, 0, 0, 0, 0, '0.00', '0.00', 2),
(12, '2020-10-08', 40, 35, 70810, 0, 0, 0, 0, '0.00', '0.00', 2),
(13, '2020-09-30', 40, 35, 70575, 0, 0, 0, 0, '0.00', '0.00', 2),
(14, '2020-10-12', 40, 35, 70915, 0, 0, 0, 0, '0.00', '0.00', 2),
(15, '2020-10-13', 40, 38, 70953, 0, 0, 0, 0, '0.00', '0.00', 2),
(16, '2020-10-14', 40, 36, 70989, 0, 0, 0, 0, '0.00', '0.00', 2),
(17, '2020-10-15', 40, 38, 71027, 0, 0, 0, 0, '0.00', '0.00', 2),
(30, '2020-10-09', 90, 70, 70880, 0, 0, 0, 0, '0.00', '0.00', 2),
(31, '2020-10-16', 90, 63, 71090, 0, 0, 0, 0, '0.00', '0.00', 2),
(32, '2020-10-19', 40, 39, 71129, 0, 0, 0, 0, '0.00', '0.00', 2),
(33, '2020-10-20', 40, 38, 71167, 0, 0, 0, 0, '0.00', '0.00', 2),
(34, '2020-10-21', 40, 34, 71201, 0, 0, 0, 0, '0.00', '0.00', 2),
(35, '2020-10-22', 40, 36, 71237, 0, 0, 0, 0, '0.00', '0.00', 2),
(36, '2020-10-23', 90, 64, 71301, 0, 0, 0, 0, '0.00', '0.00', 2),
(37, '2020-10-26', 40, 34, 71335, 0, 0, 0, 0, '0.00', '0.00', 2),
(38, '2020-10-27', 40, 38, 71373, 0, 0, 0, 0, '0.00', '0.00', 2),
(39, '2020-10-28', 40, 36, 71409, 0, 0, 0, 0, '0.00', '0.00', 2),
(40, '2020-10-29', 40, 30, 71439, 0, 0, 0, 0, '0.00', '0.00', 2),
(51, '2020-10-30', 60, 43, 71482, 0, 0, 0, 0, '0.00', '0.00', 2),
(52, '2020-01-01', 15, 13, 63772, 0, 0, 0, 0, '0.00', '0.00', 2),
(53, '2019-12-31', 50, 63759, 63759, 0, 0, 0, 0, '0.00', '0.00', 2),
(54, '2020-01-02', 15, 12, 63784, 0, 0, 0, 0, '0.00', '0.00', 2),
(55, '2020-01-03', 75, 55, 63839, 0, 0, 0, 0, '0.00', '0.00', 2),
(56, '2020-01-06', 40, 26, 63865, 0, 0, 0, 0, '0.00', '0.00', 2),
(57, '2020-01-07', 45, 30, 63895, 0, 0, 0, 0, '0.00', '0.00', 2),
(58, '2020-01-08', 45, 26, 63921, 0, 0, 0, 0, '0.00', '0.00', 2),
(59, '2020-01-09', 45, 18, 63939, 0, 0, 0, 0, '0.00', '0.00', 2),
(60, '2020-01-10', 85, 45, 63984, 0, 0, 0, 0, '0.00', '0.00', 2),
(61, '2020-01-13', 40, 23, 64007, 0, 0, 0, 0, '0.00', '0.00', 2),
(62, '2020-01-14', 45, 35, 64042, 0, 0, 0, 0, '0.00', '0.00', 2),
(63, '2020-01-15', 45, 29, 64071, 0, 0, 0, 0, '0.00', '0.00', 2),
(64, '2020-01-16', 45, 29, 64100, 0, 0, 0, 0, '0.00', '0.00', 2),
(65, '2020-01-17', 85, 47, 64147, 0, 0, 0, 0, '0.00', '0.00', 2),
(66, '2020-01-20', 40, 36, 64183, 0, 0, 0, 0, '0.00', '0.00', 2),
(67, '2020-01-21', 45, 28, 64211, 0, 0, 0, 0, '0.00', '0.00', 2),
(68, '2020-01-22', 45, 20, 64231, 0, 0, 0, 0, '0.00', '0.00', 2),
(69, '2020-01-23', 45, 16, 64247, 0, 0, 0, 0, '0.00', '0.00', 2),
(70, '2020-01-24', 85, 76, 64323, 0, 0, 0, 0, '0.00', '0.00', 2),
(71, '2020-01-27', 40, 35, 64358, 0, 0, 0, 0, '0.00', '0.00', 2),
(72, '2020-01-28', 45, 19, 64377, 0, 0, 0, 0, '0.00', '0.00', 2),
(73, '2020-01-29', 45, 25, 64402, 0, 0, 0, 0, '0.00', '0.00', 2),
(74, '2020-01-30', 45, 20, 64422, 0, 0, 0, 0, '0.00', '0.00', 2),
(75, '2020-01-31', 40, 22, 64444, 0, 0, 0, 0, '0.00', '0.00', 2),
(76, '2020-06-01', 35, 28, 67427, 0, 0, 0, 0, '0.00', '0.00', 2),
(77, '2020-05-29', 80, 61, 67399, 0, 0, 0, 0, '0.00', '0.00', 2),
(78, '2020-06-02', 45, 32, 67459, 0, 0, 0, 0, '0.00', '0.00', 2),
(79, '2020-06-03', 45, 33, 67492, 0, 0, 0, 0, '0.00', '0.00', 2),
(80, '2020-06-04', 40, 31, 67523, 0, 0, 0, 0, '0.00', '0.00', 2),
(81, '2020-06-05', 80, 67, 67590, 0, 0, 0, 0, '0.00', '0.00', 2),
(82, '2020-06-08', 45, 32, 67622, 0, 0, 0, 0, '0.00', '0.00', 2),
(83, '2020-06-09', 45, 30, 67652, 0, 0, 0, 0, '0.00', '0.00', 2),
(84, '2020-06-10', 45, 20, 67672, 0, 0, 0, 0, '0.00', '0.00', 2),
(85, '2020-06-11', 40, 29, 67701, 0, 0, 0, 0, '0.00', '0.00', 2),
(86, '2020-06-12', 80, 60, 67761, 0, 0, 0, 0, '0.00', '0.00', 2),
(87, '2020-06-15', 45, 29, 67790, 0, 0, 0, 0, '0.00', '0.00', 2),
(88, '2020-06-16', 45, 32, 67822, 0, 0, 0, 0, '0.00', '0.00', 2),
(89, '2020-06-17', 45, 31, 67853, 0, 0, 0, 0, '0.00', '0.00', 2),
(90, '2020-06-18', 40, 31, 67884, 0, 0, 0, 0, '0.00', '0.00', 2),
(91, '2020-06-19', 80, 59, 67943, 0, 0, 0, 0, '0.00', '0.00', 2),
(92, '2020-06-22', 45, 36, 67979, 0, 0, 0, 0, '0.00', '0.00', 2),
(93, '2020-06-23', 45, 35, 68014, 0, 0, 0, 0, '0.00', '0.00', 2),
(94, '2020-06-24', 45, 43, 68057, 0, 0, 0, 0, '0.00', '0.00', 2),
(95, '2020-06-25', 40, 37, 68094, 0, 0, 0, 0, '0.00', '0.00', 2),
(96, '2020-06-26', 80, 64, 68158, 0, 0, 0, 0, '0.00', '0.00', 2),
(97, '2020-06-29', 45, 26, 68184, 0, 0, 0, 0, '0.00', '0.00', 2),
(98, '2020-06-30', 45, 35, 68219, 0, 0, 0, 0, '0.00', '0.00', 2),
(99, '2020-11-01', 20, 20, 71502, 0, 0, 0, 0, '0.00', '0.00', 2),
(100, '2020-11-02', 40, 34, 71536, 0, 0, 0, 0, '0.00', '0.00', 2),
(101, '2020-11-03', 40, 31, 71567, 0, 0, 0, 0, '0.00', '0.00', 2),
(102, '2020-11-04', 40, 38, 71605, 0, 0, 0, 0, '0.00', '0.00', 2),
(104, '2020-11-06', 75, 62, 71702, 0, 0, 0, 0, '0.00', '0.00', 2),
(105, '2020-11-09', 40, 35, 71737, 0, 0, 0, 0, '0.00', '0.00', 2),
(106, '2020-11-10', 40, 28, 71765, 0, 0, 0, 0, '0.00', '0.00', 2),
(108, '2020-11-12', 40, 29, 71831, 0, 0, 0, 0, '0.00', '0.00', 2),
(109, '2020-11-13', 75, 63, 71894, 0, 0, 0, 0, '0.00', '0.00', 2),
(110, '2020-11-16', 40, 35, 71929, 0, 0, 0, 0, '0.00', '0.00', 2),
(111, '2020-11-17', 40, 40, 71969, 0, 0, 0, 0, '0.00', '0.00', 2),
(113, '2020-11-19', 40, 32, 72034, 0, 0, 0, 0, '0.00', '0.00', 2),
(114, '2020-11-20', 75, 62, 72096, 0, 0, 0, 0, '0.00', '0.00', 2),
(115, '2020-11-23', 40, 38, 72134, 0, 0, 0, 0, '0.00', '0.00', 2),
(116, '2020-11-24', 40, 40, 72174, 0, 0, 0, 0, '0.00', '0.00', 2),
(117, '2020-11-25', 40, 32, 72206, 0, 0, 0, 0, '0.00', '0.00', 2),
(118, '2020-11-26', 40, 38, 72244, 0, 0, 0, 0, '0.00', '0.00', 2),
(119, '2020-11-27', 75, 60, 72304, 0, 0, 0, 0, '0.00', '0.00', 2),
(120, '2020-11-30', 40, 38, 72342, 0, 0, 0, 0, '0.00', '0.00', 2),
(121, '2020-02-01', 20, 16, 64460, 0, 0, 0, 0, '0.00', '0.00', 2),
(122, '2020-02-02', 20, 15, 64475, 0, 0, 0, 0, '0.00', '0.00', 2),
(123, '2020-02-03', 45, 24, 64499, 0, 0, 0, 0, '0.00', '0.00', 2),
(124, '2020-02-04', 45, 21, 64520, 0, 0, 0, 0, '0.00', '0.00', 2),
(125, '2020-02-05', 45, 23, 64543, 0, 0, 0, 0, '0.00', '0.00', 2),
(126, '2020-02-06', 45, 35, 64578, 0, 0, 0, 0, '0.00', '0.00', 2),
(127, '2020-02-07', 85, 85, 64663, 0, 0, 0, 0, '0.00', '0.00', 2),
(128, '2020-02-10', 45, 40, 64703, 0, 0, 0, 0, '0.00', '0.00', 2),
(129, '2020-02-11', 45, 30, 64733, 0, 0, 0, 0, '0.00', '0.00', 2),
(130, '2020-02-12', 45, 26, 64759, 0, 0, 0, 0, '0.00', '0.00', 2),
(131, '2020-02-13', 45, 28, 64787, 0, 0, 0, 0, '0.00', '0.00', 2),
(132, '2020-02-14', 75, 61, 64848, 0, 0, 0, 0, '0.00', '0.00', 2),
(133, '2020-02-17', 45, 32, 64880, 0, 0, 0, 0, '0.00', '0.00', 2),
(134, '2020-02-18', 45, 33, 64913, 0, 0, 0, 0, '0.00', '0.00', 2),
(135, '2020-02-19', 45, 22, 64935, 0, 0, 0, 0, '0.00', '0.00', 2),
(136, '2020-02-20', 45, 28, 64963, 0, 0, 0, 0, '0.00', '0.00', 2),
(137, '2020-02-21', 85, 74, 65037, 0, 0, 0, 0, '0.00', '0.00', 2),
(138, '2020-02-24', 45, 26, 65063, 0, 0, 0, 0, '0.00', '0.00', 2),
(139, '2020-02-25', 45, 30, 65093, 0, 0, 0, 0, '0.00', '0.00', 2),
(140, '2020-02-26', 45, 26, 65119, 0, 0, 0, 0, '0.00', '0.00', 2),
(141, '2020-02-27', 45, 24, 65143, 0, 0, 0, 0, '0.00', '0.00', 2),
(142, '2020-02-28', 75, 50, 65193, 0, 0, 0, 0, '0.00', '0.00', 2),
(143, '2020-03-01', 25, 24, 65235, 0, 0, 0, 0, '0.00', '0.00', 2),
(144, '2020-03-02', 35, 27, 65262, 0, 0, 0, 0, '0.00', '0.00', 2),
(145, '2020-03-03', 40, 31, 65293, 0, 0, 0, 0, '0.00', '0.00', 2),
(146, '2020-03-04', 40, 29, 65322, 0, 0, 0, 0, '0.00', '0.00', 2),
(147, '2020-03-05', 40, 35, 65357, 0, 0, 0, 0, '0.00', '0.00', 2),
(148, '2020-03-06', 85, 57, 65414, 0, 0, 0, 0, '0.00', '0.00', 2),
(149, '2020-03-09', 45, 26, 65440, 0, 0, 0, 0, '0.00', '0.00', 2),
(150, '2020-03-10', 40, 26, 65466, 0, 0, 0, 0, '0.00', '0.00', 2),
(151, '2020-03-11', 40, 25, 65491, 0, 0, 0, 0, '0.00', '0.00', 2),
(152, '2020-03-12', 40, 15, 65506, 0, 0, 0, 0, '0.00', '0.00', 2),
(153, '2020-03-13', 85, 34, 65540, 0, 0, 0, 0, '0.00', '0.00', 2),
(154, '2020-03-16', 45, 22, 65562, 0, 0, 0, 0, '0.00', '0.00', 2),
(155, '2020-03-17', 40, 27, 65589, 0, 0, 0, 0, '0.00', '0.00', 2),
(156, '2020-03-18', 40, 25, 65614, 0, 0, 0, 0, '0.00', '0.00', 2),
(157, '2020-03-19', 40, 25, 65639, 0, 0, 0, 0, '0.00', '0.00', 2),
(158, '2020-03-20', 85, 69, 65708, 0, 0, 0, 0, '0.00', '0.00', 2),
(159, '2020-03-23', 45, 30, 65738, 0, 0, 0, 0, '0.00', '0.00', 2),
(160, '2020-03-24', 40, 23, 65761, 0, 0, 0, 0, '0.00', '0.00', 2),
(161, '2020-03-25', 40, 34, 65795, 0, 0, 0, 0, '0.00', '0.00', 2),
(162, '2020-03-26', 40, 27, 65822, 0, 0, 0, 0, '0.00', '0.00', 2),
(163, '2020-03-27', 85, 49, 65871, 0, 0, 0, 0, '0.00', '0.00', 2),
(164, '2020-03-30', 45, 45, 65916, 0, 0, 0, 0, '0.00', '0.00', 2),
(165, '2020-03-31', 40, 35, 65951, 0, 0, 0, 0, '0.00', '0.00', 2),
(168, '2020-02-29', 20, 18, 65211, 0, 0, 0, 0, '0.00', '0.00', 2),
(169, '2020-11-05', 40, 35, 71640, 0, 0, 0, 0, '0.00', '0.00', 2),
(170, '2020-11-11', 40, 37, 71802, 0, 0, 0, 0, '0.00', '0.00', 2),
(171, '2020-11-18', 40, 33, 72002, 0, 0, 0, 0, '0.00', '0.00', 2),
(174, '2020-12-01', 40, 39, 72381, 0, 0, 0, 0, '0.00', '0.00', 2),
(175, '2020-12-02', 40, 38, 72419, 0, 0, 0, 0, '0.00', '0.00', 2),
(176, '2020-12-03', 40, 30, 72449, 0, 0, 0, 0, '0.00', '0.00', 2),
(177, '2020-12-04', 70, 64, 72513, 0, 0, 0, 0, '0.00', '0.00', 2),
(178, '2020-12-07', 40, 35, 72548, 0, 0, 0, 0, '0.00', '0.00', 2),
(179, '2020-12-08', 40, 32, 72580, 0, 0, 0, 0, '0.00', '0.00', 2),
(180, '2020-12-09', 40, 39, 72619, 0, 0, 0, 0, '0.00', '0.00', 2),
(181, '2020-12-10', 40, 36, 72655, 0, 0, 0, 0, '0.00', '0.00', 2),
(182, '2020-12-11', 70, 65, 72720, 0, 0, 0, 0, '4.50', '0.00', 2),
(183, '2020-12-14', 40, 35, 72755, 0, 0, 0, 0, '1.50', '0.00', 2),
(184, '2020-12-15', 40, 37, 72792, 0, 0, 0, 0, '1.50', '0.00', 2),
(185, '2020-12-16', 40, 33, 72825, 0, 0, 0, 0, '1.50', '0.00', 2),
(186, '2020-12-17', 40, 35, 72860, 0, 0, 0, 0, '1.50', '0.00', 2),
(187, '2020-12-18', 70, 69, 72929, 0, 0, 0, 0, '4.50', '0.00', 2),
(188, '2020-12-21', 40, 36, 72965, 0, 0, 0, 0, '1.50', '0.00', 2),
(189, '2020-12-22', 40, 35, 73000, 0, 0, 0, 0, '1.50', '0.00', 2),
(190, '2020-12-23', 40, 36, 73036, 0, 0, 0, 0, '1.50', '0.00', 2),
(191, '2020-12-24', 90, 88, 73124, 0, 0, 0, 0, '6.00', '0.00', 2),
(193, '2020-12-28', 40, 35, 73159, 0, 0, 0, 0, '1.50', '0.00', 2),
(194, '2020-12-29', 40, 36, 73195, 0, 0, 0, 0, '1.50', '0.00', 2),
(195, '2020-12-30', 60, 49, 73244, 0, 0, 0, 0, '1.50', '0.00', 2),
(199, '2020-04-01', 35, 35, 65986, 0, 0, 0, 0, '0.00', '0.00', 2),
(200, '2020-04-02', 45, 45, 66031, 0, 0, 0, 0, '0.00', '0.00', 2),
(201, '2020-04-03', 75, 64, 66095, 0, 0, 0, 0, '0.00', '0.00', 2),
(202, '2020-04-06', 45, 30, 66125, 0, 0, 0, 0, '0.00', '0.00', 2),
(203, '2020-04-07', 45, 26, 66151, 0, 0, 0, 0, '0.00', '0.00', 2),
(204, '2020-04-08', 45, 24, 66175, 0, 0, 0, 0, '0.00', '0.00', 2),
(205, '2020-04-09', 45, 32, 66207, 0, 0, 0, 0, '0.00', '0.00', 2),
(206, '2020-04-10', 75, 53, 66260, 0, 0, 0, 0, '0.00', '0.00', 2),
(207, '2020-04-13', 45, 27, 66287, 0, 0, 0, 0, '0.00', '0.00', 2),
(208, '2020-04-14', 45, 28, 66315, 0, 0, 0, 0, '0.00', '0.00', 2),
(209, '2020-04-15', 45, 16, 66331, 0, 0, 0, 0, '0.00', '0.00', 2),
(210, '2020-04-16', 45, 19, 66350, 0, 0, 0, 0, '0.00', '0.00', 2),
(211, '2020-04-17', 75, 61, 66411, 0, 0, 0, 0, '0.00', '0.00', 2),
(212, '2020-04-20', 45, 28, 66439, 0, 0, 0, 0, '0.00', '0.00', 2),
(213, '2020-04-21', 45, 30, 66469, 0, 0, 0, 0, '0.00', '0.00', 2),
(214, '2020-04-22', 45, 31, 66500, 0, 0, 0, 0, '0.00', '0.00', 2),
(215, '2020-04-23', 45, 25, 66525, 0, 0, 0, 0, '0.00', '0.00', 2),
(216, '2020-04-24', 75, 62, 66587, 0, 0, 0, 0, '0.00', '0.00', 2),
(217, '2020-04-27', 45, 24, 66611, 0, 0, 0, 0, '0.00', '0.00', 2),
(218, '2020-04-28', 45, 33, 66644, 0, 0, 0, 0, '0.00', '0.00', 2),
(219, '2020-04-29', 45, 25, 66669, 0, 0, 0, 0, '0.00', '0.00', 2),
(220, '2020-04-30', 45, 35, 66704, 0, 0, 0, 0, '0.00', '0.00', 2),
(221, '2020-05-01', 60, 56, 66760, 0, 0, 0, 0, '0.00', '0.00', 2),
(222, '2020-05-04', 45, 29, 66789, 0, 0, 0, 0, '0.00', '0.00', 2),
(223, '2020-05-05', 45, 33, 66822, 0, 0, 0, 0, '0.00', '0.00', 2),
(224, '2020-05-06', 45, 24, 66846, 0, 0, 0, 0, '0.00', '0.00', 2),
(225, '2020-05-07', 45, 27, 66873, 0, 0, 0, 0, '0.00', '0.00', 2),
(226, '2020-05-08', 80, 49, 66922, 0, 0, 0, 0, '0.00', '0.00', 2),
(227, '2020-05-11', 45, 22, 66944, 0, 0, 0, 0, '0.00', '0.00', 2),
(228, '2020-05-12', 45, 28, 66972, 0, 0, 0, 0, '0.00', '0.00', 2),
(229, '2020-05-13', 45, 26, 66998, 0, 0, 0, 0, '0.00', '0.00', 2),
(230, '2020-05-14', 45, 25, 67023, 0, 0, 0, 0, '0.00', '0.00', 2),
(231, '2020-05-15', 80, 50, 67073, 0, 0, 0, 0, '0.00', '0.00', 2),
(232, '2020-05-18', 45, 20, 67093, 0, 0, 0, 0, '0.00', '0.00', 2),
(233, '2020-05-19', 45, 31, 67124, 0, 0, 0, 0, '0.00', '0.00', 2),
(234, '2020-05-20', 45, 20, 67144, 0, 0, 0, 0, '0.00', '0.00', 2),
(235, '2020-05-21', 45, 27, 67171, 0, 0, 0, 0, '0.00', '0.00', 2),
(236, '2020-05-22', 80, 57, 67228, 0, 0, 0, 0, '0.00', '0.00', 2),
(237, '2020-05-25', 45, 20, 67248, 0, 0, 0, 0, '0.00', '0.00', 2),
(238, '2020-05-26', 45, 32, 67280, 0, 0, 0, 0, '0.00', '0.00', 2),
(239, '2020-05-27', 45, 26, 67306, 0, 0, 0, 0, '0.00', '0.00', 2),
(240, '2020-05-28', 45, 32, 67338, 0, 0, 0, 0, '0.00', '0.00', 2),
(242, '2020-07-01', 40, 37, 68256, 0, 0, 0, 0, '0.00', '0.00', 2),
(243, '2020-07-02', 40, 29, 68285, 0, 0, 0, 0, '0.00', '0.00', 2),
(244, '2020-07-03', 85, 63, 68348, 0, 0, 0, 0, '0.00', '0.00', 2),
(245, '2020-07-06', 40, 38, 68386, 0, 0, 0, 0, '0.00', '0.00', 2),
(246, '2020-07-07', 40, 40, 68426, 0, 0, 0, 0, '0.00', '0.00', 2),
(247, '2020-07-08', 40, 38, 68464, 0, 0, 0, 0, '0.00', '0.00', 2),
(248, '2020-07-09', 40, 35, 68499, 0, 0, 0, 0, '0.00', '0.00', 2),
(249, '2020-07-10', 85, 56, 68555, 0, 0, 0, 0, '0.00', '0.00', 2),
(250, '2020-07-13', 40, 32, 68587, 0, 0, 0, 0, '0.00', '0.00', 2),
(251, '2020-07-14', 40, 36, 68623, 0, 0, 0, 0, '0.00', '0.00', 2),
(252, '2020-07-15', 40, 31, 68654, 0, 0, 0, 0, '0.00', '0.00', 2),
(253, '2020-07-16', 40, 38, 68692, 0, 0, 0, 0, '0.00', '0.00', 2),
(254, '2020-07-17', 85, 56, 68748, 0, 0, 0, 0, '0.00', '0.00', 2),
(255, '2020-07-20', 40, 36, 68784, 0, 0, 0, 0, '0.00', '0.00', 2),
(256, '2020-07-21', 40, 35, 68819, 0, 0, 0, 0, '0.00', '0.00', 2),
(257, '2020-07-22', 40, 38, 68857, 0, 0, 0, 0, '0.00', '0.00', 2),
(258, '2020-07-23', 40, 34, 68891, 0, 0, 0, 0, '0.00', '0.00', 2),
(259, '2020-07-24', 85, 45, 68936, 0, 0, 0, 0, '0.00', '0.00', 2),
(260, '2020-07-27', 40, 15, 68951, 0, 0, 0, 0, '0.00', '0.00', 2),
(261, '2020-07-28', 40, 32, 68983, 0, 0, 0, 0, '0.00', '0.00', 2),
(262, '2020-07-29', 40, 33, 69016, 0, 0, 0, 0, '0.00', '0.00', 2),
(263, '2020-07-30', 40, 36, 69052, 0, 0, 0, 0, '0.00', '0.00', 2),
(264, '2020-07-31', 40, 26, 69078, 0, 0, 0, 0, '0.00', '0.00', 2),
(265, '2020-08-01', 20, 16, 69094, 0, 0, 0, 0, '0.00', '0.00', 2),
(266, '2020-08-02', 20, 16, 69110, 0, 0, 0, 0, '0.00', '0.00', 2),
(267, '2020-08-03', 40, 34, 69144, 0, 0, 0, 0, '0.00', '0.00', 2),
(268, '2020-08-04', 40, 25, 69169, 0, 0, 0, 0, '0.00', '0.00', 2),
(269, '2020-08-05', 40, 35, 69204, 0, 0, 0, 0, '0.00', '0.00', 2),
(270, '2020-08-06', 40, 36, 69240, 0, 0, 0, 0, '0.00', '0.00', 2),
(271, '2020-08-07', 90, 55, 69295, 0, 0, 0, 0, '0.00', '0.00', 2),
(272, '2020-08-10', 45, 37, 69332, 0, 0, 0, 0, '0.00', '0.00', 2),
(273, '2020-08-11', 40, 36, 69368, 0, 0, 0, 0, '0.00', '0.00', 2),
(274, '2020-08-12', 40, 30, 69398, 0, 0, 0, 0, '0.00', '0.00', 2),
(275, '2020-08-13', 40, 38, 69436, 0, 0, 0, 0, '0.00', '0.00', 2),
(276, '2020-08-14', 90, 62, 69498, 0, 0, 0, 0, '0.00', '0.00', 2),
(277, '2020-08-17', 45, 32, 69530, 0, 0, 0, 0, '0.00', '0.00', 2),
(278, '2020-08-18', 40, 32, 69562, 0, 0, 0, 0, '0.00', '0.00', 2),
(279, '2020-08-19', 40, 35, 69597, 0, 0, 0, 0, '0.00', '0.00', 2),
(280, '2020-08-20', 40, 34, 69631, 0, 0, 0, 0, '0.00', '0.00', 2),
(281, '2020-08-21', 90, 60, 69691, 0, 0, 0, 0, '0.00', '0.00', 2),
(282, '2020-08-24', 45, 15, 69706, 0, 0, 0, 0, '0.00', '0.00', 2),
(283, '2020-08-25', 40, 28, 69734, 0, 0, 0, 0, '0.00', '0.00', 2),
(284, '2020-08-26', 40, 35, 69769, 0, 0, 0, 0, '0.00', '0.00', 2),
(285, '2020-08-27', 40, 29, 69798, 0, 0, 0, 0, '0.00', '0.00', 2),
(286, '2020-08-28', 90, 69, 69867, 0, 0, 0, 0, '0.00', '0.00', 2),
(287, '2020-08-31', 45, 42, 69909, 0, 0, 0, 0, '0.00', '0.00', 2),
(288, '2020-09-01', 40, 35, 69944, 0, 0, 0, 0, '0.00', '0.00', 2),
(289, '2020-09-02', 40, 28, 69972, 0, 0, 0, 0, '0.00', '0.00', 2),
(290, '2020-09-03', 40, 23, 69995, 0, 0, 0, 0, '0.00', '0.00', 2),
(291, '2020-09-04', 80, 36, 70031, 0, 0, 0, 0, '0.00', '0.00', 2),
(292, '2020-09-07', 50, 20, 70051, 0, 0, 0, 0, '0.00', '0.00', 2),
(293, '2020-09-08', 40, 20, 70071, 0, 0, 0, 0, '0.00', '0.00', 2),
(294, '2020-09-09', 40, 18, 70089, 0, 0, 0, 0, '0.00', '0.00', 2),
(295, '2020-09-10', 40, 19, 70108, 0, 0, 0, 0, '0.00', '0.00', 2),
(296, '2020-09-11', 90, 38, 70146, 0, 0, 0, 0, '0.00', '0.00', 2),
(297, '2020-09-14', 50, 20, 70166, 0, 0, 0, 0, '0.00', '0.00', 2),
(298, '2020-09-15', 40, 25, 70191, 0, 0, 0, 0, '0.00', '0.00', 2),
(299, '2020-09-16', 40, 26, 70217, 0, 0, 0, 0, '0.00', '0.00', 2),
(300, '2020-09-17', 40, 10, 70227, 0, 0, 0, 0, '0.00', '0.00', 2),
(301, '2020-09-18', 80, 48, 70275, 0, 0, 0, 0, '0.00', '0.00', 2),
(302, '2020-09-21', 50, 32, 70307, 0, 0, 0, 0, '0.00', '0.00', 2),
(303, '2020-09-22', 40, 33, 70340, 0, 0, 0, 0, '0.00', '0.00', 2),
(304, '2020-09-23', 40, 35, 70375, 0, 0, 0, 0, '0.00', '0.00', 2),
(305, '2020-09-24', 40, 33, 70408, 0, 0, 0, 0, '0.00', '0.00', 2),
(306, '2020-09-25', 90, 68, 70476, 0, 0, 0, 0, '0.00', '0.00', 2),
(307, '2020-09-28', 50, 30, 70506, 0, 0, 0, 0, '0.00', '0.00', 2),
(308, '2020-09-29', 40, 34, 70540, 0, 0, 0, 0, '0.00', '0.00', 2),
(330, '2021-01-01', 45, 38, 73282, 0, 0, 0, 0, '1.50', '0.00', 2),
(331, '2021-01-04', 40, 34, 73316, 0, 0, 0, 0, '1.50', '0.00', 2),
(333, '2021-01-06', 45, 42, 73400, 0, 0, 0, 0, '1.50', '0.00', 2),
(334, '2021-01-05', 45, 42, 73358, 0, 0, 0, 0, '1.50', '0.00', 2),
(335, '2021-01-07', 45, 44, 73444, 0, 0, 0, 0, '1.50', '0.00', 2),
(337, '2021-01-08', 90, 86, 73530, 0, 0, 0, 0, '1.50', '0.00', 2),
(338, '2021-01-11', 40, 35, 73565, 0, 0, 0, 0, '1.50', '0.00', 2),
(339, '2021-01-12', 45, 42, 73607, 0, 0, 0, 0, '1.50', '0.00', 2),
(340, '2021-01-13', 45, 40, 73647, 0, 0, 0, 0, '1.50', '0.00', 2),
(341, '2021-01-14', 45, 44, 73691, 0, 0, 0, 0, '1.50', '0.00', 2),
(342, '2021-01-15', 90, 88, 73779, 0, 0, 0, 0, '1.50', '0.00', 2),
(343, '2021-01-18', 40, 39, 73818, 0, 0, 0, 0, '1.50', '0.00', 2),
(344, '2021-01-19', 45, 31, 73849, 0, 0, 0, 0, '1.50', '0.00', 2),
(345, '2021-01-20', 45, 41, 73890, 0, 0, 0, 0, '1.50', '0.00', 2),
(346, '2021-01-21', 45, 42, 73932, 0, 0, 0, 0, '1.50', '0.00', 2),
(347, '2021-01-22', 90, 68, 74000, 0, 0, 0, 0, '1.50', '0.00', 2),
(348, '2021-01-25', 40, 35, 74035, 0, 0, 0, 0, '1.50', '0.00', 2),
(349, '2021-01-26', 45, 41, 74076, 0, 0, 0, 0, '1.50', '0.00', 2),
(350, '2021-01-27', 45, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(351, '2021-01-28', 45, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(352, '2021-01-29', 85, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(366, '2021-02-01', 40, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(367, '2021-02-02', 45, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(368, '2021-02-03', 45, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2),
(369, '2021-02-04', 45, 0, 0, 0, 0, 0, 0, '1.50', '0.00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `notificacion` text NOT NULL,
  `fecha` datetime NOT NULL,
  `leida` tinyint(1) NOT NULL,
  `vinculo` varchar(200) NOT NULL,
  `estatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`id`, `id_usuario`, `notificacion`, `fecha`, `leida`, `vinculo`, `estatus`) VALUES
(437, 7, '<b>Yaro</b> te ha asignado la tarea: <b>wefsefsdfsdfs</b>', '2020-03-04 16:28:11', 1, 'tasks/7/2020-03-04 15:11:26/2020-03-04 15:11:26', 'info'),
(442, 7, '<b>Yaro</b> te ha asignado la tarea: <b>probar el sitio</b>', '2020-03-04 16:29:03', 1, 'tasks/7/2020-03-04 16:29:00/2020-03-04 16:29:00', 'info'),
(452, 7, 'Tarea incumplida: <b>wefsefsdfsdfs</b>', '2020-03-05 08:22:26', 1, 'tasks/7/Wed Mar 04 2020 10:11:26 GMT-0500 (GMT-05:00)/Wed Mar 04 2020 10:11:26 GMT-0500 (GMT-05:00)', 'danger'),
(458, 7, 'Tarea incumplida: <b>probar el sitio</b>', '2020-03-05 08:22:26', 1, 'tasks/7/Wed Mar 04 2020 11:29:00 GMT-0500 (GMT-05:00)/Wed Mar 04 2020 11:29:00 GMT-0500 (GMT-05:00)', 'danger'),
(985, 7, '<b>Yaro</b> te ha asignado la tarea: <b>Trabajo en la intranet de Citmatel.</b>', '2020-09-10 12:25:37', 1, 'tasks/7/2020-09-18T08:00:00.000Z/2020-09-18T08:00:00.000Z', 'info'),
(1142, 7, 'Tarea incumplida: <b>Trabajo en la intranet de Citmatel.</b>', '2020-09-23 11:18:38', 1, 'tasks/7/Fri Sep 18 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Sep 18 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1196, 7, '<b>Yaro</b> te ha asignado la tarea: <b>Parte de energía</b>', '2020-09-29 21:13:44', 0, 'tasks/7/2020-10-01 08:30:00.000/2020-10-01 08:30:00.000', 'info'),
(1219, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-09-30 17:41:18', 0, 'tasks/7/Tue Sep 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Wed Sep 02 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1221, 10, 'Tarea incumplida: <b>Contabilidad</b>', '2020-09-30 18:50:18', 1, 'tasks/10/Wed Sep 02 2020 10:00:00 GMT+0000 (Coordinated Universal Time)/Wed Sep 02 2020 10:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1252, 10, 'Tarea incumplida: <b>Envio de carta de facturacion</b>', '2020-10-02 00:00:21', 0, 'tasks/10/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1254, 10, 'Tarea incumplida: <b>Realizar el excel con los pronósticos de ingresos del mes de todos los servicios</b>', '2020-10-02 00:00:21', 0, 'tasks/10/Thu Oct 01 2020 15:14:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 15:14:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1258, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-02 12:38:53', 0, 'tasks/10/Thu Oct 01 2020 14:30:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 14:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1261, 10, '<b>Yaro</b> te ha asignado la tarea: <b>Visita a proveedor de comercio electronico</b>', '2020-10-02 12:45:57', 0, 'tasks/10/2020-10-06 08:30:00.000/2020-10-06 08:30:00.000', 'info'),
(1262, 10, '<b>Yaro</b> te ha asignado la tarea: <b>Visita a cliente de comercio electronico</b>', '2020-10-02 12:47:22', 0, 'tasks/10/2020-10-07 08:30:00.000/2020-10-07 08:30:00.000', 'info'),
(1263, 10, '<b>Yaro</b> te ha asignado la tarea: <b>Visita a cliente de comercio electronico</b>', '2020-10-02 12:48:46', 0, 'tasks/10/2020-10-08 08:30:00.000/2020-10-08 08:30:00.000', 'info'),
(1264, 10, '<b>Yaro</b> te ha asignado la tarea: <b>Visita a cliente de comercio electronico</b>', '2020-10-02 12:50:05', 0, 'tasks/10/2020-10-13 08:30:00.000/2020-10-13 08:30:00.000', 'info'),
(1265, 10, '<b>Yaro</b> te ha asignado la tarea: <b>Visita a cliente de comercio electronico</b>', '2020-10-02 12:51:23', 0, 'tasks/10/2020-10-15 08:30:00.000/2020-10-15 08:30:00.000', 'info'),
(1267, 11, '<b>Yaro</b> incumplió la tarea : <b>Preparación y envío de informaciones de cierre de mes</b>', '2020-10-02 14:04:55', 0, 'tasks/8/Thu Oct 01 2020 08:15:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1269, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-02 14:06:55', 0, 'tasks/8/Thu Oct 01 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1270, 11, '<b>Yaro</b> ha completado: <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-02 14:08:24', 0, 'tasks/8/Thu Oct 01 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1271, 11, '<b>Yaro</b> ha completado: <b>Preparación y envío de informaciones de cierre de mes</b>', '2020-10-02 14:08:29', 0, 'tasks/8/Thu Oct 01 2020 08:15:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:15:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1272, 11, '<b>Yaro</b> ha completado: <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-02 14:08:53', 0, 'tasks/8/Fri Oct 02 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1274, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-02 14:08:55', 0, 'tasks/8/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1275, 11, '<b>Yaro</b> ha completado: <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-02 14:09:23', 0, 'tasks/8/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 01 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1284, 7, 'Tarea incumplida: <b>Revisión al funcionamiento de los servidores</b>', '2020-10-03 00:00:17', 0, 'tasks/7/Fri Oct 02 2020 09:05:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 09:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1286, 7, 'Tarea incumplida: <b>Visita a Bandec</b>', '2020-10-03 00:00:17', 0, 'tasks/7/Fri Oct 02 2020 11:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 11:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1288, 7, 'Tarea incumplida: <b>Atención a dificultades q surjan</b>', '2020-10-03 00:00:17', 0, 'tasks/7/Fri Oct 02 2020 13:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 13:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1290, 10, 'Tarea incumplida: <b>Reunion de puntualizacion del cumplimiento de las tareas de la semana</b>', '2020-10-03 00:00:17', 0, 'tasks/10/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1292, 10, 'Tarea incumplida: <b>Hacer PF y facturar servicios brindados y pagados</b>', '2020-10-03 00:00:17', 0, 'tasks/10/Fri Oct 02 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1295, 11, '<b>Yaro</b> incumplió la tarea : <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-03 00:00:17', 0, 'tasks/8/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1296, 11, '<b>Yarisel Corrales Cadenas</b> le ha dado entrada al equipo: <b>Monitor Aopen</b>.', '2020-10-03 00:00:00', 0, '/workshop', 'info'),
(1297, 11, '<b>Yaro</b> ha pospuesto: <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-03 00:07:32', 0, 'tasks/8/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 02 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'info'),
(1303, 11, '<b>Yaro</b> ha completado: <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-05 18:42:29', 0, 'tasks/8/Mon Oct 05 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1304, 11, '<b>Yaro</b> ha completado: <b>Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-05 18:42:40', 0, 'tasks/8/Mon Oct 05 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1305, 11, '<b>Yaro</b> ha completado: <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-05 18:44:29', 0, 'tasks/8/Mon Oct 05 2020 08:05:11 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:05:11 GMT+0000 (Coordinated Universal Time)', 'success'),
(1306, 11, '<b>Yaro</b> ha completado: <b>Realizar el autofocal en el DST</b>', '2020-10-05 18:44:35', 0, 'tasks/8/Mon Oct 05 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1307, 11, '<b>Yaro</b> ha completado: <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-05 18:55:06', 0, 'tasks/8/Mon Oct 05 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'success'),
(1320, 10, 'Tarea incumplida: <b>Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-06 00:00:22', 0, 'tasks/10/Mon Oct 05 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1322, 10, 'Tarea incumplida: <b>Reunion de puntualizacion del cumplimiento de las tareas de la semana</b>', '2020-10-06 00:00:22', 0, 'tasks/10/Mon Oct 05 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1325, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-06 00:00:22', 0, 'tasks/8/Mon Oct 05 2020 17:15:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 17:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1327, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-06 00:00:22', 0, 'tasks/8/Mon Oct 05 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 05 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1340, 7, 'Tarea incumplida: <b>Prueba semanal Grupo Electrógeno</b>', '2020-10-07 00:00:19', 0, 'tasks/7/Tue Oct 06 2020 09:00:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 09:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1342, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-07 00:00:19', 0, 'tasks/7/Tue Oct 06 2020 13:00:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 13:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1344, 7, 'Tarea incumplida: <b>Proyección video conferencia ONN</b>', '2020-10-07 00:00:19', 0, 'tasks/7/Tue Oct 06 2020 14:00:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 14:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1346, 10, 'Tarea incumplida: <b>Reunion de puntualizacion del cumplimiento de las tareas de la semana</b>', '2020-10-07 00:00:19', 0, 'tasks/10/Tue Oct 06 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1348, 10, 'Tarea incumplida: <b>Visita a proveedor de comercio electronico</b>', '2020-10-07 00:00:19', 0, 'tasks/10/Tue Oct 06 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1351, 11, '<b>Yaro</b> incumplió la tarea : <b>Verificar que se realice la prueba semanal del Grupo Electrógeno</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1353, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1355, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1357, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 17:15:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 17:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1359, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1361, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-07 00:00:19', 0, 'tasks/8/Tue Oct 06 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Tue Oct 06 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1373, 10, 'Tarea incumplida: <b>Preparacion como reserva de cuadro</b>', '2020-10-08 00:00:22', 0, 'tasks/10/Wed Oct 07 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1375, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-08 00:00:22', 0, 'tasks/10/Wed Oct 07 2020 14:30:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 14:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1377, 10, 'Tarea incumplida: <b>Visita a cliente de comercio electronico</b>', '2020-10-08 00:00:22', 0, 'tasks/10/Wed Oct 07 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1380, 11, '<b>Yaro</b> incumplió la tarea : <b>Preparación a las Reservas de Cuadro</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1382, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1384, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 17:15:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 17:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1386, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1388, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1390, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1392, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisión de la documentación del GEE</b>', '2020-10-08 00:00:22', 0, 'tasks/8/Wed Oct 07 2020 09:00:00 GMT+0000 (Coordinated Universal Time)/Wed Oct 07 2020 09:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1405, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-09 00:00:27', 0, 'tasks/7/Thu Oct 08 2020 13:00:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 13:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1407, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-09 00:00:27', 0, 'tasks/10/Thu Oct 08 2020 14:30:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 14:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1409, 10, 'Tarea incumplida: <b>Visita a cliente de comercio electronico</b>', '2020-10-09 00:00:27', 0, 'tasks/10/Thu Oct 08 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1412, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-09 00:00:27', 0, 'tasks/8/Thu Oct 08 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1414, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-09 00:00:27', 0, 'tasks/8/Thu Oct 08 2020 17:15:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 17:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1416, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-09 00:00:27', 0, 'tasks/8/Thu Oct 08 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1418, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-09 00:00:27', 0, 'tasks/8/Thu Oct 08 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1420, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-09 00:00:27', 0, 'tasks/8/Thu Oct 08 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Thu Oct 08 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1429, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-10 00:00:32', 0, 'tasks/7/Fri Oct 09 2020 08:10:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:10:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1431, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-10 00:00:32', 0, 'tasks/7/Fri Oct 09 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1433, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-10 00:00:32', 0, 'tasks/7/Fri Oct 09 2020 13:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 13:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1435, 7, 'Tarea incumplida: <b>Proyección de video conferencia Directora General de Organización</b>', '2020-10-10 00:00:32', 0, 'tasks/7/Fri Oct 09 2020 09:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 09:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1437, 10, 'Tarea incumplida: <b>Reunion de puntualizacion del cumplimiento de las tareas de la semana</b>', '2020-10-10 00:00:32', 0, 'tasks/10/Fri Oct 09 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1439, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-10 00:00:32', 0, 'tasks/10/Fri Oct 09 2020 14:30:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 14:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1441, 10, 'Tarea incumplida: <b>Pasar a contabilidad los cobros efectuados y facturar</b>', '2020-10-10 00:00:32', 0, 'tasks/10/Mon Oct 05 2020 10:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 10:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1443, 10, 'Tarea incumplida: <b>Venta de tarjetas nauta y cupón de recarga</b>', '2020-10-10 00:00:32', 0, 'tasks/10/Mon Oct 05 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1445, 7, 'Tarea incumplida: <b>Proyección videoconferencia Directora Auditoría</b>', '2020-10-10 00:00:32', 0, 'tasks/7/Fri Oct 09 2020 11:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 11:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1448, 11, '<b>Yaro</b> incumplió la tarea : <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 15:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 15:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1450, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1452, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 17:15:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 17:15:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1454, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1456, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1458, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-10 00:00:32', 0, 'tasks/8/Fri Oct 09 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Fri Oct 09 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1467, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-13 00:00:07', 0, 'tasks/7/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1469, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-13 00:00:07', 0, 'tasks/7/Mon Oct 12 2020 08:10:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:10:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1471, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-13 00:00:07', 0, 'tasks/7/Mon Oct 12 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1473, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-13 00:00:07', 0, 'tasks/7/Mon Oct 12 2020 13:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 13:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1475, 10, 'Tarea incumplida: <b>Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-13 00:00:07', 0, 'tasks/10/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1477, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-13 00:00:07', 0, 'tasks/10/Mon Oct 12 2020 14:30:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 14:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1480, 11, '<b>Yaro</b> incumplió la tarea : <b>	Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1482, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar el autofocal en el DST</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 08:30:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1484, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 08:40:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:40:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1486, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 16:30:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 16:30:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1488, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 08:05:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:05:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1490, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-13 00:00:07', 0, 'tasks/8/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)/Mon Oct 12 2020 08:00:00 GMT+0000 (Coordinated Universal Time)', 'danger'),
(1495, 7, '<b>Yaro</b> ha validado tus tareas del <b>2020-10-01</b> al <b>2020-11-01</b>', '2020-10-13 13:14:45', 0, 'tasks/7/2020-10-01T04:00:00.000Z/2020-11-01T03:59:59.999Z', 'info'),
(1499, 9, '<b>Yaro</b> ha validado tus tareas del <b>2020-10-01</b> al <b>2020-11-01</b>', '2020-10-13 13:15:56', 0, 'tasks/9/2020-10-01T04:00:00.000Z/2020-11-01T03:59:59.999Z', 'info'),
(1500, 10, '<b>Yaro</b> ha validado tus tareas del <b>2020-10-01</b> al <b>2020-11-01</b>', '2020-10-13 13:16:25', 0, 'tasks/10/2020-10-01T04:00:00.000Z/2020-11-01T03:59:59.999Z', 'info'),
(1505, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1507, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 04:10:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1509, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1511, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-14 08:24:31', 0, 'tasks/9/Tue Oct 13 2020 11:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1513, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-14 08:24:31', 0, 'tasks/9/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1515, 9, 'Tarea incumplida: <b>Mantenimiento en CREVER</b>', '2020-10-14 08:24:31', 0, 'tasks/9/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1517, 7, 'Tarea incumplida: <b>Prueba semanal Grupo Electrógeno</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 05:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1519, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1521, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-14 08:24:31', 0, 'tasks/10/Tue Oct 13 2020 10:30:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1523, 10, 'Tarea incumplida: <b>Cobrar cuentas conmutadas de personas naturales</b>', '2020-10-14 08:24:31', 0, 'tasks/10/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1525, 7, 'Tarea incumplida: <b>Proyección videoconferencia  Directora General de Ciencia</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 05:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1527, 7, 'Tarea incumplida: <b>Proyección videoconferencia Directora General de Ciencia</b>', '2020-10-14 08:24:31', 0, 'tasks/7/Tue Oct 13 2020 10:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 10:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1529, 10, 'Tarea incumplida: <b>Visita a cliente de comercio electronico</b>', '2020-10-14 08:24:31', 0, 'tasks/10/Tue Oct 13 2020 04:30:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1532, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-14 08:24:31', 0, 'tasks/8/Tue Oct 13 2020 04:40:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1534, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-14 08:24:31', 0, 'tasks/8/Tue Oct 13 2020 12:30:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1536, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-14 08:24:31', 0, 'tasks/8/Tue Oct 13 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1538, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-14 08:24:31', 0, 'tasks/8/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 13 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1539, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1541, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 04:10:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1543, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1551, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-15 08:26:54', 0, 'tasks/9/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1553, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-15 08:26:54', 0, 'tasks/9/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1555, 9, 'Tarea incumplida: <b>Mantenimiento en CREVER</b>', '2020-10-15 08:26:54', 0, 'tasks/9/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1557, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1559, 10, 'Tarea incumplida: <b>Preparacion como reserva de cuadro</b>', '2020-10-15 08:26:54', 0, 'tasks/10/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1561, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-15 08:26:54', 0, 'tasks/10/Wed Oct 14 2020 10:30:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1563, 10, 'Tarea incumplida: <b>Cobrar cuentas conmutadas de personas naturales</b>', '2020-10-15 08:26:54', 0, 'tasks/10/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1565, 7, 'Tarea incumplida: <b>Proyección videoconferencia  Viceministro CITMA</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 05:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1567, 7, 'Tarea incumplida: <b>Proyección videoconferencia Directora General de Ciencia</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 07:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 07:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1569, 7, 'Tarea incumplida: <b>Proyección videoconferencia  Directora General ONN</b>', '2020-10-15 08:26:54', 0, 'tasks/7/Wed Oct 14 2020 10:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 10:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1572, 11, '<b>Yaro</b> incumplió la tarea : <b>Preparación a las Reservas de Cuadro</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1574, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 04:40:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1576, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 12:30:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1578, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1580, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1582, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisión de la documentación del GEE</b>', '2020-10-15 08:26:54', 0, 'tasks/8/Wed Oct 14 2020 05:00:00 GMT-0400 (GMT-04:00)/Wed Oct 14 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1583, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-16 07:59:05', 0, 'tasks/7/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1585, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-16 07:59:05', 0, 'tasks/7/Thu Oct 15 2020 04:10:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1587, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-16 07:59:05', 0, 'tasks/7/Thu Oct 15 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1597, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-16 07:59:05', 0, 'tasks/9/Thu Oct 15 2020 11:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1599, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-16 07:59:05', 0, 'tasks/9/Thu Oct 15 2020 09:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1601, 9, 'Tarea incumplida: <b>Mantenimiento en CREVER</b>', '2020-10-16 07:59:05', 0, 'tasks/9/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1603, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-16 07:59:05', 0, 'tasks/7/Thu Oct 15 2020 09:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1605, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-16 07:59:05', 0, 'tasks/10/Thu Oct 15 2020 10:30:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1607, 10, 'Tarea incumplida: <b>Visita a cliente de comercio electronico</b>', '2020-10-16 07:59:05', 0, 'tasks/10/Thu Oct 15 2020 04:30:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1610, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-16 07:59:05', 0, 'tasks/8/Thu Oct 15 2020 04:40:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1612, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-16 07:59:05', 0, 'tasks/8/Thu Oct 15 2020 12:30:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1614, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-16 07:59:05', 0, 'tasks/8/Thu Oct 15 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1616, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-16 07:59:05', 0, 'tasks/8/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 15 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1617, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-19 08:24:10', 0, 'tasks/7/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1619, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-19 08:24:10', 0, 'tasks/7/Fri Oct 16 2020 04:10:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1621, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-19 08:24:10', 0, 'tasks/7/Fri Oct 16 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1631, 9, 'Tarea incumplida: <b>Puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-19 08:24:10', 0, 'tasks/9/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1633, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-19 08:24:10', 0, 'tasks/9/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1635, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-19 08:24:10', 0, 'tasks/9/Fri Oct 16 2020 09:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1637, 9, 'Tarea incumplida: <b>Mantenimiento en CREVER</b>', '2020-10-19 08:24:10', 0, 'tasks/9/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1639, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-19 08:24:10', 0, 'tasks/7/Fri Oct 16 2020 09:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1641, 10, 'Tarea incumplida: <b>Reunion de puntualizacion del cumplimiento de las tareas de la semana</b>', '2020-10-19 08:24:10', 0, 'tasks/10/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1643, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-19 08:24:10', 0, 'tasks/10/Fri Oct 16 2020 10:30:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1645, 10, 'Tarea incumplida: <b>Cobrar cuentas conmutadas de personas naturales</b>', '2020-10-19 08:24:10', 0, 'tasks/10/Wed Oct 14 2020 09:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1647, 10, 'Tarea incumplida: <b>Venta de tarjetas nauta 1h y cupón de recarga 2h</b>', '2020-10-19 08:24:10', 0, 'tasks/10/Mon Oct 12 2020 04:30:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1650, 11, '<b>Yaro</b> incumplió la tarea : <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-19 08:24:10', 0, 'tasks/8/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1652, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-19 08:24:10', 0, 'tasks/8/Fri Oct 16 2020 04:40:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1654, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-19 08:24:10', 0, 'tasks/8/Fri Oct 16 2020 12:30:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1656, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-19 08:24:10', 0, 'tasks/8/Fri Oct 16 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1658, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-19 08:24:10', 0, 'tasks/8/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 16 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1659, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-20 08:38:35', 0, 'tasks/7/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1661, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-20 08:38:35', 0, 'tasks/7/Mon Oct 19 2020 04:05:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1663, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-20 08:38:35', 0, 'tasks/7/Mon Oct 19 2020 04:10:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1673, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-20 08:38:35', 0, 'tasks/9/Mon Oct 19 2020 11:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1675, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-20 08:38:35', 0, 'tasks/9/Mon Oct 19 2020 09:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1677, 9, 'Tarea incumplida: <b>Mantenimiento en CREVER</b>', '2020-10-20 08:38:35', 0, 'tasks/9/Mon Oct 19 2020 04:30:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1679, 9, 'Tarea incumplida: <b>Puntualización de tareas de la semana</b>', '2020-10-20 08:38:35', 0, 'tasks/9/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1681, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-20 08:38:35', 0, 'tasks/7/Mon Oct 19 2020 09:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1683, 10, 'Tarea incumplida: <b>Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-20 08:38:35', 0, 'tasks/10/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1685, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-20 08:38:35', 0, 'tasks/10/Mon Oct 19 2020 10:30:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1688, 11, '<b>Yaro</b> incumplió la tarea : <b>	Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1690, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar el autofocal en el DST</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 04:30:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1692, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 04:40:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1694, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 04:05:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1696, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 13:15:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1698, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 12:30:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1700, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-20 08:38:35', 0, 'tasks/8/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 19 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1701, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-21 14:24:20', 0, 'tasks/7/Tue Oct 20 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1703, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-21 14:24:20', 0, 'tasks/7/Tue Oct 20 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1705, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-21 14:24:20', 0, 'tasks/7/Tue Oct 20 2020 04:10:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1715, 9, 'Tarea incumplida: <b>Diagnóstico y reparación en Taller</b>', '2020-10-21 14:24:20', 0, 'tasks/9/Tue Oct 20 2020 11:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1717, 9, 'Tarea incumplida: <b>Atención a clientes de Taller</b>', '2020-10-21 14:24:20', 0, 'tasks/9/Tue Oct 20 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1719, 7, 'Tarea incumplida: <b>Prueba semanal Grupo Electrógeno</b>', '2020-10-21 14:24:20', 0, 'tasks/7/Tue Oct 20 2020 05:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1721, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-21 14:24:20', 0, 'tasks/7/Tue Oct 20 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1723, 10, 'Tarea incumplida: <b>Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.</b>', '2020-10-21 14:24:20', 0, 'tasks/10/Tue Oct 20 2020 10:30:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 10:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1725, 10, 'Tarea incumplida: <b>Venta de tarjetas nauta 1h y cupón de recarga 2h</b>', '2020-10-21 14:24:20', 0, 'tasks/10/Mon Oct 19 2020 04:30:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1727, 10, 'Tarea incumplida: <b>Puntualizacion con el jfe de departamento el cumplimiento de las tareas y cosas pendientes para terminar el mes</b>', '2020-10-21 14:24:20', 0, 'tasks/10/Tue Oct 20 2020 11:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1730, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-21 14:24:20', 0, 'tasks/8/Tue Oct 20 2020 04:40:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1732, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-21 14:24:20', 0, 'tasks/8/Tue Oct 20 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1734, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-21 14:24:20', 0, 'tasks/8/Tue Oct 20 2020 13:15:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1736, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-21 14:24:20', 0, 'tasks/8/Tue Oct 20 2020 12:30:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1738, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-21 14:24:20', 0, 'tasks/8/Tue Oct 20 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1739, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1741, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger');
INSERT INTO `notificaciones` (`id`, `id_usuario`, `notificacion`, `fecha`, `leida`, `vinculo`, `estatus`) VALUES
(1743, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1745, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Wed Oct 21 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1747, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Thu Oct 22 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1749, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Fri Oct 23 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1751, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Wed Oct 21 2020 04:10:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1753, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Thu Oct 22 2020 04:10:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1755, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Fri Oct 23 2020 04:10:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1779, 9, 'Tarea incumplida: <b>Vacaciones</b>', '2020-10-26 10:11:01', 0, 'tasks/9/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1781, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Wed Oct 21 2020 09:00:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1783, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Thu Oct 22 2020 09:00:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1785, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Fri Oct 23 2020 09:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1787, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-26 10:11:01', 0, 'tasks/10/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1789, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-26 10:11:01', 0, 'tasks/10/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1791, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-26 10:11:01', 0, 'tasks/10/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1793, 10, 'Tarea incumplida: <b>Cobrar cuentas conmutadas de personas naturales</b>', '2020-10-26 10:11:01', 0, 'tasks/10/Mon Oct 19 2020 21:00:00 GMT-0400 (GMT-04:00)/Tue Oct 20 2020 21:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1795, 7, 'Tarea incumplida: <b>Proyección videoconferencia Ministra CITMA</b>', '2020-10-26 10:11:01', 0, 'tasks/7/Fri Oct 23 2020 07:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 07:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1798, 11, '<b>Yaro</b> incumplió la tarea : <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1800, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 11:30:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1802, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 11:30:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1804, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 11:30:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1806, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 04:40:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1808, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 04:40:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1810, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 04:40:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1812, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1814, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1816, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1818, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 13:15:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1820, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 13:15:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1822, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 13:15:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1824, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 12:30:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1826, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 12:30:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1828, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 12:30:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1830, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisión de la documentación del GEE</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 05:00:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1832, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 21 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1834, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 22 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1836, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-26 10:11:01', 0, 'tasks/8/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 23 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1837, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1839, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1841, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Mon Oct 26 2020 04:05:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1843, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Tue Oct 27 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1845, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Mon Oct 26 2020 04:10:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1847, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Tue Oct 27 2020 04:10:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1865, 7, 'Tarea incumplida: <b>Prueba semanal Grupo Electrógeno</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Tue Oct 27 2020 05:00:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1867, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Mon Oct 26 2020 09:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1869, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Tue Oct 27 2020 09:00:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1871, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-28 09:25:24', 0, 'tasks/10/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1873, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-28 09:25:24', 0, 'tasks/10/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1875, 7, 'Tarea incumplida: <b>Proyección Videoconferencia Directora General de Ciencia</b>', '2020-10-28 09:25:24', 0, 'tasks/7/Mon Oct 26 2020 05:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1878, 11, '<b>Yaro</b> incumplió la tarea : <b>	Matutino y puntualizacion de las tareas para la semana</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1880, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 11:30:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1882, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 11:30:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1884, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar el autofocal en el DST</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 04:30:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1886, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 04:40:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1888, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 04:40:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1890, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 12:30:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1892, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 12:30:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1894, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 04:05:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1896, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 04:05:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1898, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 13:15:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1900, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 13:15:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1902, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1904, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-28 09:25:24', 0, 'tasks/8/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)/Tue Oct 27 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1905, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-10-29 11:16:19', 0, 'tasks/7/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1907, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-10-29 11:16:19', 0, 'tasks/7/Wed Oct 28 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1909, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-10-29 11:16:19', 0, 'tasks/7/Wed Oct 28 2020 04:10:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1917, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-10-29 11:16:19', 0, 'tasks/7/Wed Oct 28 2020 09:00:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1919, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-10-29 11:16:19', 0, 'tasks/10/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1922, 11, '<b>Yaro</b> incumplió la tarea : <b>	Preparación a la Reserva de Cuadro</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 11:30:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 11:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1924, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 04:40:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1926, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 12:30:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1928, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 04:05:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1930, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 13:15:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1932, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisión de la documentación del GEE</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 05:00:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 05:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1934, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-10-29 11:16:19', 0, 'tasks/8/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)/Wed Oct 28 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1935, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1937, 7, 'Tarea incumplida: <b>Lectura del Metrocontador</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1939, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Thu Oct 29 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1941, 7, 'Tarea incumplida: <b>Entrega del parte de la Energía al Citma</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Fri Oct 30 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1943, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Thu Oct 29 2020 04:10:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1945, 7, 'Tarea incumplida: <b>Revisión del estado de los equipos de comunicaciones</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Fri Oct 30 2020 04:10:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:10:00 GMT-0400 (GMT-04:00)', 'danger'),
(1961, 9, 'Tarea incumplida: <b>Vacaciones</b>', '2020-11-03 09:48:37', 0, 'tasks/9/Mon Oct 26 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1963, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Thu Oct 29 2020 09:00:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1965, 7, 'Tarea incumplida: <b>Trabajo en la Intranet del DST</b>', '2020-11-03 09:48:37', 0, 'tasks/7/Fri Oct 30 2020 09:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 09:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1967, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-11-03 09:48:37', 0, 'tasks/10/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1969, 10, 'Tarea incumplida: <b>Vacaciones Planificadas</b>', '2020-11-03 09:48:37', 0, 'tasks/10/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1972, 11, '<b>Yaro</b> incumplió la tarea : <b>Reunión de puntualización del cumplimiento de las tareas de la semana</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 11:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 11:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1974, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Thu Oct 29 2020 04:40:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1976, 11, '<b>Yaro</b> incumplió la tarea : <b>Realizar tareas administrativas y comerciales.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 04:40:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:40:00 GMT-0400 (GMT-04:00)', 'danger'),
(1978, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Thu Oct 29 2020 12:30:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1980, 11, '<b>Yaro</b> incumplió la tarea : <b>Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 12:30:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 12:30:00 GMT-0400 (GMT-04:00)', 'danger'),
(1982, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Thu Oct 29 2020 04:05:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1984, 11, '<b>Yaro</b> incumplió la tarea : <b>Puntualización de las tareas del día con los especialistas.</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 04:05:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:05:00 GMT-0400 (GMT-04:00)', 'danger'),
(1986, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Thu Oct 29 2020 13:15:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1988, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (al culminar la jornada laboral)</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 13:15:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 13:15:00 GMT-0400 (GMT-04:00)', 'danger'),
(1990, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)/Thu Oct 29 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1992, 11, '<b>Yaro</b> incumplió la tarea : <b>Envío de asistencia (Inicio de la Jornada Laboral)</b>', '2020-11-03 09:48:37', 0, 'tasks/8/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)/Fri Oct 30 2020 04:00:00 GMT-0400 (GMT-04:00)', 'danger'),
(1994, 8, '<b>Carlos</b> incumplió la tarea : <b>asdasd</b>', '2020-12-04 09:38:20', 1, 'tasks/1/Thu Nov 26 2020 05:34:00 GMT-0500 (GMT-05:00)/Thu Nov 26 2020 05:34:00 GMT-0500 (GMT-05:00)', 'danger'),
(1996, 8, '<b>Carlos</b> incumplió la tarea : <b>vsvsdc</b>', '2020-12-11 09:36:25', 1, 'tasks/1/Thu Dec 10 2020 08:35:00 GMT-0500 (GMT-05:00)/Thu Dec 10 2020 08:35:00 GMT-0500 (GMT-05:00)', 'danger'),
(1998, 8, '<b>Carlos</b> incumplió la tarea : <b>vsvsdc</b>', '2020-12-11 09:36:25', 1, 'tasks/1/Thu Dec 10 2020 08:35:00 GMT-0500 (GMT-05:00)/Thu Dec 10 2020 08:35:00 GMT-0500 (GMT-05:00)', 'danger'),
(2000, 8, '<b>Carlos</b> incumplió la tarea : <b>asdasd</b>', '2020-12-11 09:36:25', 1, 'tasks/1/Thu Dec 10 2020 08:33:00 GMT-0500 (GMT-05:00)/Thu Dec 10 2020 08:33:00 GMT-0500 (GMT-05:00)', 'danger'),
(2002, 8, '<b>Carlos</b> incumplió la tarea : <b>Prueba</b>', '2020-12-11 09:36:25', 1, 'tasks/1/Thu Dec 10 2020 08:52:00 GMT-0500 (GMT-05:00)/Thu Dec 10 2020 08:52:00 GMT-0500 (GMT-05:00)', 'danger'),
(2004, 8, '<b>Carlos</b> incumplió la tarea : <b>Probando boton</b>', '2020-12-11 09:36:25', 1, 'tasks/1/Thu Dec 10 2020 10:22:32 GMT-0500 (GMT-05:00)/Thu Dec 10 2020 10:22:32 GMT-0500 (GMT-05:00)', 'danger'),
(2006, 8, '<b>Carlos</b> incumplió la tarea : <b>adasd</b>', '2020-12-21 10:14:39', 1, 'tasks/1/Fri Dec 18 2020 09:35:54 GMT-0500 (GMT-05:00)/Fri Dec 18 2020 09:35:54 GMT-0500 (GMT-05:00)', 'danger'),
(2007, 2, 'Tarea incumplida: <b>adasd</b>', '2021-01-14 08:49:53', 1, 'tasks/2/Wed Jan 13 2021 06:00:45 GMT-0500 (GMT-05:00)/Wed Jan 13 2021 06:00:45 GMT-0500 (GMT-05:00)', 'danger'),
(2009, 2, '<b>yaro</b> te ha asignado la tarea: <b>dadasdasd</b>', '2021-01-14 12:44:01', 1, 'tasks/2/2021-01-13 12:44:00.000/2021-01-13 12:44:00.000', 'info'),
(2010, 2, 'Tarea incumplida: <b>dadasdasd</b>', '2021-01-14 12:49:53', 0, 'tasks/2/Wed Jan 13 2021 07:44:00 GMT-0500 (GMT-05:00)/Wed Jan 13 2021 07:44:00 GMT-0500 (GMT-05:00)', 'danger'),
(2017, 1, '<b>Yarisel</b> le ha dado entrada al equipo: <b>Monitor ATEC-Haier</b>.', '2021-01-22 00:00:00', 0, '/workshop', 'info'),
(2018, 1, '<b>Yarisel</b> le ha dado entrada al equipo: <b>Laptop HP</b>.', '2021-01-22 00:00:00', 0, '/workshop', 'info');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones_tareas`
--

CREATE TABLE `observaciones_tareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `observacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `observaciones_tareas`
--

INSERT INTO `observaciones_tareas` (`id`, `id_tarea`, `observacion`) VALUES
(1, 104, 'Probando'),
(2, 106, 'ajpdaks asdkaso[ds'),
(3, 106, 'dfsdfsdfsdfd'),
(4, 106, 'fssfsdfd'),
(5, 305, 'Se apoyó además el proceso de cierre de Nómina y su exportación a Contabilidad.'),
(6, 308, 'Prueba de anotación.'),
(7, 821, 'Debe subir el sitio'),
(8, 870, 'Llamar a Yamilet en la delegación'),
(9, 872, 'Enviado a Rec Humanos, fide y Miguel'),
(10, 1198, 'Se había pospuesto , era del viernes 2 de octubre'),
(11, 1324, 'prueba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `id_emp` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `provincia` varchar(200) NOT NULL,
  `municipio` varchar(200) NOT NULL,
  `codcli` varchar(50) NOT NULL,
  `control` varchar(50) NOT NULL,
  `ruta` varchar(50) NOT NULL,
  `folio` varchar(50) NOT NULL,
  `bitacora` tinyint(1) NOT NULL,
  `triple_registro` tinyint(1) NOT NULL,
  `aplica_acomodo` tinyint(1) NOT NULL,
  `pico_diurno` tinyint(1) NOT NULL,
  `pico_nocturno` tinyint(1) NOT NULL,
  `total_desconectivos` int(11) NOT NULL,
  `desc_gen_dia` int(11) NOT NULL,
  `desc_parc_dia` int(11) NOT NULL,
  `desc_gen_noche` int(11) NOT NULL,
  `desc_parc_noche` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `id_emp`, `nombre`, `provincia`, `municipio`, `codcli`, `control`, `ruta`, `folio`, `bitacora`, `triple_registro`, `aplica_acomodo`, `pico_diurno`, `pico_nocturno`, `total_desconectivos`, `desc_gen_dia`, `desc_parc_dia`, `desc_gen_noche`, `desc_parc_noche`) VALUES
(2, 3, 'DST Las Tunas', 'Las Tunas', 'Las Tunas', '63261', '03105', '94', '6450', 0, 0, 0, 1, 0, 8, 0, 3, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes`
--

CREATE TABLE `taller_clientes` (
  `id` int(11) NOT NULL,
  `siglas` varchar(50) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taller_clientes`
--

INSERT INTO `taller_clientes` (`id`, `siglas`, `nombre`) VALUES
(1, 'CIGET', 'Centro de No Se Que'),
(2, 'CITMA', 'Centro de algo mas'),
(3, 'INSMET', 'Instituto de Meteorologia'),
(4, 'UTN', 'UTN'),
(5, 'CJI', 'CJI'),
(6, 'CTC', 'CTC'),
(7, 'ACLIFIM', 'Asociación De Limitados'),
(8, 'ESPCAP', 'Ojer Sa'),
(9, 'CONST', 'Empresa Constructora Del Minint'),
(10, 'TRD', 'Tiendas Recaudadoras De Divisas'),
(11, 'CREVER', 'Empresa de no se que');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes_personas`
--

CREATE TABLE `taller_clientes_personas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taller_clientes_personas`
--

INSERT INTO `taller_clientes_personas` (`id`, `nombre`) VALUES
(1, 'Carlos Miguel López Durañona'),
(2, 'Pedro Pérez Pérez'),
(3, 'Gretel Martínez González'),
(4, 'Carlos Lopez'),
(5, 'Casimiro Cejudo'),
(6, 'Fulano Mengano'),
(7, 'Honorio Pompa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_equipos`
--

CREATE TABLE `taller_equipos` (
  `id` int(11) NOT NULL,
  `equipo` varchar(250) NOT NULL,
  `marca` varchar(250) NOT NULL,
  `modelo` varchar(250) NOT NULL,
  `serie` varchar(250) NOT NULL,
  `inventario` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taller_equipos`
--

INSERT INTO `taller_equipos` (`id`, `equipo`, `marca`, `modelo`, `serie`, `inventario`) VALUES
(1, 'Monitor', 'ATEC-Haier', 'AH233', 'NS-2365', '4565'),
(2, 'Impresora', 'EPSON', 'LX300', 'EP987558', '2211'),
(3, 'Impresora', 'HP', 'LaserJET25', 'HP234342234', '8888'),
(4, 'Laptop', 'HP', 'N550', '1ze2020', '6544'),
(5, 'Speakers', 'SONY', 'SS45', '56633546', 'I-2323'),
(6, 'Unidad Central', 'Acer', 'A34', '12353', 'I-14'),
(7, 'Fuente', 'Huntkey', 'HNT350', 'HNT125455', '020610'),
(8, 'Scanner', 'HP', 'HP294', 'HPZ1231', '214454'),
(9, 'Mouse', 'Logitech', 'LG-45', '2546855', 'LG452'),
(10, 'Monitor', 'Aopen', 'A50P', '102PP121223', '1020');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_registro`
--

CREATE TABLE `taller_registro` (
  `id` int(11) NOT NULL,
  `cod` int(11) NOT NULL,
  `cliente` varchar(250) NOT NULL,
  `equipo` varchar(250) NOT NULL,
  `marca` varchar(250) NOT NULL,
  `modelo` varchar(250) NOT NULL,
  `inventario` varchar(250) NOT NULL,
  `serie` varchar(250) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `entregado` varchar(250) NOT NULL,
  `ot` varchar(250) DEFAULT NULL,
  `estado` varchar(250) DEFAULT NULL,
  `especialista` varchar(250) NOT NULL,
  `fecha_salida` date DEFAULT NULL,
  `recogido` varchar(250) DEFAULT NULL,
  `id_emp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `taller_registro`
--

INSERT INTO `taller_registro` (`id`, `cod`, `cliente`, `equipo`, `marca`, `modelo`, `inventario`, `serie`, `fecha_entrada`, `entregado`, `ot`, `estado`, `especialista`, `fecha_salida`, `recogido`, `id_emp`) VALUES
(2, 1, 'CIGET', 'Impresora', 'EPSON', 'LX300', '2211', 'EP987558', '2021-01-19', 'Casimiro Cejudo', '03233', 'D', 'Prueba', '2021-01-19', 'Romualdo Perez', 2),
(3, 2, 'CITMA', 'Laptop', 'HP', 'N550', '6544', '1ze2020', '2021-01-19', 'Pedro Pérez Pérez', NULL, 'P', 'Prueba', NULL, NULL, 2),
(4, 1, 'ACLIFIM', 'Monitor', 'ATEC-Haier', 'AH233', '4565', 'NS-2365', '2021-01-22', 'Carlos Miguel López Durañona', '568988', 'R', 'Yarisel', '2021-01-22', 'Pedro Pérez Pérez', 3),
(5, 2, 'CIGET', 'Laptop', 'HP', 'N550', '65444', '1ze2020', '2021-01-22', 'Carlos Lopez', '454856', 'D', 'Yarisel', '2021-01-22', 'Casimiro Cejudo', 3);

--
-- Disparadores `taller_registro`
--
DELIMITER $$
CREATE TRIGGER `insertar_cliente_persona` BEFORE INSERT ON `taller_registro` FOR EACH ROW IF NOT EXISTS(SELECT 1 FROM taller_clientes_personas WHERE taller_clientes_personas.nombre = NEW.entregado) THEN
INSERT INTO taller_clientes_personas(nombre) VALUES (NEW.entregado);
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertar_equipo` BEFORE INSERT ON `taller_registro` FOR EACH ROW IF NOT EXISTS(SELECT 1 FROM taller_equipos WHERE taller_equipos.equipo = NEW.equipo AND taller_equipos.marca = NEW.marca AND taller_equipos.modelo = NEW.modelo AND taller_equipos.serie = NEW.serie AND taller_equipos.inventario = NEW.inventario) THEN
INSERT INTO taller_equipos(equipo, marca, modelo, serie, inventario) VALUES (NEW.equipo, NEW.marca, NEW.modelo, NEW.serie, NEW.inventario);
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `nuevo_registro` BEFORE INSERT ON `taller_registro` FOR EACH ROW BEGIN
SET @MaxCode := (SELECT MAX(taller_registro.cod) FROM taller_registro WHERE id_emp = NEW.id_emp) + 1;
SET NEW.cod = IFNULL(@MaxCode,1);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `resumen` varchar(250) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `estado` varchar(100) NOT NULL,
  `id_creador` int(11) NOT NULL,
  `duracion` int(11) NOT NULL,
  `validada` tinyint(1) NOT NULL,
  `fecha_fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `id_usuario`, `resumen`, `descripcion`, `fecha_inicio`, `estado`, `id_creador`, `duracion`, `validada`, `fecha_fin`) VALUES
(1, 1, 'vsvsdc', 'sdcsdcsc', '2020-12-10 13:35:00', 'Incumplida', 1, 60, 0, '2020-12-10 13:35:00'),
(890, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-09-01 08:00:00', 'Incumplida', 7, 5, 0, '2020-09-02 08:00:00'),
(891, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-05 08:00:00', 'Cumplida', 7, 5, 1, '2020-10-09 08:00:00'),
(892, 1, 'Trabajo en la ACLIFIM. Revisión de Nómina.', 'Revisar el problema que tiene la ACLIFIM al calcular las nóminas.', '2020-10-01 08:00:00', 'Cumplida', 1, 60, 1, '2020-10-01 08:00:00'),
(894, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-01 08:00:00', 'Cumplida', 7, 5, 1, '2020-10-02 08:00:00'),
(896, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-01 08:05:00', 'Cumplida', 7, 5, 1, '2020-10-02 08:05:00'),
(897, 1, 'Trabajo en el Citma. Cierre de mes.', 'Apoyar el proceso de cierre de mes en el CITMA.', '2020-10-01 09:00:00', 'Cumplida', 1, 180, 1, '2020-10-01 09:00:00'),
(898, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-06 08:00:00', 'Cumplida', 9, 240, 1, '2020-10-06 08:00:00'),
(899, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-07 08:00:00', 'Cumplida', 9, 240, 1, '2020-10-07 08:00:00'),
(900, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-08 08:00:00', 'Incumplida', 9, 240, 1, '2020-10-08 08:00:00'),
(901, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-09 08:00:00', 'Cumplida', 9, 240, 1, '2020-10-09 08:00:00'),
(902, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-01 08:10:00', 'Cumplida', 7, 50, 1, '2020-10-02 08:10:00'),
(903, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-12 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-12 08:00:00'),
(904, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-13 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-13 08:00:00'),
(905, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-14 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-14 08:00:00'),
(906, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-15 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-15 08:00:00'),
(907, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-16 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-16 08:00:00'),
(908, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-19 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-19 08:00:00'),
(909, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-20 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-20 08:00:00'),
(910, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-21 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-21 08:00:00'),
(911, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-22 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-22 08:00:00'),
(912, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-23 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-23 08:00:00'),
(913, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-26 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-26 08:00:00'),
(914, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-27 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-27 08:00:00'),
(915, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-28 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-28 08:00:00'),
(916, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-29 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-29 08:00:00'),
(917, 7, 'Lectura del Metrocontador', 'Lectura del Metrocontador', '2020-10-30 08:00:00', 'Incumplida', 7, 5, 1, '2020-10-30 08:00:00'),
(918, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-05 08:10:00', 'Cumplida', 7, 50, 1, '2020-10-05 08:10:00'),
(919, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-06 08:10:00', 'Cumplida', 7, 50, 1, '2020-10-06 08:10:00'),
(920, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-07 08:10:00', 'Cumplida', 7, 50, 1, '2020-10-07 08:10:00'),
(921, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-08 08:10:00', 'Cumplida', 7, 50, 1, '2020-10-08 08:10:00'),
(922, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-09 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-09 08:10:00'),
(923, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-12 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-12 08:10:00'),
(924, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-13 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-13 08:10:00'),
(925, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-14 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-14 08:10:00'),
(926, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-15 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-15 08:10:00'),
(927, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-16 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-16 08:10:00'),
(928, 1, 'Trabajo en la Intranet de Citmatel. Módulo de Taller.', 'Trabajo en la Intranet de Citmatel. Módulo de Taller.', '2020-10-01 12:30:00', 'Cumplida', 1, 290, 1, '2020-10-01 12:30:00'),
(929, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-05 08:05:00', 'Cumplida', 7, 5, 1, '2020-10-05 08:05:00'),
(930, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-06 08:05:00', 'Cumplida', 7, 5, 1, '2020-10-06 08:05:00'),
(931, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-07 08:05:00', 'Cumplida', 7, 5, 1, '2020-10-07 08:05:00'),
(932, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-08 08:05:00', 'Cumplida', 7, 5, 1, '2020-10-08 08:05:00'),
(933, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-09 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-09 08:05:00'),
(934, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-12 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-12 08:05:00'),
(935, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-13 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-13 08:05:00'),
(936, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-14 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-14 08:05:00'),
(937, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-15 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-15 08:05:00'),
(938, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-16 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-16 08:05:00'),
(939, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-19 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-19 08:05:00'),
(940, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-20 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-20 08:05:00'),
(941, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-21 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-21 08:05:00'),
(942, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-22 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-22 08:05:00'),
(943, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-23 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-23 08:05:00'),
(944, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-19 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-19 08:10:00'),
(945, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-20 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-20 08:10:00'),
(946, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-21 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-21 08:10:00'),
(947, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-22 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-22 08:10:00'),
(948, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-23 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-23 08:10:00'),
(949, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-26 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-26 08:05:00'),
(950, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-27 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-27 08:05:00'),
(951, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-28 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-28 08:05:00'),
(952, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-29 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-29 08:05:00'),
(953, 7, 'Entrega del parte de la Energía al Citma', 'Entrega del parte de la Energía al Citma', '2020-10-30 08:05:00', 'Incumplida', 7, 5, 1, '2020-10-30 08:05:00'),
(954, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-26 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-26 08:10:00'),
(955, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-27 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-27 08:10:00'),
(956, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-28 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-28 08:10:00'),
(957, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-29 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-29 08:10:00'),
(958, 7, 'Revisión del estado de los equipos de comunicaciones', 'Revisión del estado de los equipos de comunicaciones', '2020-10-30 08:10:00', 'Incumplida', 7, 50, 1, '2020-10-30 08:10:00'),
(959, 1, 'Trabajo en el Jardín Botánico. Cierre de mes.', 'Trabajo en el Jardín Botánico. Cierre de mes.', '2020-10-02 08:00:00', 'Incumplida', 1, 240, 1, '2020-10-02 08:00:00'),
(960, 1, 'Trabajo en el INSMET. Problema al exportar fichero al banco.', 'Trabajo en el INSMET. Problema al exportar fichero al banco.', '2020-10-01 09:00:00', 'Cumplida', 1, 30, 1, '2020-10-01 09:00:00'),
(965, 10, 'Contabilidad', 'Pasar a contabilidad los cobros pendientes del mes anterior', '2020-09-02 10:00:00', 'Incumplida', 10, 60, 0, '2020-09-02 10:00:00'),
(969, 1, 'Trabajo en la Intranet de Citmatel. Módulo de Taller.', 'Trabajo en la Intranet de Citmatel. Módulo de Taller.', '2020-10-02 12:30:00', 'Incumplida', 1, 290, 1, '2020-10-02 12:30:00'),
(970, 1, 'Puntualización de tareas.', 'Puntualizar las tareas de la semana.', '2020-10-05 08:00:00', 'Cumplida', 1, 30, 1, '2020-10-05 08:00:00'),
(971, 1, 'Entregar la limpieza de Citmatel.', 'Entregar la limpieza de Citmatel.', '2020-10-05 08:30:00', 'Cumplida', 1, 60, 1, '2020-10-05 08:30:00'),
(972, 1, 'Trabajo en el Citma. Cierre de mes.', 'Trabajo en el Citma. Cierre de mes.', '2020-10-05 09:30:00', 'Cumplida', 1, 180, 1, '2020-10-05 09:30:00'),
(973, 1, 'Trabajo en la intranet de Citmatel. Módulo de taller.', 'Trabajo en la intranet de Citmatel. Módulo de taller.', '2020-10-05 13:00:00', 'Cumplida', 1, 260, 1, '2020-10-05 13:00:00'),
(974, 1, 'Puntualización de tareas.', 'Puntualizar las tareas de la semana.', '2020-10-12 08:00:00', 'Cumplida', 1, 30, 1, '2020-10-12 08:00:00'),
(975, 1, 'Puntualización de tareas.', 'Puntualizar las tareas de la semana.', '2020-10-19 08:00:00', 'Incumplida', 1, 30, 1, '2020-10-19 08:00:00'),
(976, 1, 'Puntualización de tareas.', 'Puntualizar las tareas de la semana.', '2020-10-26 08:00:00', 'Incumplida', 1, 30, 1, '2020-10-26 08:00:00'),
(977, 1, 'Trabajo en la intranet de Citmatel. Módulo de taller.', 'Trabajo en la intranet de Citmatel. Módulo de taller.', '2020-10-06 13:00:00', 'Incumplida', 1, 260, 1, '2020-10-06 13:00:00'),
(978, 1, 'Trabajo en la intranet de Citmatel. Módulo de taller.', 'Trabajo en la intranet de Citmatel. Módulo de taller.', '2020-10-07 13:00:00', 'Cumplida', 1, 260, 1, '2020-10-07 13:00:00'),
(979, 1, 'Trabajo en la intranet de Citmatel. Módulo de taller.', 'Trabajo en la intranet de Citmatel. Módulo de taller.', '2020-10-08 13:00:00', 'Cumplida', 1, 260, 1, '2020-10-08 13:00:00'),
(980, 1, 'Trabajo en la intranet de Citmatel. Módulo de taller.', 'Trabajo en la intranet de Citmatel. Módulo de taller.', '2020-10-09 13:00:00', 'Cumplida', 1, 260, 1, '2020-10-09 13:00:00'),
(981, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-05 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-05 08:00:00'),
(982, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-06 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-06 08:00:00'),
(983, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-07 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-07 08:00:00'),
(984, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-08 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-08 08:00:00'),
(985, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-09 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-09 08:00:00'),
(986, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-12 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-12 08:00:00'),
(987, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-13 08:00:00', 'Cumplida', 1, 560, 1, '2020-10-13 08:00:00'),
(988, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-14 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-14 08:00:00'),
(989, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-15 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-15 08:00:00'),
(990, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-16 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-16 08:00:00'),
(991, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-19 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-19 08:00:00'),
(992, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-20 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-20 08:00:00'),
(993, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-21 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-21 08:00:00'),
(994, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-22 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-22 08:00:00'),
(995, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-23 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-23 08:00:00'),
(996, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-26 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-26 08:00:00'),
(997, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-27 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-27 08:00:00'),
(998, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-28 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-28 08:00:00'),
(999, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-29 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-29 08:00:00'),
(1000, 1, 'Atención a reportes de rodas.', 'Atención a reportes de rodas.', '2020-10-30 08:00:00', 'Incumplida', 1, 560, 1, '2020-10-30 08:00:00'),
(1001, 1, 'Autopreparación en Módulos de Rodas. Activos Fijos.', 'Autopreparación en Módulos de Rodas. Activos Fijos.', '2020-10-06 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-06 08:00:00'),
(1002, 1, 'Autopreparación en Módulos de Rodas. Activos Fijos.', 'Autopreparación en Módulos de Rodas. Activos Fijos.', '2020-10-07 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-07 08:00:00'),
(1003, 1, 'Autopreparación en Módulos de Rodas. Activos Fijos.', 'Autopreparación en Módulos de Rodas. Activos Fijos.', '2020-10-08 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-08 08:00:00'),
(1004, 1, 'Autopreparación en Módulos de Rodas. Activos Fijos.', 'Autopreparación en Módulos de Rodas. Activos Fijos.', '2020-10-09 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-09 08:00:00'),
(1005, 1, 'Revisión del sellaje de las PCs de Citmatel.', 'Revisión del sellaje de las PCs de Citmatel.', '2020-10-06 10:00:00', 'Cumplida', 1, 60, 1, '2020-10-06 10:00:00'),
(1006, 1, 'Revisión de las trazas de navegación.', 'Revisión de las trazas de navegación.', '2020-10-07 09:00:00', 'Cumplida', 1, 120, 1, '2020-10-07 09:00:00'),
(1007, 1, 'Despacho con el CIGET. Entrega de la revista.', 'Entregar la Revista Innovación Tecnológica terminada.', '2020-10-15 10:35:09', 'Incumplida', 1, 120, 1, '2020-10-15 10:35:09'),
(1008, 1, 'Revisión del cumplimiento de las tareas de la semana.', 'Revisión del cumplimiento de las tareas de la semana.', '2020-10-09 13:30:00', 'Cumplida', 1, 60, 1, '2020-10-09 13:30:00'),
(1009, 1, 'Revisión del cumplimiento de las tareas de la semana.', 'Revisión del cumplimiento de las tareas de la semana.', '2020-10-16 13:30:00', 'Incumplida', 1, 60, 1, '2020-10-16 13:30:00'),
(1010, 1, 'Revisión del cumplimiento de las tareas de la semana.', 'Revisión del cumplimiento de las tareas de la semana.', '2020-10-23 13:30:00', 'Incumplida', 1, 60, 1, '2020-10-23 13:30:00'),
(1011, 1, 'Revisión del cumplimiento de las tareas de la semana.', 'Revisión del cumplimiento de las tareas de la semana.', '2020-10-30 13:30:00', 'Incumplida', 1, 60, 1, '2020-10-30 13:30:00'),
(1012, 1, 'Revisión del cumplimiento de las tareas de la semana.', 'Revisión del cumplimiento de las tareas de la semana.', '2020-10-02 13:30:00', 'Incumplida', 1, 60, 1, '2020-10-02 13:30:00'),
(1013, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-12 13:30:00', 'Cumplida', 1, 230, 1, '2020-10-12 13:30:00'),
(1014, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-13 13:30:00', 'Cumplida', 1, 230, 1, '2020-10-13 13:30:00'),
(1015, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-14 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-14 13:30:00'),
(1016, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-15 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-15 13:30:00'),
(1017, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-16 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-16 13:30:00'),
(1018, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-19 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-19 13:30:00'),
(1019, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-20 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-20 13:30:00'),
(1020, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-21 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-21 13:30:00'),
(1021, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-22 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-22 13:30:00'),
(1022, 1, 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', 'Trabajo en la intranet de Citmatel. Módulo de control de energía.', '2020-10-23 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-23 13:30:00'),
(1023, 1, 'Autopreparación en módulos de Rodas. Contabilidad.', 'Autopreparación en módulos de Rodas. Contabilidad.', '2020-10-12 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-12 08:00:00'),
(1024, 1, 'Autopreparación en módulos de Rodas. Contabilidad.', 'Autopreparación en módulos de Rodas. Contabilidad.', '2020-10-13 08:00:00', 'Cumplida', 1, 270, 1, '2020-10-13 08:00:00'),
(1025, 1, 'Autopreparación en módulos de Rodas. Contabilidad.', 'Autopreparación en módulos de Rodas. Contabilidad.', '2020-10-14 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-14 08:00:00'),
(1026, 1, 'Autopreparación en módulos de Rodas. Contabilidad.', 'Autopreparación en módulos de Rodas. Contabilidad.', '2020-10-15 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-15 08:00:00'),
(1027, 1, 'Autopreparación en módulos de Rodas. Contabilidad.', 'Autopreparación en módulos de Rodas. Contabilidad.', '2020-10-16 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-16 08:00:00'),
(1028, 1, 'Revisión del sellaje de las PCs de Citmatel.', 'Revisión del sellaje de las PCs de Citmatel.', '2020-10-20 10:00:00', 'Incumplida', 1, 60, 1, '2020-10-20 10:00:00'),
(1029, 1, 'Revisión de las trazas de navegación.', 'Revisión de las trazas de navegación.', '2020-10-21 09:00:00', 'Incumplida', 1, 120, 1, '2020-10-21 09:00:00'),
(1030, 1, 'Autopreparación en módulos de Citmatel. Inventario.', 'Autopreparación en módulos de Citmatel. Inventario.', '2020-10-19 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-19 08:00:00'),
(1031, 1, 'Autopreparación en módulos de Citmatel. Inventario.', 'Autopreparación en módulos de Citmatel. Inventario.', '2020-10-20 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-20 08:00:00'),
(1032, 1, 'Autopreparación en módulos de Citmatel. Inventario.', 'Autopreparación en módulos de Citmatel. Inventario.', '2020-10-21 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-21 08:00:00'),
(1033, 1, 'Autopreparación en módulos de Citmatel. Inventario.', 'Autopreparación en módulos de Citmatel. Inventario.', '2020-10-22 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-22 08:00:00'),
(1034, 1, 'Autopreparación en módulos de Citmatel. Inventario.', 'Autopreparación en módulos de Citmatel. Inventario.', '2020-10-23 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-23 08:00:00'),
(1035, 1, 'Autopreparación en módulos de Rodas. Nóminas.', 'Autopreparación en módulos de Rodas. Nóminas.', '2020-10-26 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-26 08:00:00'),
(1036, 1, 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', '2020-10-26 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-26 13:30:00'),
(1037, 1, 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', '2020-10-27 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-27 13:30:00'),
(1038, 1, 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', '2020-10-28 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-28 13:30:00'),
(1039, 1, 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', '2020-10-29 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-29 13:30:00'),
(1040, 1, 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', 'Trabajo en la intranet de Citmatel. Módulo de horas de navegación.', '2020-10-30 13:30:00', 'Incumplida', 1, 230, 1, '2020-10-30 13:30:00'),
(1041, 1, 'Autopreparación en módulos de Rodas. Nóminas.', 'Autopreparación en módulos de Rodas. Nóminas.', '2020-10-27 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-27 08:00:00'),
(1042, 1, 'Autopreparación en módulos de Rodas. Nóminas.', 'Autopreparación en módulos de Rodas. Nóminas.', '2020-10-28 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-28 08:00:00'),
(1043, 1, 'Autopreparación en módulos de Rodas. Nóminas.', 'Autopreparación en módulos de Rodas. Nóminas.', '2020-10-29 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-29 08:00:00'),
(1044, 1, 'Autopreparación en módulos de Rodas. Nóminas.', 'Autopreparación en módulos de Rodas. Nóminas.', '2020-10-30 08:00:00', 'Incumplida', 1, 270, 1, '2020-10-30 08:00:00'),
(1045, 1, 'Revisar la actualización de los Antivirus de Citmatel y los Sistemas Operativos de las PCs.', 'Revisar la actualización de los Antivirus de Citmatel y los Sistemas Operativos de las PCs.', '2020-10-26 15:30:00', 'Incumplida', 1, 60, 1, '2020-10-26 15:30:00'),
(1046, 9, 'Puntualización del cumplimiento de las tareas de la semana', 'Puntualización del cumplimiento de las tareas de la semana', '2020-10-02 15:00:00', 'Cumplida', 9, 3, 1, '2020-10-02 15:00:00'),
(1047, 9, 'Puntualización del cumplimiento de las tareas de la semana', 'Puntualización del cumplimiento de las tareas de la semana', '2020-10-09 15:00:00', 'Cumplida', 9, 3, 1, '2020-10-09 15:00:00'),
(1048, 9, 'Puntualización del cumplimiento de las tareas de la semana', 'Puntualización del cumplimiento de las tareas de la semana', '2020-10-16 15:00:00', 'Incumplida', 9, 3, 1, '2020-10-16 15:00:00'),
(1051, 9, 'Puntualización de tareas de la semana', 'Puntualización de tareas de la semana', '2020-10-05 08:00:00', 'Cumplida', 9, 30, 1, '2020-10-05 08:00:00'),
(1053, 9, 'Vacaciones', 'Vacaciones planificadas', '2020-09-21 05:00:00', 'Incumplida', 9, 20, 0, '2020-09-25 05:00:00'),
(1054, 9, 'Vacaciones', 'Vacaciones planificada', '2020-09-28 05:00:00', 'Incumplida', 9, 20, 0, '2020-09-30 05:00:00'),
(1056, 9, 'Vacaciones', 'Vacaciones', '2020-10-26 08:00:00', 'Incumplida', 9, 560, 1, '2020-10-30 08:00:00'),
(1057, 9, 'Vacaciones', 'Vacaciones', '2020-10-21 08:00:00', 'Incumplida', 9, 560, 1, '2020-10-23 08:00:00'),
(1058, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-05 08:30:00', 'Cumplida', 9, 210, 1, '2020-10-05 08:30:00'),
(1059, 9, 'Diagnóstico y reparación en Taller', 'Cliente ESPCAP', '2020-10-01 08:00:00', 'Cumplida', 9, 560, 1, '2020-10-01 08:00:00'),
(1060, 9, 'Diagnóstico y reparación en Taller', 'Cliente CREVER', '2020-10-02 08:00:00', 'Cumplida', 9, 560, 1, '2020-10-02 08:00:00'),
(1062, 9, 'Diagnóstico y reparación en Taller', 'Cliente CITMA', '2020-10-05 13:00:00', 'Cumplida', 9, 260, 1, '2020-10-05 13:00:00'),
(1063, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-06 15:00:00', 'Cumplida', 9, 140, 1, '2020-10-06 15:00:00'),
(1064, 9, 'Visita a cliente', 'Cliente UTN', '2020-10-06 13:00:00', 'Cumplida', 9, 120, 1, '2020-10-06 13:00:00'),
(1065, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-07 13:00:00', 'Cumplida', 9, 120, 1, '2020-10-07 13:00:00'),
(1066, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-07 15:00:00', 'Cumplida', 9, 140, 1, '2020-10-07 15:00:00'),
(1067, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-08 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-08 15:00:00'),
(1068, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-09 15:00:00', 'Cumplida', 9, 140, 1, '2020-10-09 15:00:00'),
(1069, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-12 15:00:00', 'Cumplida', 9, 140, 1, '2020-10-12 15:00:00'),
(1070, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-13 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-13 15:00:00'),
(1071, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-14 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-14 15:00:00'),
(1072, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-15 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-15 15:00:00'),
(1073, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-16 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-16 15:00:00'),
(1074, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-19 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-19 15:00:00'),
(1075, 9, 'Diagnóstico y reparación en Taller', 'cliente INDER', '2020-10-20 15:00:00', 'Incumplida', 9, 140, 1, '2020-10-20 15:00:00'),
(1076, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-08 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-08 13:00:00'),
(1077, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-09 13:00:00', 'Cumplida', 9, 120, 1, '2020-10-09 13:00:00'),
(1078, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-12 13:00:00', 'Cumplida', 9, 120, 1, '2020-10-12 13:00:00'),
(1079, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-13 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-13 13:00:00'),
(1080, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-14 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-14 13:00:00'),
(1081, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-15 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-15 13:00:00'),
(1082, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-16 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-16 13:00:00'),
(1083, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-19 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-19 13:00:00'),
(1084, 9, 'Atención a clientes de Taller', 'Recepción y/o entrega de medios informáticos', '2020-10-20 13:00:00', 'Incumplida', 9, 120, 1, '2020-10-20 13:00:00'),
(1085, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-12 08:00:00', 'Cumplida', 9, 240, 1, '2020-10-12 08:00:00'),
(1086, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-13 08:00:00', 'Incumplida', 9, 240, 1, '2020-10-13 08:00:00'),
(1087, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-14 08:00:00', 'Incumplida', 9, 240, 1, '2020-10-14 08:00:00'),
(1088, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-15 08:00:00', 'Incumplida', 9, 240, 1, '2020-10-15 08:00:00'),
(1089, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-16 08:00:00', 'Incumplida', 9, 240, 1, '2020-10-16 08:00:00'),
(1090, 9, 'Mantenimiento en CITMA', 'Mantenimiento en CITMA', '2020-10-19 08:30:00', 'Cancelada', 9, 210, 1, '2020-10-19 08:30:00'),
(1091, 9, 'Mantenimiento en CITMA', 'Mantenimiento en CITMA', '2020-10-20 08:30:00', 'Cancelada', 9, 210, 1, '2020-10-20 08:30:00'),
(1092, 7, 'Resetear cuenta de clientes conmutados', 'Resetear cuenta de clientes conmutados', '2020-10-01 09:00:00', 'Cumplida', 7, 5, 1, '2020-10-01 09:00:00'),
(1093, 9, 'Mantenimiento en CREVER', 'Mantenimiento en CREVER', '2020-10-19 08:30:00', 'Incumplida', 9, 210, 1, '2020-10-19 08:30:00'),
(1094, 9, 'Puntualización de tareas de la semana', 'Puntualización de tareas de la semana', '2020-10-12 08:00:00', 'Cumplida', 9, 30, 1, '2020-10-12 08:00:00'),
(1095, 9, 'Puntualización de tareas de la semana', 'Puntualización de tareas de la semana', '2020-10-19 08:00:00', 'Incumplida', 9, 30, 1, '2020-10-19 08:00:00'),
(1096, 7, 'Revisión al funcionamiento de los servidores', 'Revisión al funcionamiento de los servidores', '2020-10-01 09:05:00', 'Cumplida', 7, 55, 1, '2020-10-01 09:05:00'),
(1097, 7, 'Revisión al funcionamiento de los servidores', 'Revisión al funcionamiento de los servidores', '2020-10-02 09:05:00', 'Cancelada', 7, 55, 1, '2020-10-02 09:05:00'),
(1098, 7, 'Prueba semanal Grupo Electrógeno', 'Prueba semanal Grupo Electrógeno', '2020-10-06 09:00:00', 'Incumplida', 7, 30, 1, '2020-10-06 09:00:00'),
(1099, 7, 'Prueba semanal Grupo Electrógeno', 'Prueba semanal Grupo Electrógeno', '2020-10-13 09:00:00', 'Incumplida', 7, 30, 1, '2020-10-13 09:00:00'),
(1100, 7, 'Prueba semanal Grupo Electrógeno', 'Prueba semanal Grupo Electrógeno', '2020-10-20 09:00:00', 'Incumplida', 7, 30, 1, '2020-10-20 09:00:00'),
(1101, 7, 'Prueba semanal Grupo Electrógeno', 'Prueba semanal Grupo Electrógeno', '2020-10-27 09:00:00', 'Incumplida', 7, 30, 1, '2020-10-27 09:00:00'),
(1102, 7, 'Revisión al funcionamiento de los servidores', 'Revisión al funcionamiento de los servidores', '2020-10-02 09:05:00', 'Incumplida', 7, 55, 1, '2020-10-02 09:05:00'),
(1103, 7, 'Atención a clientes y dificultades que surjan', 'Atención a clientes y dificultades que surjan', '2020-10-01 10:10:00', 'Cumplida', 7, 430, 1, '2020-10-01 10:10:00'),
(1104, 7, 'Visita a Bandec', 'Visita a Bandec', '2020-10-02 11:00:00', 'Incumplida', 7, 60, 1, '2020-10-02 11:00:00'),
(1105, 7, 'Atención a dificultades q surjan', 'Atención a dificultades q surjan', '2020-10-02 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-02 13:00:00'),
(1106, 7, 'Reunión de coordinación, tareas de la semana', 'Reunión de coordinación, tareas de la semana', '2020-10-05 09:00:00', 'Cumplida', 7, 30, 1, '2020-10-05 09:00:00'),
(1107, 7, 'Configuración de Firewall en Servidor Web DST', 'Configuración de Firewall en Servidor Web DST', '2020-10-05 09:30:00', 'Cumplida', 7, 150, 1, '2020-10-05 09:30:00'),
(1108, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-05 13:00:00', 'Cumplida', 7, 260, 1, '2020-10-05 13:00:00'),
(1109, 7, 'Estudio de las herramientas para desarrollo de Apk', 'Estudio de las herramientas para desarrollo de Apk', '2020-10-06 09:30:00', 'Cumplida', 7, 150, 1, '2020-10-06 09:30:00'),
(1110, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-06 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-06 13:00:00'),
(1111, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-07 13:00:00', 'Cumplida', 7, 260, 1, '2020-10-07 13:00:00'),
(1112, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-08 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-08 13:00:00'),
(1113, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-09 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-09 13:00:00'),
(1114, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-12 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-12 13:00:00'),
(1115, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-13 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-13 13:00:00'),
(1116, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-14 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-14 13:00:00'),
(1117, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-15 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-15 13:00:00'),
(1118, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-16 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-16 13:00:00'),
(1119, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-19 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-19 13:00:00'),
(1120, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-20 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-20 13:00:00'),
(1121, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-21 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-21 13:00:00'),
(1122, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-22 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-22 13:00:00'),
(1123, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-23 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-23 13:00:00'),
(1124, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-26 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-26 13:00:00'),
(1125, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-27 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-27 13:00:00'),
(1126, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-28 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-28 13:00:00'),
(1127, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-29 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-29 13:00:00'),
(1128, 7, 'Trabajo en la Intranet del DST', 'Trabajo en la Intranet del DST', '2020-10-30 13:00:00', 'Incumplida', 7, 260, 1, '2020-10-30 13:00:00'),
(1129, 7, 'Conciliacion con la UEB GEE anexo 3 mes anterior', 'Conciliacion con la UEB GEE anexo 3 mes anterior', '2020-10-07 09:00:00', 'Cumplida', 7, 180, 1, '2020-10-07 09:00:00'),
(1130, 7, 'Proyección de videoconferencia Tarea Vida', 'Proyección de videoconferencia Tarea Vida', '2020-10-06 09:30:54', 'Cumplida', 7, 150, 1, '2020-10-06 09:30:54'),
(1131, 7, 'Proyección de Videoconferencias Medio Ambiente CITMA', 'Proyección de Videoconferencias Medio Ambiente CITMA', '2020-10-06 09:30:00', 'Cancelada', 7, 150, 1, '2020-10-06 09:30:00'),
(1132, 7, 'Proyección video conferencia ONN', 'Proyección video conferencia ONN', '2020-10-06 14:00:00', 'Incumplida', 7, 180, 1, '2020-10-06 14:00:00'),
(1133, 7, 'Proyección de video conferencia Directora General de Organización', 'Proyección de video conferencia Directora General de Organización', '2020-10-09 09:00:00', 'Incumplida', 7, 120, 1, '2020-10-09 09:00:00'),
(1134, 10, 'Reunion de puntualizacion del cumplimiento de las tareas de la semana', 'Reuni{on de puntualizaci{on del cumplimiento de las tareas de la semana', '2020-10-02 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-02 15:00:00'),
(1135, 10, 'Reunion de puntualizacion del cumplimiento de las tareas de la semana', 'Reuni{on de puntualizaci{on del cumplimiento de las tareas de la semana', '2020-10-09 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-09 15:00:00'),
(1136, 10, 'Reunion de puntualizacion del cumplimiento de las tareas de la semana', 'Reuni{on de puntualizaci{on del cumplimiento de las tareas de la semana', '2020-10-16 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-16 15:00:00'),
(1137, 10, 'Matutino y puntualizacion de las tareas para la semana', 'Matutino y puntualizacion de las tareas para la semana', '2020-10-05 08:00:00', 'Incumplida', 10, 30, 1, '2020-10-05 08:00:00'),
(1138, 10, 'Matutino y puntualizacion de las tareas para la semana', 'Matutino y puntualizacion de las tareas para la semana', '2020-10-12 08:00:00', 'Incumplida', 10, 30, 1, '2020-10-12 08:00:00'),
(1139, 10, 'Matutino y puntualizacion de las tareas para la semana', 'Matutino y puntualizacion de las tareas para la semana', '2020-10-19 08:00:00', 'Incumplida', 10, 30, 1, '2020-10-19 08:00:00'),
(1140, 10, 'Envio de carta de facturacion', 'Envio de carta de facturacion', '2020-10-01 08:00:00', 'Cumplida', 10, 30, 1, '2020-10-01 08:00:00'),
(1141, 10, 'Preparacion como reserva de cuadro', 'Preparacion de reserva de cuadros', '2020-10-07 15:00:00', 'Incumplida', 10, 60, 1, '2020-10-07 15:00:00'),
(1142, 10, 'Preparacion como reserva de cuadro', 'Preparacion de reserva de cuadros', '2020-10-14 15:00:00', 'Incumplida', 10, 60, 1, '2020-10-14 15:00:00'),
(1144, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-21 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-21 08:00:00'),
(1145, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-22 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-22 08:00:00'),
(1146, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-23 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-23 08:00:00'),
(1147, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-26 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-26 08:00:00'),
(1148, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-27 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-27 08:00:00'),
(1149, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-28 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-28 08:00:00'),
(1150, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-29 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-29 08:00:00'),
(1151, 10, 'Vacaciones Planificadas', 'Vacaciones ', '2020-10-30 08:00:00', 'Incumplida', 10, 560, 1, '2020-10-30 08:00:00'),
(1153, 10, 'Reunion de puntualizacion del cumplimiento de las tareas de la semana', 'Reuni{on de puntualizaci{on del cumplimiento de las tareas de la semana', '2020-10-05 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-05 15:00:00'),
(1154, 10, 'Reunion de puntualizacion del cumplimiento de las tareas de la semana', 'Reuni{on de puntualizaci{on del cumplimiento de las tareas de la semana', '2020-10-06 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-06 15:00:00'),
(1155, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-07 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-07 14:30:00'),
(1156, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-08 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-08 14:30:00'),
(1157, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-09 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-09 14:30:00'),
(1160, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-12 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-12 14:30:00'),
(1161, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-13 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-13 14:30:00'),
(1162, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-14 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-14 14:30:00'),
(1163, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-15 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-15 14:30:00'),
(1164, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-16 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-16 14:30:00'),
(1165, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-19 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-19 14:30:00'),
(1166, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-20 14:30:00', 'Incumplida', 10, 30, 1, '2020-10-20 14:30:00'),
(1167, 10, 'Realizar el excel con los pronósticos de ingresos del mes de todos los servicios', 'Hasta ahora 24134 cup', '2020-10-01 15:14:00', 'Cumplida', 10, 16, 1, '2020-10-01 15:14:00'),
(1168, 10, 'Hacer PF y facturar servicios brindados y pagados', 'Hacer pf de renovación de dominio del PP majibacoa, hacer pf de registro de dominio del PP prov. las tunas, hacer pf de renovación de licencia de CJI', '2020-10-02 08:30:00', 'Incumplida', 10, 60, 1, '2020-10-02 08:30:00'),
(1169, 10, 'Pasar a contabilidad los cobros efectuados y facturar', 'Pagos de servicios brindados y facturar', '2020-10-05 10:00:00', 'Incumplida', 10, 45, 1, '2020-10-09 10:00:00'),
(1170, 10, 'Cobrar cuentas conmutadas de personas naturales', 'Cobrar cuentas conmutadas de personas naturales', '2020-10-14 13:00:00', 'Incumplida', 10, 120, 1, '2020-10-16 13:00:00'),
(1171, 10, 'Cobrar cuentas conmutadas de personas naturales', 'Cobrar cuentas conmutadas de personas naturales', '2020-10-20 01:00:00', 'Incumplida', 10, 840, 1, '2020-10-21 01:00:00'),
(1172, 10, 'Cobrar cuentas conmutadas de personas naturales', 'Cobrar cuentas conmutadas de personas naturales', '2020-10-13 13:00:00', 'Incumplida', 10, 120, 1, '2020-10-13 13:00:00'),
(1173, 10, 'Cobrar cuentas conmutadas de personas naturales', 'Cobrar cuentas conmutadas de personas naturales', '2020-10-14 13:00:00', 'Incumplida', 10, 120, 1, '2020-10-14 13:00:00'),
(1174, 10, 'Venta de tarjetas nauta y cupón de recarga', 'Venta de tarjetas nauta 1h y cupón de recarga 2h', '2020-10-05 08:30:00', 'Incumplida', 10, 530, 1, '2020-10-09 08:30:00'),
(1175, 10, 'Venta de tarjetas nauta 1h y cupón de recarga 2h', 'Venta de tarjetas nauta 1h y cupón de recarga 2h', '2020-10-12 08:30:00', 'Incumplida', 10, 530, 1, '2020-10-16 08:30:00'),
(1176, 10, 'Venta de tarjetas nauta 1h y cupón de recarga 2h', 'Venta de tarjetas nauta 1h y cupón de recarga 2h', '2020-10-19 08:30:00', 'Incumplida', 10, 530, 1, '2020-10-20 08:30:00'),
(1177, 7, 'Proyección videoconferencia Gestión del  Riesgo', 'Proyección videoconferencia Gestión del  Riesgo', '2020-10-06 14:00:00', 'Cancelada', 7, 180, 1, '2020-10-06 14:00:00'),
(1178, 7, 'Proyección videoconferencia Directora Auditoría', 'Proyección videoconferencia Directora Auditoría', '2020-10-09 11:00:00', 'Incumplida', 7, 60, 1, '2020-10-09 11:00:00'),
(1179, 7, 'Proyección videoconferencia  Directora General de Ciencia', 'Proyección videoconferencia  Directora General de Ciencia', '2020-10-13 09:00:00', 'Incumplida', 7, 180, 1, '2020-10-13 09:00:00'),
(1180, 7, 'Proyección videoconferencia Directora General de Ciencia', 'Proyección videoconferencia Directora General de Ciencia', '2020-10-13 14:00:00', 'Incumplida', 7, 180, 1, '2020-10-13 14:00:00'),
(1181, 7, 'Proyección videoconferencia  Viceministro CITMA', 'Proyección videoconferencia  Viceministro CITMA', '2020-10-14 09:00:00', 'Incumplida', 7, 180, 1, '2020-10-14 09:00:00'),
(1182, 7, 'Proyección videoconferencia Directora General de Ciencia', 'Proyección videoconferencia Directora General de Ciencia', '2020-10-14 11:00:00', 'Incumplida', 7, 60, 1, '2020-10-14 11:00:00'),
(1183, 7, 'Proyección videoconferencia  Directora General ONN', 'Proyección videoconferencia  Directora General ONN', '2020-10-14 14:00:00', 'Incumplida', 7, 180, 1, '2020-10-14 14:00:00'),
(1184, 7, 'Proyección videoconferencia Ministra CITMA', 'Proyección videoconferencia Ministra CITMA', '2020-10-23 11:00:00', 'Incumplida', 7, 120, 1, '2020-10-23 11:00:00'),
(1185, 7, 'Proyección Videoconferencia Directora General de Ciencia', 'Participan DT, Directores de OTN Provinciales y de los CIGET', '2020-10-26 09:00:00', 'Incumplida', 7, 180, 1, '2020-10-26 09:00:00'),
(1186, 10, 'Puntualizacion con el jfe de departamento el cumplimiento de las tareas y cosas pendientes para terminar el mes', 'Puntualizacion con el jfe de departamento el cumplimiento de las tareas y cosas pendientes para terminar el mes', '2020-10-20 15:00:00', 'Incumplida', 10, 30, 1, '2020-10-20 15:00:00'),
(1187, 10, 'Revisión de las cuentas de la Empresa en las Redes sociales y promoción de los productos y servicios de comercio electrónico en las mismas.', 'Revisión de facebook, twitter, instagram', '2020-10-01 14:30:00', 'Cumplida', 10, 30, 1, '2020-10-01 14:30:00'),
(1188, 10, 'Visita a proveedor de comercio electronico', 'Visita a la Empresa de talabarteias THABA Las Tunas', '2020-10-06 08:30:00', 'Incumplida', 8, 90, 1, '2020-10-06 08:30:00'),
(1189, 10, 'Visita a cliente de comercio electronico', 'Empresa de materiales de la construccion', '2020-10-07 08:30:00', 'Incumplida', 8, 90, 1, '2020-10-07 08:30:00'),
(1190, 10, 'Visita a cliente de comercio electronico', 'Visita a la Empresa de Productos Lacteos', '2020-10-08 08:30:00', 'Incumplida', 8, 90, 1, '2020-10-08 08:30:00'),
(1191, 10, 'Visita a cliente de comercio electronico', 'Visita a Empresa VASCAL', '2020-10-13 08:30:00', 'Incumplida', 8, 90, 1, '2020-10-13 08:30:00'),
(1192, 10, 'Visita a cliente de comercio electronico', 'Visita  a Empresa de Muebles y Lamparas Ludema', '2020-10-15 08:30:00', 'Incumplida', 8, 90, 1, '2020-10-15 08:30:00'),
(1194, 8, '	Matutino y puntualizacion de las tareas para la semana', '	Matutino y puntualización de las tareas para la semana.', '2020-10-12 08:00:00', 'Incumplida', 8, 30, 1, '2020-10-12 08:00:00'),
(1195, 8, '	Matutino y puntualizacion de las tareas para la semana', '	Matutino y puntualización de las tareas para la semana.', '2020-10-19 08:00:00', 'Incumplida', 8, 30, 1, '2020-10-19 08:00:00'),
(1196, 8, '	Matutino y puntualizacion de las tareas para la semana', '	Matutino y puntualización de las tareas para la semana.', '2020-10-26 08:00:00', 'Incumplida', 8, 30, 1, '2020-10-26 08:00:00'),
(1198, 8, 'Reunión de puntualización del cumplimiento de las tareas de la semana', 'Reunión de puntualización del cumplimiento de las tareas de la semana', '2020-10-05 08:05:11', 'Cumplida', 8, 30, 1, '2020-10-05 08:05:11'),
(1199, 8, 'Reunión de puntualización del cumplimiento de las tareas de la semana', 'Reunión de puntualización del cumplimiento de las tareas de la semana', '2020-10-09 15:00:00', 'Incumplida', 8, 30, 1, '2020-10-09 15:00:00');
INSERT INTO `tareas` (`id`, `id_usuario`, `resumen`, `descripcion`, `fecha_inicio`, `estado`, `id_creador`, `duracion`, `validada`, `fecha_fin`) VALUES
(1200, 8, 'Reunión de puntualización del cumplimiento de las tareas de la semana', 'Reunión de puntualización del cumplimiento de las tareas de la semana', '2020-10-16 15:00:00', 'Incumplida', 8, 30, 1, '2020-10-16 15:00:00'),
(1201, 8, 'Reunión de puntualización del cumplimiento de las tareas de la semana', 'Reunión de puntualización del cumplimiento de las tareas de la semana', '2020-10-23 15:00:00', 'Incumplida', 8, 30, 1, '2020-10-23 15:00:00'),
(1202, 8, 'Reunión de puntualización del cumplimiento de las tareas de la semana', 'Reunión de puntualización del cumplimiento de las tareas de la semana', '2020-10-30 15:00:00', 'Incumplida', 8, 30, 1, '2020-10-30 15:00:00'),
(1203, 8, 'Verificar que se realice la prueba semanal del Grupo Electrógeno', 'Verificar que se realice la prueba semanal del Grupo Electrógeno', '2020-10-06 08:30:00', 'Incumplida', 8, 30, 1, '2020-10-06 08:30:00'),
(1204, 8, 'Preparación y envío de informaciones de cierre de mes', 'Información de la Energía, Grupo electrógeno, Combustible, Arqueo de caja, Cumplimiento de los planes, etc.', '2020-10-01 08:15:00', 'Cumplida', 8, 225, 1, '2020-10-01 08:15:00'),
(1205, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-01 08:05:00', 'Cumplida', 8, 10, 1, '2020-10-01 08:05:00'),
(1206, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-01 08:00:00', 'Cumplida', 8, 5, 1, '2020-10-01 08:00:00'),
(1207, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-02 08:00:00', 'Cumplida', 8, 5, 1, '2020-10-02 08:00:00'),
(1208, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-06 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-06 08:05:00'),
(1209, 8, 'Matutino y puntualizacion de las tareas para la semana', 'Matutino y puntualización de las tareas para la semana con los especialistas.', '2020-10-05 08:05:00', 'Cumplida', 8, 25, 1, '2020-10-05 08:05:00'),
(1210, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-05 08:00:00', 'Cumplida', 8, 5, 1, '2020-10-05 08:00:00'),
(1211, 8, 'Preparación a las Reservas de Cuadro', 'Preparación a las Reservas de Cuadro: Lianelys Rosa Segura Rodríguez y Leodan Pino Garcia.', '2020-10-07 15:00:00', 'Incumplida', 8, 60, 1, '2020-10-07 15:00:00'),
(1212, 8, 'Preparación a las Reservas de Cuadro', 'Preparación a las Reservas de Cuadro: Lianelys Rosa Segura Rodríguez y Leodan Pino Garcia.', '2020-10-14 15:00:00', 'Incumplida', 8, 60, 1, '2020-10-14 15:00:00'),
(1213, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-21 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-21 15:30:00'),
(1215, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-22 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-22 15:30:00'),
(1216, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-23 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-23 15:30:00'),
(1219, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-26 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-26 15:30:00'),
(1220, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-27 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-27 15:30:00'),
(1221, 8, '	Preparación a la Reserva de Cuadro', '	Preparación a la Reserva de Cuadro Leodan Pino Garcia', '2020-10-28 15:30:00', 'Incumplida', 8, 30, 1, '2020-10-28 15:30:00'),
(1222, 8, 'Realizar el autofocal en el DST', 'Realizar el autofocal en el DST y anotar en la libreta de incidencias.', '2020-10-05 08:30:00', 'Cumplida', 8, 10, 1, '2020-10-05 08:30:00'),
(1223, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-05 08:40:00', 'Cumplida', 8, 515, 1, '2020-10-05 08:40:00'),
(1224, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-05 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-05 17:15:00'),
(1225, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-05 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-05 16:30:00'),
(1226, 8, 'Realizar el autofocal en el DST', 'Realizar el autofocal en el DST y anotar en la libreta de incidencias.', '2020-10-12 08:30:00', 'Incumplida', 8, 10, 1, '2020-10-12 08:30:00'),
(1227, 8, 'Realizar el autofocal en el DST', 'Realizar el autofocal en el DST y anotar en la libreta de incidencias.', '2020-10-19 08:30:00', 'Incumplida', 8, 10, 1, '2020-10-19 08:30:00'),
(1228, 8, 'Realizar el autofocal en el DST', 'Realizar el autofocal en el DST y anotar en la libreta de incidencias.', '2020-10-26 08:30:00', 'Incumplida', 8, 10, 1, '2020-10-26 08:30:00'),
(1229, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-06 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-06 08:40:00'),
(1230, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-07 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-07 08:40:00'),
(1231, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-08 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-08 08:40:00'),
(1232, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-09 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-09 08:40:00'),
(1233, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-12 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-12 08:40:00'),
(1234, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-13 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-13 08:40:00'),
(1235, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-14 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-14 08:40:00'),
(1236, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-15 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-15 08:40:00'),
(1237, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-16 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-16 08:40:00'),
(1238, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-19 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-19 08:40:00'),
(1239, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-20 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-20 08:40:00'),
(1240, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-21 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-21 08:40:00'),
(1241, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-22 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-22 08:40:00'),
(1242, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-23 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-23 08:40:00'),
(1243, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-26 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-26 08:40:00'),
(1244, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-27 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-27 08:40:00'),
(1245, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-28 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-28 08:40:00'),
(1246, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-29 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-29 08:40:00'),
(1247, 8, 'Realizar tareas administrativas y comerciales.', 'Realizar tareas administrativas y comerciales.', '2020-10-30 08:40:00', 'Incumplida', 8, 515, 1, '2020-10-30 08:40:00'),
(1248, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-06 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-06 17:15:00'),
(1249, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-07 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-07 17:15:00'),
(1250, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-08 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-08 17:15:00'),
(1251, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-09 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-09 17:15:00'),
(1252, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-06 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-06 08:00:00'),
(1253, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-07 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-07 08:00:00'),
(1254, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-08 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-08 08:00:00'),
(1255, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-09 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-09 08:00:00'),
(1256, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-06 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-06 16:30:00'),
(1257, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-07 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-07 16:30:00'),
(1258, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-08 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-08 16:30:00'),
(1259, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-09 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-09 16:30:00'),
(1260, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-12 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-12 16:30:00'),
(1261, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-13 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-13 16:30:00'),
(1262, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-14 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-14 16:30:00'),
(1263, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-15 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-15 16:30:00'),
(1264, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-16 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-16 16:30:00'),
(1265, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-26 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-26 16:30:00'),
(1266, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-27 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-27 16:30:00'),
(1267, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-28 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-28 16:30:00'),
(1268, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-29 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-29 16:30:00'),
(1269, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-30 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-30 16:30:00'),
(1271, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-07 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-07 08:05:00'),
(1272, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-08 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-08 08:05:00'),
(1273, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-09 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-09 08:05:00'),
(1274, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-12 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-12 08:05:00'),
(1275, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-13 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-13 08:05:00'),
(1276, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-14 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-14 08:05:00'),
(1277, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-15 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-15 08:05:00'),
(1278, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-16 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-16 08:05:00'),
(1279, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-19 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-19 08:05:00'),
(1280, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-20 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-20 08:05:00'),
(1281, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-21 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-21 08:05:00'),
(1282, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-22 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-22 08:05:00'),
(1283, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-23 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-23 08:05:00'),
(1284, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-26 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-26 08:05:00'),
(1285, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-27 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-27 08:05:00'),
(1286, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-28 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-28 08:05:00'),
(1287, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-29 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-29 08:05:00'),
(1288, 8, 'Puntualización de las tareas del día con los especialistas.', 'Puntualización de las tareas del día con los especialistas.', '2020-10-30 08:05:00', 'Incumplida', 8, 10, 1, '2020-10-30 08:05:00'),
(1289, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-12 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-12 08:00:00'),
(1290, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-13 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-13 08:00:00'),
(1291, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-14 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-14 08:00:00'),
(1292, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-15 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-15 08:00:00'),
(1293, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-16 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-16 08:00:00'),
(1294, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-19 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-19 17:15:00'),
(1295, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-20 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-20 17:15:00'),
(1296, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-21 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-21 17:15:00'),
(1297, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-22 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-22 17:15:00'),
(1298, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-23 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-23 17:15:00'),
(1299, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-26 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-26 17:15:00'),
(1300, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-27 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-27 17:15:00'),
(1301, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-28 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-28 17:15:00'),
(1302, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-29 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-29 17:15:00'),
(1303, 8, 'Envío de asistencia (al culminar la jornada laboral)', 'Envío de asistencia al culminar la jornada laboral.', '2020-10-30 17:15:00', 'Incumplida', 8, 5, 1, '2020-10-30 17:15:00'),
(1304, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-19 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-19 16:30:00'),
(1305, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-20 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-20 16:30:00'),
(1306, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-21 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-21 16:30:00'),
(1307, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-22 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-22 16:30:00'),
(1308, 8, 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', 'Revisar los perfiles institucionales de CITMATEL en redes sociales y colaborar con la promoción del comercio electrónico.', '2020-10-23 16:30:00', 'Incumplida', 8, 45, 1, '2020-10-23 16:30:00'),
(1309, 8, 'Revisión de la documentación del GEE', 'Revisión del llenado correcto de la documentación del GEE LT 113 (Libro de incidencias, anexo 1 y tarjeta de control del diesel)', '2020-10-07 09:00:00', 'Incumplida', 8, 30, 1, '2020-10-07 09:00:00'),
(1310, 8, 'Revisión de la documentación del GEE', 'Revisión del llenado correcto de la documentación del GEE LT 113 (Libro de incidencias, anexo 1 y tarjeta de control del diesel)', '2020-10-14 09:00:00', 'Incumplida', 8, 30, 1, '2020-10-14 09:00:00'),
(1311, 8, 'Revisión de la documentación del GEE', 'Revisión del llenado correcto de la documentación del GEE LT 113 (Libro de incidencias, anexo 1 y tarjeta de control del diesel)', '2020-10-21 09:00:00', 'Incumplida', 8, 30, 1, '2020-10-21 09:00:00'),
(1312, 8, 'Revisión de la documentación del GEE', 'Revisión del llenado correcto de la documentación del GEE LT 113 (Libro de incidencias, anexo 1 y tarjeta de control del diesel)', '2020-10-28 09:00:00', 'Incumplida', 8, 30, 1, '2020-10-28 09:00:00'),
(1313, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-19 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-19 08:00:00'),
(1314, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-20 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-20 08:00:00'),
(1315, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-21 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-21 08:00:00'),
(1316, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-22 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-22 08:00:00'),
(1317, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-23 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-23 08:00:00'),
(1318, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-26 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-26 08:00:00'),
(1319, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-27 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-27 08:00:00'),
(1320, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-28 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-28 08:00:00'),
(1321, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-29 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-29 08:00:00'),
(1322, 8, 'Envío de asistencia (Inicio de la Jornada Laboral)', 'Envío de asistencia a la deirección de la empresa  (Inicio de la Jornada Laboral)', '2020-10-30 08:00:00', 'Incumplida', 8, 5, 1, '2020-10-30 08:00:00'),
(1323, 1, 'vsvsdc', 'sdcsdcsc', '2020-12-10 13:35:00', 'Incumplida', 1, 60, 0, '2020-12-10 13:35:00'),
(1324, 1, 'asdasd', 'asdasdas asd as das d', '2020-12-10 13:33:00', 'Incumplida', 1, 60, 0, '2020-12-10 13:33:00'),
(1326, 1, 'Prueba', 'tarea de prueba', '2020-12-10 13:52:00', 'Incumplida', 1, 1, 0, '2020-12-10 13:52:00'),
(1327, 1, 'Probando boton', 'asdasdasda', '2020-12-10 15:22:32', 'Incumplida', 1, 120, 0, '2020-12-10 15:22:32'),
(1328, 1, 'adasd', 'asdasds', '2020-12-18 14:35:54', 'Incumplida', 1, 1, 0, '2020-12-18 14:35:54'),
(1330, 2, 'adasd', 'asdasdsd', '2021-01-13 11:00:45', 'Incumplida', 2, 60, 0, '2021-01-13 11:00:45'),
(1331, 2, 'dadasdasd', 'adasdasd', '2021-01-13 12:44:00', 'Incumplida', 1, 60, 0, '2021-01-13 12:44:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(30) NOT NULL,
  `pass` varchar(128) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `role` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `picture` varchar(50) NOT NULL,
  `id_sup` int(11) NOT NULL,
  `position` text NOT NULL,
  `id_emp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `pass`, `fullname`, `role`, `email`, `picture`, `id_sup`, `position`, `id_emp`) VALUES
(1, 'yaro', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', 'Yarisel', 2, 'yaro@ltunas.inf.cu', 'empty.png', 1, 'JDST Citmatel', 3),
(2, 'Carlos', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', 'Carlos Miguel López Durañona', 1, 'carlos@ltunas.inf.cu', 'empty.png', 1, 'Esp. Rodas', 3),
(3, 'prueba', '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', 'Prueba', 2, 'prueba@prueba.inf.cu', 'empty.png', 1, 'Jefe de Pruebas', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_roles`
--

CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

--
-- Volcado de datos para la tabla `users_roles`
--

INSERT INTO `users_roles` (`id`, `role`, `level`) VALUES
(1, 'user', 1),
(2, 'admin', 2),
(3, 'tec', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_servicio`
--

CREATE TABLE `usuario_servicio` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario_servicio`
--

INSERT INTO `usuario_servicio` (`id`, `id_usuario`, `id_servicio`) VALUES
(1, 1, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `energia`
--
ALTER TABLE `energia`
  ADD PRIMARY KEY (`id`,`fecha`,`id_serv`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `observaciones_tareas`
--
ALTER TABLE `observaciones_tareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller_clientes`
--
ALTER TABLE `taller_clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller_clientes_personas`
--
ALTER TABLE `taller_clientes_personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller_equipos`
--
ALTER TABLE `taller_equipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `taller_registro`
--
ALTER TABLE `taller_registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users_roles`
--
ALTER TABLE `users_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_servicio`
--
ALTER TABLE `usuario_servicio`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `energia`
--
ALTER TABLE `energia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=370;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2019;

--
-- AUTO_INCREMENT de la tabla `observaciones_tareas`
--
ALTER TABLE `observaciones_tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `taller_clientes`
--
ALTER TABLE `taller_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `taller_clientes_personas`
--
ALTER TABLE `taller_clientes_personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `taller_registro`
--
ALTER TABLE `taller_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1332;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario_servicio`
--
ALTER TABLE `usuario_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
