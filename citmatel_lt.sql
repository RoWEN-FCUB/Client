-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2023 a las 23:11:13
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
-- Estructura de tabla para la tabla `cities_weather`
--

CREATE TABLE `cities_weather` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(10,8) NOT NULL,
  `country` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `generationtime_ms` decimal(10,10) DEFAULT NULL,
  `utc_offset_seconds` int(11) DEFAULT NULL,
  `timezone` varchar(100) DEFAULT NULL,
  `timezone_abbreviation` varchar(100) DEFAULT NULL,
  `elevation` int(11) DEFAULT NULL,
  `temperature` decimal(10,1) DEFAULT NULL,
  `windspeed` decimal(10,1) DEFAULT NULL,
  `winddirection` decimal(10,1) DEFAULT NULL,
  `weathercode` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_conciliacion`
--

CREATE TABLE `comercial_conciliacion` (
  `id` int(11) NOT NULL,
  `id_prov` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `total_mn` decimal(10,0) NOT NULL,
  `total_usd` decimal(10,0) NOT NULL,
  `total_cl` decimal(10,0) NOT NULL,
  `vales` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_producto`
--

CREATE TABLE `comercial_producto` (
  `id` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `codigo` varchar(200) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `descripcion` text NOT NULL,
  `unidad_medida` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `mlc` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_proveedor`
--

CREATE TABLE `comercial_proveedor` (
  `id` int(11) NOT NULL,
  `id_serv` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `reeup` varchar(11) NOT NULL,
  `siglas` varchar(50) NOT NULL,
  `provincia` varchar(200) NOT NULL,
  `municipio` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_vale`
--

CREATE TABLE `comercial_vale` (
  `id` int(11) NOT NULL,
  `id_proveedor` int(11) NOT NULL,
  `pedido` varchar(200) NOT NULL,
  `precio_total` double NOT NULL,
  `comprador` varchar(250) NOT NULL,
  `destinatario` varchar(250) NOT NULL,
  `destinatario_direccion` varchar(250) NOT NULL,
  `destinatario_telefono` varchar(100) NOT NULL,
  `marcado_conciliar` tinyint(1) NOT NULL,
  `conciliado` tinyint(1) NOT NULL,
  `entregado` tinyint(1) NOT NULL,
  `fecha_emision` date NOT NULL,
  `costo_envio` double NOT NULL,
  `provincia` varchar(100) NOT NULL,
  `municipio` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercial_vale_productos`
--

CREATE TABLE `comercial_vale_productos` (
  `id` int(11) NOT NULL,
  `id_vale` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `dia_actual` datetime NOT NULL,
  `precio_dregular` decimal(10,2) NOT NULL,
  `precio_gregular` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `energia`
--

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
  `bloqueado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gee`
--

CREATE TABLE `gee` (
  `id` int(11) NOT NULL,
  `id_emp` int(11) NOT NULL,
  `id_serv` int(11) NOT NULL,
  `idgee` varchar(10) NOT NULL,
  `marca` varchar(20) NOT NULL,
  `kva` decimal(3,1) NOT NULL,
  `ic_scarga` decimal(5,2) NOT NULL,
  `ic_ccargad` decimal(5,2) NOT NULL,
  `ic_ccargan` decimal(5,2) NOT NULL,
  `dl` decimal(10,2) NOT NULL,
  `cap_tanque` int(11) NOT NULL,
  `tanque_ext` tinyint(1) DEFAULT NULL,
  `cap_tanque_ext` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gee_registro`
--

CREATE TABLE `gee_registro` (
  `id` int(11) NOT NULL,
  `id_gee` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `D` varchar(2) NOT NULL,
  `M` varchar(2) NOT NULL,
  `A` varchar(2) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `hora_inicial` time NOT NULL,
  `hora_final` time NOT NULL,
  `horametro_inicial` decimal(5,2) NOT NULL,
  `horametro_final` decimal(5,2) NOT NULL,
  `tiempo_trabajado` decimal(5,2) NOT NULL,
  `energia_generada` decimal(5,2) NOT NULL,
  `combustible_consumido` decimal(5,2) NOT NULL,
  `combustible_existencia` decimal(5,2) NOT NULL,
  `observaciones` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Disparadores `gee_registro`
--
DELIMITER $$
CREATE TRIGGER `eliminar_en_tanque` BEFORE DELETE ON `gee_registro` FOR EACH ROW BEGIN
DELETE FROM gee_tanque WHERE id_operacion = OLD.id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insertar_en_tanque` AFTER INSERT ON `gee_registro` FOR EACH ROW BEGIN
INSERT INTO gee_tanque (id_gee, id_operacion, fecha, salida, id_usuario) VALUES (NEW.id_gee, NEW.id, STR_TO_DATE(CONCAT(NEW.D , '-' , NEW.M , '-' , NEW.A), '%d-%m-%Y'), NEW.combustible_consumido, NEW.id_usuario);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gee_tanque`
--

CREATE TABLE `gee_tanque` (
  `id` int(11) NOT NULL,
  `id_gee` int(11) NOT NULL,
  `id_operacion` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `entrada` decimal(10,2) DEFAULT NULL,
  `salida` decimal(10,2) DEFAULT NULL,
  `existencia` decimal(10,2) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `observacion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Disparadores `gee_tanque`
--
DELIMITER $$
CREATE TRIGGER `act_existencia` BEFORE INSERT ON `gee_tanque` FOR EACH ROW BEGIN
IF (NEW.entrada IS NOT NULL) THEN
SET @exis = (SELECT existencia FROM gee_tanque WHERE id_gee = NEW.id_gee ORDER BY id DESC LIMIT 1);
IF (@exis IS NULL) THEN
SET @exis = 0;
END IF;
SET NEW.existencia = @exis + NEW.entrada;
END IF;
IF (NEW.salida IS NOT NULL) THEN
SET @exis = (SELECT existencia FROM gee_tanque WHERE id_gee = NEW.id_gee ORDER BY id DESC LIMIT 1);
IF (@exis IS NULL) THEN
SET @exis = 0;
END IF;
SET NEW.existencia = @exis - NEW.salida;
END IF;
END
$$
DELIMITER ;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observaciones_tareas`
--

CREATE TABLE `observaciones_tareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `observacion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro_vale`
--

CREATE TABLE `registro_vale` (
  `id` int(11) NOT NULL,
  `code` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `desc_parc_noche` int(11) NOT NULL,
  `latitud` decimal(10,8) NOT NULL DEFAULT 0.00000000,
  `longitud` decimal(10,8) NOT NULL DEFAULT 0.00000000,
  `horario_diurno` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes`
--

CREATE TABLE `taller_clientes` (
  `id` int(11) NOT NULL,
  `siglas` varchar(50) NOT NULL,
  `nombre` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_clientes_personas`
--

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

CREATE TABLE `taller_registro` (
  `id` int(11) NOT NULL,
  `cod` int(11) NOT NULL DEFAULT 1,
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
  `id_serv` int(11) NOT NULL,
  `fallo` text NOT NULL,
  `observaciones` text NOT NULL,
  `externo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Disparadores `taller_registro`
--
DELIMITER $$
CREATE TRIGGER `insertar_equipo` BEFORE INSERT ON `taller_registro` FOR EACH ROW IF NOT EXISTS(SELECT 1 FROM taller_equipos WHERE taller_equipos.equipo = NEW.equipo AND taller_equipos.marca = NEW.marca AND taller_equipos.modelo = NEW.modelo AND taller_equipos.serie = NEW.serie AND taller_equipos.inventario = NEW.inventario) THEN
INSERT INTO taller_equipos(equipo, marca, modelo, serie, inventario) VALUES (NEW.equipo, NEW.marca, NEW.modelo, NEW.serie, NEW.inventario);
END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller_registro_partes`
--

CREATE TABLE `taller_registro_partes` (
  `id` int(11) NOT NULL,
  `parte` varchar(100) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `capacidad` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `id_reg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas`
--

CREATE TABLE `tarjetas` (
  `id` int(11) NOT NULL,
  `id_gee` int(11) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `saldo` decimal(10,2) NOT NULL,
  `tipo_combustible` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas_registro`
--

CREATE TABLE `tarjetas_registro` (
  `id` int(11) NOT NULL,
  `id_tarjeta` int(11) NOT NULL,
  `id_gee` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `sinicial_pesos` decimal(10,2) DEFAULT NULL,
  `sinicial_litros` decimal(10,2) DEFAULT NULL,
  `recarga_pesos` decimal(10,2) DEFAULT NULL,
  `recarga_litros` decimal(10,2) DEFAULT NULL,
  `saldo_pesos` decimal(10,2) DEFAULT NULL,
  `saldo_litros` decimal(10,2) DEFAULT NULL,
  `consumo_pesos` decimal(10,2) DEFAULT NULL,
  `consumo_litros` decimal(10,2) DEFAULT NULL,
  `sfinal_pesos` decimal(10,2) DEFAULT NULL,
  `sfinal_litros` decimal(10,2) DEFAULT NULL,
  `observacion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Disparadores `tarjetas_registro`
--
DELIMITER $$
CREATE TRIGGER `actualizar_saldo_tarjeta` BEFORE INSERT ON `tarjetas_registro` FOR EACH ROW BEGIN
UPDATE tarjetas SET saldo = NEW.sfinal_pesos WHERE id = NEW.id_tarjeta;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `actualizar_tanque` AFTER INSERT ON `tarjetas_registro` FOR EACH ROW BEGIN
IF NEW.consumo_litros IS NOT NULL THEN
INSERT INTO gee_tanque (id_gee, id_operacion, fecha, entrada, id_usuario) VALUES (NEW.id_gee, NEW.id, NEW.fecha, NEW.consumo_litros, NEW.id_usuario);
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `eliminar_en_tanque2` BEFORE DELETE ON `tarjetas_registro` FOR EACH ROW BEGIN
DELETE FROM gee_tanque WHERE id_operacion = OLD.id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_combustibles`
--

CREATE TABLE `tipos_combustibles` (
  `id` int(11) NOT NULL,
  `tipo_combustible` varchar(200) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `id_emp` int(11) NOT NULL,
  `id_serv` int(11) NOT NULL,
  `ci` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_roles`
--

CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_servicio`
--

CREATE TABLE `usuario_servicio` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cities_weather`
--
ALTER TABLE `cities_weather`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_conciliacion`
--
ALTER TABLE `comercial_conciliacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_producto`
--
ALTER TABLE `comercial_producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_proveedor`
--
ALTER TABLE `comercial_proveedor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_vale`
--
ALTER TABLE `comercial_vale`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comercial_vale_productos`
--
ALTER TABLE `comercial_vale_productos`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `gee`
--
ALTER TABLE `gee`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gee_registro`
--
ALTER TABLE `gee_registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `gee_tanque`
--
ALTER TABLE `gee_tanque`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `registro_vale`
--
ALTER TABLE `registro_vale`
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
-- Indices de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tarjetas_registro`
--
ALTER TABLE `tarjetas_registro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipos_combustibles`
--
ALTER TABLE `tipos_combustibles`
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
-- AUTO_INCREMENT de la tabla `cities_weather`
--
ALTER TABLE `cities_weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_conciliacion`
--
ALTER TABLE `comercial_conciliacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_producto`
--
ALTER TABLE `comercial_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_proveedor`
--
ALTER TABLE `comercial_proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_vale`
--
ALTER TABLE `comercial_vale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercial_vale_productos`
--
ALTER TABLE `comercial_vale_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `gee`
--
ALTER TABLE `gee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gee_registro`
--
ALTER TABLE `gee_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `gee_tanque`
--
ALTER TABLE `gee_tanque`
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
-- AUTO_INCREMENT de la tabla `registro_vale`
--
ALTER TABLE `registro_vale`
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
-- AUTO_INCREMENT de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarjetas_registro`
--
ALTER TABLE `tarjetas_registro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipos_combustibles`
--
ALTER TABLE `tipos_combustibles`
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
