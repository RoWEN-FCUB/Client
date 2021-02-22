-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-02-2021 a las 22:23:08
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
CREATE DATABASE IF NOT EXISTS `citmatel_lt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `citmatel_lt`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `dia_actual` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `energia`
--

DROP TABLE IF EXISTS `energia`;
CREATE TABLE `energia` (
  `id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `plan` int(11) NOT NULL,
  `consumo` int(11) NOT NULL DEFAULT 0,
  `lectura` int(11) NOT NULL DEFAULT 0,
  `lectura_hpicd1` decimal(10,2) NOT NULL DEFAULT 0.00,
  `lectura_hpicd2` decimal(10,2) NOT NULL DEFAULT 0.00,
  `lectura_hpicn1` decimal(10,2) NOT NULL DEFAULT 0.00,
  `lectura_hpicn2` decimal(10,2) NOT NULL DEFAULT 0.00,
  `plan_hpicd` decimal(10,2) NOT NULL DEFAULT 0.00,
  `plan_hpicn` decimal(10,2) NOT NULL DEFAULT 0.00,
  `id_serv` int(11) NOT NULL,
  `bloqueado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `notificacion` text NOT NULL,
  `fecha` datetime NOT NULL,
  `leida` tinyint(1) NOT NULL,
  `vinculo` varchar(200) NOT NULL,
  `estatus` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones_tareas`
--

DROP TABLE IF EXISTS `observaciones_tareas`;
CREATE TABLE `observaciones_tareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `observacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL,
  `id_emp` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `provincia` varchar(200) NOT NULL,
  `municipio` varchar(200) NOT NULL,
  `reup` varchar(20) NOT NULL,
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes`
--

DROP TABLE IF EXISTS `taller_clientes`;
CREATE TABLE `taller_clientes` (
  `id` int(11) NOT NULL,
  `siglas` varchar(50) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes_personas`
--

DROP TABLE IF EXISTS `taller_clientes_personas`;
CREATE TABLE `taller_clientes_personas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `ci` varchar(11) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_equipos`
--

DROP TABLE IF EXISTS `taller_equipos`;
CREATE TABLE `taller_equipos` (
  `id` int(11) NOT NULL,
  `equipo` varchar(250) NOT NULL,
  `marca` varchar(250) NOT NULL,
  `modelo` varchar(250) NOT NULL,
  `serie` varchar(250) NOT NULL,
  `inventario` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_registro`
--

DROP TABLE IF EXISTS `taller_registro`;
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
  `id_emp` int(11) NOT NULL,
  `fallo` text NOT NULL,
  `observaciones` text NOT NULL,
  `externo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadores `taller_registro`
--
DROP TRIGGER IF EXISTS `insertar_equipo`;
DELIMITER $$
CREATE TRIGGER `insertar_equipo` BEFORE INSERT ON `taller_registro` FOR EACH ROW IF NOT EXISTS(SELECT 1 FROM taller_equipos WHERE taller_equipos.equipo = NEW.equipo AND taller_equipos.marca = NEW.marca AND taller_equipos.modelo = NEW.modelo AND taller_equipos.serie = NEW.serie AND taller_equipos.inventario = NEW.inventario) THEN
INSERT INTO taller_equipos(equipo, marca, modelo, serie, inventario) VALUES (NEW.equipo, NEW.marca, NEW.modelo, NEW.serie, NEW.inventario);
END IF
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `nuevo_registro`;
DELIMITER $$
CREATE TRIGGER `nuevo_registro` BEFORE INSERT ON `taller_registro` FOR EACH ROW BEGIN
SET @MaxCode := (SELECT MAX(taller_registro.cod) FROM taller_registro) + 1;
IF (NEW.externo) THEN
SET NEW.cod = -1;
ELSE
SET NEW.cod = IFNULL(@MaxCode,1);
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_registro_partes`
--

DROP TABLE IF EXISTS `taller_registro_partes`;
CREATE TABLE `taller_registro_partes` (
  `id` int(11) NOT NULL,
  `parte` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `capacidad` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `id_reg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
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
  `id_emp` int(11) NOT NULL,
  `ci` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_servicio`
--

DROP TABLE IF EXISTS `usuario_servicio`;
CREATE TABLE `usuario_servicio` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  ADD UNIQUE KEY `SECUNDARIO` (`fecha`,`id_serv`);

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
-- Indices de la tabla `taller_registro_partes`
--
ALTER TABLE `taller_registro_partes`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `energia`
--
ALTER TABLE `energia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `observaciones_tareas`
--
ALTER TABLE `observaciones_tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taller_clientes`
--
ALTER TABLE `taller_clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taller_clientes_personas`
--
ALTER TABLE `taller_clientes_personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taller_equipos`
--
ALTER TABLE `taller_equipos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taller_registro`
--
ALTER TABLE `taller_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `taller_registro_partes`
--
ALTER TABLE `taller_registro_partes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_roles`
--
ALTER TABLE `users_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario_servicio`
--
ALTER TABLE `usuario_servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
