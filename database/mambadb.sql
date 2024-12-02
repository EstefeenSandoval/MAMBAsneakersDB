-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2024 a las 23:14:28
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mambadb`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `TopMoreProductsSupplied` ()   BEGIN
    SELECT 
        pr.Nombre_Prov AS Proveedor, 
        COUNT(DISTINCT fp.ProductoID) AS ProductosSuministrados
    FROM 
        proveedor pr
    JOIN 
        factura f ON pr.ID_Prov = f.ProveedorID
    JOIN 
        factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
    GROUP BY 
        pr.ID_Prov
    ORDER BY 
        ProductosSuministrados DESC
    LIMIT 3;  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `TopSellingProducts` ()   BEGIN
    -- Declare variables to store data for each row
    DECLARE v_ID_Prod INT;
    DECLARE v_Nombre_Prod VARCHAR(255);
    DECLARE v_Cantidad INT;
    DECLARE v_Finished INT DEFAULT 0;

    -- Declare a cursor to loop through the sold products
    DECLARE product_cursor CURSOR FOR
        SELECT p.ID_Prod, p.Nombre_Prod, SUM(fp.Cantidad)
        FROM Factura_Producto fp
        INNER JOIN Producto p ON fp.ProductoID = p.ID_Prod
        GROUP BY p.ID_Prod, p.Nombre_Prod;
        
    -- Declare the handler to close the cursor when finished
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_Finished = 1;
    
    -- Create a temporary table to store the results
    CREATE TEMPORARY TABLE TopSellingProducts (
        ID_Prod INT,
        Product_Name VARCHAR(255),
        Total_Sold INT
    );

    -- Open the cursor
    OPEN product_cursor;
    
    -- Loop to fetch the results from the cursor
    read_loop: LOOP
        FETCH product_cursor INTO v_ID_Prod, v_Nombre_Prod, v_Cantidad;
        
        IF v_Finished = 1 THEN
            LEAVE read_loop;
        END IF;

        -- Insert the fetched data into the temporary table
        INSERT INTO TopSellingProducts (ID_Prod, Product_Name, Total_Sold)
        VALUES (v_ID_Prod, v_Nombre_Prod, v_Cantidad);
    END LOOP;

    -- Close the cursor
    CLOSE product_cursor;

    -- Display the top selling products report
    SELECT * FROM TopSellingProducts ORDER BY Total_Sold DESC;

    -- Drop the temporary table
    DROP TEMPORARY TABLE TopSellingProducts;

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `RFC_Cte` varchar(50) NOT NULL,
  `Nombre_Cte` varchar(50) NOT NULL,
  `Calle` varchar(50) DEFAULT NULL,
  `Colonia` varchar(50) DEFAULT NULL,
  `LocalidadID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`RFC_Cte`, `Nombre_Cte`, `Calle`, `Colonia`, `LocalidadID`) VALUES
('AAG000001', 'Juan Pérez', 'Av. Universidad', 'La Soledad', 1),
('AAG000002', 'María López', 'Calle Reforma', 'Zona Centro', 1),
('AAG000003', 'Pedro Gómez', 'Calle Hidalgo', 'Barrio de la Estación', 1),
('AAG000004', 'Ana Torres', 'Calle 5 de Febrero', 'El Llano', 1),
('AAG000005', 'Lucía Martínez', 'Calle Juárez', 'Norias de Ojocaliente', 1),
('AAG000006', 'Jorge Fernández', 'Calle Allende', 'San Antonio de los Horcones', 1),
('AAG000007', 'Sofía Hernández', 'Calle Madero', 'La Soledad', 1),
('AAG000008', 'Carlos Ruiz', 'Calle Morelos', 'Cañada Honda', 1),
('AAG000009', 'Elena Castro', 'Calle Lázaro Cárdenas', 'Salto de los Salado', 1),
('AAG000010', 'Fernando Gómez', 'Calle Independencia', 'Villa Montaña', 1),
('AAG000011', 'Mariana Vega', 'Calle Zaragoza', 'La Soledad', 1),
('AAG000012', 'Pablo Mendoza', 'Calle 16 de Septiembre', 'El Llano', 1),
('AAG000013', 'Laura Herrera', 'Calle Santa María', 'Barrio de la Estación', 1),
('AAG000014', 'Arturo Ramírez', 'Calle San Carlos', 'Cañada Honda', 1),
('AAG000015', 'Valentina Cruz', 'Calle 28 de Agosto', 'Salto de los Salado', 1),
('AAG000016', 'Eduardo Castro', 'Calle Santiago', 'Norias de Ojocaliente', 1),
('AAG000017', 'Patricia Torres', 'Calle Emiliano Zapata', 'San Antonio de los Horcones', 1),
('AAG000018', 'Felipe Rojas', 'Calle del Agua', 'La Soledad', 1),
('AAG000019', 'Carmen Aguilar', 'Calle Los Ángeles', 'Villa Montaña', 1),
('AAG000020', 'Hugo Salinas', 'Calle La Paz', 'Zona Centro', 1),
('AAG000021', 'Andrea Méndez', 'Calle Melchor Múzquiz', 'El Llano', 1),
('AAG000022', 'Rafael Domínguez', 'Calle Las Flores', 'Barrio de la Estación', 1),
('AAG000023', 'Teresa Orozco', 'Calle El Mirador', 'Cañada Honda', 1),
('AAG000024', 'Ignacio Fernández', 'Calle de la Libertad', 'Salto de los Salado', 1),
('AAG000025', 'Liliana Silva', 'Calle Las Torres', 'Norias de Ojocaliente', 1),
('AAG000026', 'Raúl Díaz', 'Calle Jardín', 'San Antonio de los Horcones', 1),
('AAG000027', 'Inés Ortega', 'Calle del Sol', 'La Soledad', 1),
('AAG000028', 'Gabriel León', 'Calle San Francisco', 'Villa Montaña', 1),
('AAG000029', 'Martín Castro', 'Calle Río Nazas', 'Zona Centro', 1),
('AAG000030', 'Rosa García', 'Calle Constitución', 'El Llano', 1),
('AAG000031', 'Victor López', 'Calle Nueva España', 'Barrio de la Estación', 1),
('AAG000032', 'Esteban Morales', 'Calle de la Paz', 'Cañada Honda', 1),
('AAG000033', 'Claudia Hernández', 'Calle San Pedro', 'Salto de los Salado', 1),
('AAG000034', 'Mónica Pérez', 'Calle Las Flores', 'Norias de Ojocaliente', 1),
('AAG000035', 'Samuel Martínez', 'Calle Del Bosque', 'San Antonio de los Horcones', 1),
('AAG000036', 'Yolanda Romero', 'Calle de la Rosa', 'La Soledad', 1),
('AAG000037', 'Ángel Herrera', 'Calle Las Palomas', 'Villa Montaña', 1),
('AAG000038', 'Silvia Morales', 'Calle Pino', 'Zona Centro', 1),
('AAG000039', 'Luis Fernández', 'Calle del Tigre', 'El Llano', 1),
('AAG000040', 'Sandra Ruiz', 'Calle Colón', 'Barrio de la Estación', 1),
('AAG000041', 'Arturo Sánchez', 'Calle de la Libertad', 'Cañada Honda', 1),
('AAG000042', 'Verónica Vargas', 'Calle Juárez', 'Salto de los Salado', 1),
('AAG000043', 'Omar Salazar', 'Calle Vicente Guerrero', 'Norias de Ojocaliente', 1),
('AAG000044', 'Nora Castro', 'Calle Santa Clara', 'San Antonio de los Horcones', 1),
('AAG000045', 'Daniel Torres', 'Calle El Cielo', 'La Soledad', 1),
('AAG000046', 'Gabriela Mendoza', 'Calle La Paz', 'Villa Montaña', 1),
('AAG000047', 'Emanuel Rojas', 'Calle Las Estrellas', 'Zona Centro', 1),
('AAG000048', 'Patricia Álvarez', 'Calle Lira', 'El Llano', 1),
('AAG000049', 'Rafael Castro', 'Calle de las Flores', 'Barrio de la Estación', 1),
('AAG000050', 'Diego Delgado', 'Calle Lázaro Cárdenas', 'Cañada Honda', 1),
('AS000051', 'Diego Silva', 'Calle Candelaria', 'San Gil', 11),
('AS000052', 'Martha González', 'Calle 5 de Febrero', 'Las Negritas', 11),
('AS000053', 'Felipe Martínez', 'Calle del Sol', 'Bajío de San José', 11),
('AS000054', 'Elisa Torres', 'Calle La Libertad', 'El Cañón', 11),
('AS000055', 'Alberto Ruiz', 'Calle San Andrés', 'El Ranchito', 11),
('CA000056', 'Rosa Delgado', 'Calle Los Molinos', 'El Rodeo', 18),
('CA000057', 'Julio Ortega', 'Calle San Miguel', 'La Labor', 18),
('CA000058', 'Leticia Ramos', 'Calle Huertas', 'Ojocaliente', 18),
('CA000059', 'Rodolfo Martínez', 'Calle Libertad', 'Malpaso', 18),
('CA000060', 'Irma Fernández', 'Calle del Águila', 'Presa de los Serna', 18),
('CD000096', 'Miguel Torres', 'Paseo de la Reforma', 'Santa Fe', 41),
('CD000097', 'Laura Fernández', 'Calle 5 de Febrero', 'Coyoacán', 41),
('CO000061', 'Luis Morales', 'Calle San Juan', 'La Escondida', 25),
('CO000062', 'Teresa Pérez', 'Calle Hidalgo', 'El Refugio', 25),
('CO000063', 'David López', 'Calle Del Valle', 'El Salero', 25),
('CO000064', 'Patricia Morales', 'Calle Las Flores', 'La Punta', 25),
('CO000065', 'Antonio Castro', 'Calle La Esperanza', 'Villa de Cosío', 25),
('EL000066', 'Fernando Salas', 'Calle Ejidal', 'San Isidro', 31),
('EL000067', 'Adriana Ríos', 'Calle San Felipe', 'El Sol', 31),
('EL000068', 'María Cruz', 'Calle Loma Alta', 'Rincón de la Luz', 31),
('EL000069', 'Julio Flores', 'Calle Real del Monte', 'San Pedro', 31),
('EL000070', 'Alejandra Paredes', 'Calle Del Agua', 'Las Flores', 31),
('GU000098', 'Adela Pérez', 'Calle León', 'Silao', 61),
('GU000099', 'Pedro Ramos', 'Calle Miguel Hidalgo', 'Irapuato', 61),
('JM000071', 'Estela Sánchez', 'Calle San Antonio', 'La Troje', 36),
('JM000072', 'Roberto Ramos', 'Calle de los Ríos', 'Ejido San Antonio', 36),
('JM000073', 'Patricia Rivera', 'Calle La Palma', 'Paso Blanco', 36),
('JM000074', 'Carlos Peña', 'Calle Santa Teresa', 'San Antonio', 36),
('JM000075', 'Rafael Mendoza', 'Calle del Sol', 'Valle del Bosque', 36),
('PA000076', 'René Soto', 'Calle Central', 'La Mezquitera', 42),
('PA000077', 'Verónica Morales', 'Calle de las Flores', 'San Sebastián', 42),
('PA000078', 'Andrés Jiménez', 'Calle Las Palmas', 'El Terrero', 42),
('PA000079', 'Mariana Castillo', 'Calle la Luz', 'Las Fuentes', 42),
('PA000080', 'Ricardo Martínez', 'Calle La Primavera', 'San Miguel', 42),
('RR000081', 'Nadia Castillo', 'Calle del Río', 'Las Fraguas', 47),
('RR000082', 'Héctor Sánchez', 'Calle Independencia', 'La Fragua', 47),
('RR000083', 'Patricia Martínez', 'Calle del Limonar', 'Los Patos', 47),
('RR000084', 'Omar González', 'Calle del Naranjo', 'Ejido de Rincón', 47),
('RR000085', 'María López', 'Calle de la Libertad', 'San Pedro', 47),
('SF000086', 'José López', 'Calle Zaragoza', 'La Concepción', 52),
('SF000087', 'Claudia Torres', 'Calle Libertad', 'El Barril', 52),
('SF000088', 'Sergio Ramírez', 'Calle Santa Clara', 'Bajío de los San Román', 52),
('SF000089', 'Patricia Rojas', 'Calle del Sol', 'El Arcángel', 52),
('SF000090', 'Rafael Díaz', 'Calle 16 de Septiembre', 'San Francisco', 52),
('SJ000091', 'Mónica Ruiz', 'Calle Las Flores', 'San José de Gracia Centro', 57),
('SJ000092', 'David López', 'Calle Lázaro Cárdenas', 'Las Huertas', 57),
('SJ000093', 'Patricia Aguirre', 'Calle Independencia', 'Las Flores', 57),
('SJ000094', 'Santiago Pérez', 'Calle Morelos', 'El Jardín', 57),
('SJ000095', 'Alejandra Silva', 'Calle San Pablo', 'Ejido de San José', 57);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `ID_Envio` int(11) NOT NULL,
  `FechaSalida` date DEFAULT NULL,
  `FechaLlegada` date DEFAULT NULL,
  `Metodo_Envio` varchar(50) DEFAULT NULL,
  `Costo_Envio` decimal(10,2) DEFAULT NULL,
  `Estado_Envio` varchar(50) DEFAULT NULL,
  `Direccion_Envio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `envio`
--

INSERT INTO `envio` (`ID_Envio`, `FechaSalida`, `FechaLlegada`, `Metodo_Envio`, `Costo_Envio`, `Estado_Envio`, `Direccion_Envio`) VALUES
(1, '2024-11-01', '2024-11-03', 'FedEx', 120.50, 'Pendiente', 'Calle de Durango 123, Cuauhtémoc, Ciudad de México'),
(2, '2024-11-02', '2024-11-04', 'DHL', 130.75, 'Entregado', 'Calle 5 de Febrero 456, León, Guanajuato'),
(3, '2024-11-03', '2024-11-05', 'UPS', 115.00, 'En tránsito', 'Calle Juárez 789, Puebla, Puebla'),
(4, '2024-11-04', '2024-11-06', 'Correos', 100.25, 'Entregado', 'Avenida Chapultepec 321, Guadalajara, Jalisco'),
(5, '2024-11-05', '2024-11-07', 'FedEx', 140.00, 'Pendiente', 'Calle Morelos 654, Morelia, Michoacán'),
(6, '2024-11-06', '2024-11-08', 'DHL', 150.50, 'En tránsito', 'Calle 16 de Septiembre 111, Veracruz, Veracruz'),
(7, '2024-11-07', '2024-11-09', 'UPS', 165.75, 'Entregado', 'Avenida Revolución 222, Tijuana, Baja California'),
(8, '2024-11-08', '2024-11-10', 'Correos', 120.00, 'Pendiente', 'Calle Hidalgo 333, Monterrey, Nuevo León'),
(9, '2024-11-09', '2024-11-11', 'FedEx', 125.00, 'En tránsito', 'Avenida Independencia 444, Oaxaca, Oaxaca'),
(10, '2024-11-10', '2024-11-12', 'DHL', 135.00, 'Entregado', 'Calle 20 de Noviembre 555, Cancún, Quintana Roo'),
(11, '2024-11-11', '2024-11-13', 'UPS', 145.00, 'Pendiente', 'Avenida Juárez 666, San Luis Potosí, San Luis Potosí'),
(12, '2024-11-12', '2024-11-14', 'Correos', 155.00, 'En tránsito', 'Calle 5 de Mayo 777, Hermosillo, Sonora'),
(13, '2024-11-13', '2024-11-15', 'FedEx', 165.00, 'Entregado', 'Calle Morelos 888, Culiacán, Sinaloa'),
(14, '2024-11-14', '2024-11-16', 'DHL', 175.00, 'Pendiente', 'Avenida 5 de Febrero 999, Aguascalientes, Aguascalientes'),
(15, '2024-11-15', '2024-11-17', 'UPS', 185.00, 'En tránsito', 'Calle San Luis 101, León, Guanajuato'),
(16, '2024-11-16', '2024-11-18', 'Correos', 195.00, 'Entregado', 'Calle Puebla 202, Mérida, Yucatán'),
(17, '2024-11-17', '2024-11-19', 'FedEx', 205.00, 'Pendiente', 'Calle Santa Ana 303, Campeche, Campeche'),
(18, '2024-11-18', '2024-11-20', 'DHL', 215.00, 'En tránsito', 'Avenida 20 de Noviembre 404, San Cristóbal de las Casas, Chiapas'),
(19, '2024-11-19', '2024-11-21', 'UPS', 225.00, 'Entregado', 'Calle Matamoros 505, Ciudad Juárez, Chihuahua'),
(20, '2024-11-20', '2024-11-22', 'Correos', 235.00, 'Pendiente', 'Calle Faja de Oro 606, Guadalajara, Jalisco'),
(21, '2024-11-21', '2024-11-23', 'FedEx', 245.00, 'En tránsito', 'Calle De La Paz 707, Colima, Colima'),
(22, '2024-11-22', '2024-11-24', 'DHL', 255.00, 'Entregado', 'Avenida de los Insurgentes 808, México, D.F.'),
(23, '2024-11-23', '2024-11-25', 'UPS', 265.00, 'Pendiente', 'Calle Goya 909, Tlaxcala, Tlaxcala'),
(24, '2024-11-24', '2024-11-26', 'Correos', 275.00, 'En tránsito', 'Calle del Consulado 1010, Zacatecas, Zacatecas'),
(25, '2024-11-25', '2024-11-27', 'FedEx', 285.00, 'Entregado', 'Avenida Paseo de la Reforma 1111, Ciudad de México'),
(26, '2024-11-26', '2024-11-28', 'DHL', 295.00, 'Pendiente', 'Calle Hidalgo 1212, Aguascalientes, Aguascalientes'),
(27, '2024-11-27', '2024-11-29', 'UPS', 305.00, 'En tránsito', 'Calle 10 1313, Hermosillo, Sonora'),
(28, '2024-11-28', '2024-11-30', 'Correos', 315.00, 'Entregado', 'Calle 5 de Febrero 1414, Cancún, Quintana Roo'),
(29, '2024-11-29', '2024-12-01', 'FedEx', 325.00, 'Pendiente', 'Calle Francisco Villa 1515, Ciudad Juárez, Chihuahua'),
(30, '2024-11-30', '2024-12-02', 'DHL', 335.00, 'En tránsito', 'Calle 15 de Mayo 1616, Querétaro, Querétaro'),
(31, '2024-12-01', '2024-12-03', 'UPS', 345.00, 'Entregado', 'Calle Reforma 1717, Veracruz, Veracruz'),
(32, '2024-12-02', '2024-12-04', 'Correos', 355.00, 'Pendiente', 'Avenida 5 de Febrero 1818, Guanajuato, Guanajuato'),
(33, '2024-12-03', '2024-12-05', 'FedEx', 365.00, 'En tránsito', 'Calle Las Flores 1919, Oaxaca, Oaxaca'),
(34, '2024-12-04', '2024-12-06', 'DHL', 375.00, 'Entregado', 'Calle Cuauhtémoc 2020, Tlaxcala, Tlaxcala'),
(35, '2024-12-05', '2024-12-07', 'UPS', 385.00, 'Pendiente', 'Calle de los Reyes 2121, Monterrey, Nuevo León'),
(36, '2024-12-06', '2024-12-08', 'Correos', 395.00, 'En tránsito', 'Calle San Lorenzo 2222, Colima, Colima'),
(37, '2024-12-07', '2024-12-09', 'FedEx', 405.00, 'Entregado', 'Calle 7 de enero 2323, Tlaxcala, Tlaxcala'),
(38, '2024-12-08', '2024-12-10', 'DHL', 415.00, 'Pendiente', 'Calle de San Pedro 2424, Ciudad de México'),
(39, '2024-12-09', '2024-12-11', 'UPS', 425.00, 'En tránsito', 'Calle San Sebastián 2525, León, Guanajuato'),
(40, '2024-12-10', '2024-12-12', 'Correos', 435.00, 'Entregado', 'Avenida de los Insurgentes 2626, Aguascalientes, Aguascalientes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `ID_Estado` int(11) NOT NULL,
  `Nombre_Estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`ID_Estado`, `Nombre_Estado`) VALUES
(1, 'Aguascalientes'),
(2, 'Baja California'),
(3, 'Baja California Sur'),
(4, 'Campeche'),
(5, 'Chiapas'),
(6, 'Chihuahua'),
(7, 'Ciudad de México'),
(8, 'Coahuila'),
(9, 'Colima'),
(10, 'Durango'),
(11, 'Guanajuato'),
(12, 'Guerrero'),
(13, 'Hidalgo'),
(14, 'Jalisco'),
(15, 'México'),
(16, 'Michoacán'),
(17, 'Morelos'),
(18, 'Nayarit'),
(19, 'Nuevo León'),
(20, 'Oaxaca'),
(21, 'Puebla'),
(22, 'Querétaro'),
(23, 'Quintana Roo'),
(24, 'San Luis Potosí'),
(25, 'Sinaloa'),
(26, 'Sonora'),
(27, 'Tabasco'),
(28, 'Tamaulipas'),
(29, 'Tlaxcala'),
(30, 'Veracruz'),
(31, 'Yucatán'),
(32, 'Zacatecas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `Folio_Factura` int(11) NOT NULL,
  `Fecha_Creada` date NOT NULL,
  `Subtotal` decimal(10,2) NOT NULL,
  `Impuesto` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `Tipo` varchar(30) DEFAULT NULL,
  `EnvioID` int(11) DEFAULT NULL,
  `ProveedorID` int(11) DEFAULT NULL,
  `ClienteRFC` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`Folio_Factura`, `Fecha_Creada`, `Subtotal`, `Impuesto`, `Total`, `Tipo`, `EnvioID`, `ProveedorID`, `ClienteRFC`) VALUES
(1, '2024-11-01', 2500.00, 400.00, 2900.00, 'Venta', 1, 1, 'AAG000001'),
(2, '2024-11-02', 3000.00, 480.00, 3480.00, 'Venta', 2, 1, 'AAG000002'),
(3, '2024-11-03', 1500.00, 240.00, 1740.00, 'Venta', 3, 1, 'AAG000003'),
(4, '2024-11-04', 2000.00, 320.00, 2320.00, 'Venta', 4, 1, 'AAG000004'),
(5, '2024-11-05', 3500.00, 560.00, 4060.00, 'Venta', 5, 1, 'AAG000005'),
(6, '2024-11-06', 4200.00, 672.00, 4872.00, 'Venta', 6, 1, 'AAG000006'),
(7, '2024-11-07', 2900.00, 464.00, 3364.00, 'Venta', 7, 1, 'AAG000007'),
(8, '2024-11-08', 1800.00, 288.00, 2088.00, 'Venta', 8, 1, 'AAG000008'),
(9, '2024-11-09', 3200.00, 512.00, 3712.00, 'Venta', 9, 1, 'AAG000009'),
(10, '2024-11-10', 4000.00, 640.00, 4640.00, 'Venta', 10, 1, 'AAG000010'),
(11, '2024-11-11', 2700.00, 432.00, 3132.00, 'Venta', 11, 1, 'AAG000011'),
(12, '2024-11-12', 2300.00, 368.00, 2668.00, 'Venta', 12, 1, 'AAG000012'),
(13, '2024-11-13', 3100.00, 496.00, 3596.00, 'Venta', 13, 1, 'AAG000013'),
(14, '2024-11-14', 2500.00, 400.00, 2900.00, 'Venta', 14, 1, 'AAG000014'),
(15, '2024-11-15', 1900.00, 304.00, 2204.00, 'Venta', 15, 1, 'AAG000015'),
(16, '2024-11-16', 1700.00, 272.00, 1972.00, 'Venta', 16, 1, 'AAG000016'),
(17, '2024-11-17', 3300.00, 528.00, 3828.00, 'Venta', 17, 1, 'AAG000017'),
(18, '2024-11-18', 1500.00, 240.00, 1740.00, 'Venta', 18, 1, 'AAG000018'),
(19, '2024-11-19', 2800.00, 448.00, 3248.00, 'Venta', 19, 1, 'AAG000019'),
(20, '2024-11-20', 3100.00, 496.00, 3596.00, 'Venta', 20, 1, 'AAG000020'),
(21, '2024-11-21', 2400.00, 384.00, 2784.00, 'Venta', 21, 1, 'AAG000021'),
(22, '2024-11-22', 1800.00, 288.00, 2088.00, 'Venta', 22, 1, 'AAG000022'),
(23, '2024-11-23', 2900.00, 464.00, 3364.00, 'Venta', 23, 1, 'AAG000023'),
(24, '2024-11-24', 2500.00, 400.00, 2900.00, 'Venta', 24, 1, 'AAG000024'),
(25, '2024-11-25', 3000.00, 480.00, 3480.00, 'Venta', 25, 1, 'AAG000025'),
(26, '2024-11-26', 3500.00, 560.00, 4060.00, 'Venta', 26, 1, 'AAG000026'),
(27, '2024-11-27', 1800.00, 288.00, 2088.00, 'Venta', 27, 1, 'AAG000027'),
(28, '2024-11-28', 3200.00, 512.00, 3712.00, 'Venta', 28, 1, 'AAG000028'),
(29, '2024-11-29', 2800.00, 448.00, 3248.00, 'Venta', 29, 1, 'AAG000029'),
(30, '2024-11-30', 3000.00, 480.00, 3480.00, 'Venta', 30, 1, 'AAG000030'),
(31, '2024-12-01', 3100.00, 496.00, 3596.00, 'Venta', 31, 1, 'AAG000031'),
(32, '2024-12-02', 2000.00, 320.00, 2320.00, 'Venta', 32, 1, 'AAG000032'),
(33, '2024-12-03', 2300.00, 368.00, 2668.00, 'Venta', 33, 1, 'AAG000033'),
(34, '2024-12-04', 2500.00, 400.00, 2900.00, 'Venta', 34, 1, 'AAG000034'),
(35, '2024-12-05', 1900.00, 304.00, 2204.00, 'Venta', 35, 1, 'AAG000035'),
(36, '2024-12-06', 1500.00, 240.00, 1740.00, 'Venta', 36, 1, 'AAG000036'),
(37, '2024-12-07', 4200.00, 672.00, 4872.00, 'Venta', 37, 1, 'AAG000037'),
(38, '2024-12-08', 1800.00, 288.00, 2088.00, 'Venta', 38, 1, 'AAG000038'),
(39, '2024-12-09', 2500.00, 400.00, 2900.00, 'Venta', 39, 1, 'AAG000039'),
(40, '2024-12-10', 2700.00, 432.00, 3132.00, 'Venta', 40, 1, 'AAG000040');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_producto`
--

CREATE TABLE `factura_producto` (
  `FacturaFolio` int(11) NOT NULL,
  `ProductoID` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_producto`
--

INSERT INTO `factura_producto` (`FacturaFolio`, `ProductoID`, `Cantidad`) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 4),
(2, 4, 2),
(3, 5, 3),
(3, 6, 1),
(4, 7, 2),
(4, 8, 1),
(5, 9, 5),
(5, 10, 1),
(6, 11, 2),
(6, 12, 3),
(7, 13, 1),
(7, 14, 2),
(8, 15, 4),
(8, 16, 1),
(9, 17, 3),
(9, 18, 2),
(10, 19, 2),
(10, 20, 1),
(11, 21, 5),
(11, 22, 1),
(12, 23, 2),
(12, 24, 3),
(13, 25, 1),
(13, 26, 4),
(14, 27, 2),
(14, 28, 1),
(15, 29, 3),
(15, 30, 2),
(16, 1, 1),
(16, 2, 3),
(17, 3, 2),
(17, 4, 1),
(18, 5, 3),
(18, 6, 2),
(19, 7, 1),
(19, 8, 5),
(20, 9, 2),
(20, 10, 4),
(21, 11, 3),
(21, 12, 1),
(22, 13, 2),
(22, 14, 1),
(23, 15, 5),
(23, 16, 2),
(24, 17, 1),
(24, 18, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localidad`
--

CREATE TABLE `localidad` (
  `ID_Localidad` int(11) NOT NULL,
  `Nombre_Localidad` varchar(50) NOT NULL,
  `MunicipioID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localidad`
--

INSERT INTO `localidad` (`ID_Localidad`, `Nombre_Localidad`, `MunicipioID`) VALUES
(1, 'Barrio de la Estación', 1),
(2, 'Cañada Honda', 1),
(3, 'El Llano', 1),
(4, 'La Soledad', 1),
(5, 'Norias de Ojocaliente', 1),
(6, 'Salto de los Salado', 1),
(7, 'San Antonio de los Horcones', 1),
(8, 'San Ignacio', 1),
(9, 'Villa Montaña', 1),
(10, 'Zona Centro', 1),
(11, 'Bajío de San José', 2),
(12, 'Ciénega Grande', 2),
(13, 'Las Negritas', 2),
(14, 'Los Caños', 2),
(15, 'Pilotos', 2),
(16, 'San Gil', 2),
(17, 'Villa Juárez', 2),
(18, 'El Rodeo', 3),
(19, 'La Labor', 3),
(20, 'Malpaso', 3),
(21, 'Ojocaliente', 3),
(22, 'Presa de los Serna', 3),
(23, 'San Tadeo', 3),
(24, 'Valle de Huejúcar', 3),
(25, 'El Refugio', 4),
(26, 'El Salero', 4),
(27, 'La Punta', 4),
(28, 'La Escondida', 4),
(29, 'San Jacinto', 4),
(30, 'Villa de Cosío', 4),
(31, 'Palo Alto', 5),
(32, 'Santa Rosa', 5),
(33, 'Valle de los Cactus', 5),
(34, 'El Carmen', 5),
(35, 'San Isidro', 5),
(36, 'Ejido San Antonio', 6),
(37, 'La Troje', 6),
(38, 'Paso Blanco', 6),
(39, 'San Antonio de los Ríos', 6),
(40, 'Tapias Viejas', 6),
(41, 'Venadero', 6),
(42, 'La Mezquitera', 7),
(43, 'Pabellón de Hidalgo', 7),
(44, 'San Luis de Letras', 7),
(45, 'Santa Isabel', 7),
(46, 'El Ocote', 7),
(47, 'Escaleras', 8),
(48, 'Las Fraguas', 8),
(49, 'Pabellón de Arteaga', 8),
(50, 'San Jacinto', 8),
(51, 'San Pedro', 8),
(52, 'La Concepción', 9),
(53, 'Las Cumbres', 9),
(54, 'San Felipe', 9),
(55, 'San José', 9),
(56, 'Villa Montaña', 9),
(57, 'La Congoja', 10),
(58, 'La Labor', 10),
(59, 'Presas de los Serna', 10),
(60, 'San Antonio', 10),
(61, 'San José de Gracia Centro', 10),
(62, 'Colonia Vicente Guerrero', 11),
(63, 'La Ribera', 16),
(64, 'Bécal', 21),
(65, 'Chiapa de Corzo', 31),
(66, 'Creel', 36),
(67, 'Santa Fe', 41),
(68, 'Ciudad Acuña', 46),
(69, 'El Colomo', 51),
(70, 'Nuevo Ideal', 56),
(71, 'Silao', 61),
(72, 'Iguala', 66),
(73, 'Centro', 286),
(74, 'Centro', 291);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `ID_Municipio` int(11) NOT NULL,
  `Nombre_Municipio` varchar(50) NOT NULL,
  `EstadoID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`ID_Municipio`, `Nombre_Municipio`, `EstadoID`) VALUES
(1, 'Aguascalientes', 1),
(2, 'Asientos', 1),
(3, 'Calvillo', 1),
(4, 'Cosío', 1),
(5, 'El Llano', 1),
(6, 'Jesús María', 1),
(7, 'Pabellón de Arteaga', 1),
(8, 'Rincón de Romos', 1),
(9, 'San Francisco de los Romo', 1),
(10, 'San José de Gracia', 1),
(11, 'Ensenada', 2),
(12, 'Mexicali', 2),
(13, 'Playas de Rosarito', 2),
(14, 'Tecate', 2),
(15, 'Tijuana', 2),
(16, 'Comondú', 3),
(17, 'La Paz', 3),
(18, 'Loreto', 3),
(19, 'Los Cabos', 3),
(20, 'Mulegé', 3),
(21, 'Calkiní', 4),
(22, 'Campeche', 4),
(23, 'Candelaria', 4),
(24, 'Carmen', 4),
(25, 'Champotón', 4),
(26, 'Escárcega', 4),
(27, 'Hecelchakán', 4),
(28, 'Hopelchén', 4),
(29, 'Palizada', 4),
(30, 'Tenabo', 4),
(31, 'Tuxtla Gutiérrez', 5),
(32, 'San Cristóbal de las Casas', 5),
(33, 'Tapachula', 5),
(34, 'Comitán de Domínguez', 5),
(35, 'Palenque', 5),
(36, 'Chihuahua', 6),
(37, 'Ciudad Juárez', 6),
(38, 'Cuauhtémoc', 6),
(39, 'Delicias', 6),
(40, 'Parral', 6),
(41, 'Álvaro Obregón', 7),
(42, 'Azcapotzalco', 7),
(43, 'Benito Juárez', 7),
(44, 'Coyoacán', 7),
(45, 'Cuajimalpa de Morelos', 7),
(46, 'Saltillo', 8),
(47, 'Torreón', 8),
(48, 'Monclova', 8),
(49, 'Piedras Negras', 8),
(50, 'Acuña', 8),
(51, 'Colima', 9),
(52, 'Manzanillo', 9),
(53, 'Tecomán', 9),
(54, 'Villa de Álvarez', 9),
(55, 'Comala', 9),
(56, 'Durango', 10),
(57, 'Gómez Palacio', 10),
(58, 'Lerdo', 10),
(59, 'Canatlán', 10),
(60, 'Pueblo Nuevo', 10),
(61, 'León', 11),
(62, 'Celaya', 11),
(63, 'Irapuato', 11),
(64, 'Salamanca', 11),
(65, 'San Miguel de Allende', 11),
(66, 'Acapulco', 12),
(67, 'Chilpancingo', 12),
(68, 'Iguala', 12),
(69, 'Taxco', 12),
(70, 'Zihuatanejo', 12),
(286, 'Mérida', 31),
(287, 'Progreso', 31),
(288, 'Valladolid', 31),
(289, 'Tizimín', 31),
(290, 'Umán', 31),
(291, 'Zacatecas', 32),
(292, 'Fresnillo', 32),
(293, 'Jerez', 32),
(294, 'Sombrerete', 32),
(295, 'Río Grande', 32);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Prod` int(11) NOT NULL,
  `Nombre_Prod` varchar(40) NOT NULL,
  `Descripcion_Prod` varchar(120) DEFAULT NULL,
  `Cantidad_Prod` int(11) NOT NULL,
  `PrecioUnit_Prod` decimal(10,2) NOT NULL,
  `Descuento_Prod` decimal(10,2) DEFAULT NULL,
  `Imagen_Prod` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Prod`, `Nombre_Prod`, `Descripcion_Prod`, `Cantidad_Prod`, `PrecioUnit_Prod`, `Descuento_Prod`, `Imagen_Prod`) VALUES
(1, 'adidas tenis Gazelle Indoor', 'Earth Strata/Cloud White/Magic Beige - 25% extra', 50, 2920.00, 730.00, 'adidas_gazelle.jpg'),
(2, 'Onitsuka Tiger tenis Mexico 66', 'Cream Mineral - Elección responsable', 30, 8809.00, 0.00, 'onitsuka_mexico66.jpg'),
(3, 'Jordan tenis Air Jordan 1', 'Low OG Velvet Brown de JORDAN x Travis Scott', 20, 25330.00, 0.00, 'jordan_airjordan1.jpg'),
(4, 'AMIRI tenis Pacific', 'Nueva temporada', 25, 13285.00, 0.00, 'amiri_pacific.jpg'),
(5, 'Balenciaga tenis Track', 'Nueva temporada', 15, 20723.00, 0.00, 'balenciaga_track.jpg'),
(6, 'MM6 Maison Margiela tenis XT-Mary', 'de x Salomon', 10, 6365.00, 1591.25, 'mm6_xtmary.jpg'),
(7, 'ASICS tenis Gel-Sonoma 15-50', '-25% extra - Elección responsable', 40, 3452.00, 863.00, 'asics_gel_sonoma.jpg'),
(8, 'Comme des Garçons Hombre Plus tenis Air ', 'de Comme des Garçons Homme Plus x Nike', 12, 8950.00, 0.00, 'cdg_airmax.jpg'),
(9, 'Nike tenis Dunk Low Retro', 'Quickstrike - Elección responsable', 35, 3549.00, 0.00, 'nike_dunk_low.jpg'),
(10, 'Zegna tenis Triple Stitch', '', 22, 25755.00, 0.00, 'zegna_triple_stitch.jpg'),
(11, 'adidas tenis Samba College', 'Navy de adidas x Alwayth', 18, 9262.00, 0.00, 'adidas_samba_navy.jpg'),
(12, 'Maison MIHARA YASUHIRO tenis Peterson23 ', '-25% extra', 28, 8740.00, 2185.00, 'maison_peterson23.jpg'),
(13, 'New Balance tenis 1000', 'Pink - Elección responsable', 55, 5121.00, 0.00, 'newbalance_1000.jpg'),
(14, 'Lanvin tenis Curb', '-25% extra', 5, 26556.00, 6639.00, 'lanvin_curb.jpg'),
(15, 'Balenciaga tenis Stapler', 'Elección responsable', 40, 20796.00, 0.00, 'balenciaga_stapler.jpg'),
(16, 'FENDI tenis Flow', '', 10, 21383.00, 0.00, 'fendi_flow.jpg'),
(17, 'Maison MIHARA YASUHIRO tenis Keith', '-25% extra', 7, 10111.00, 2527.75, 'maison_keith.jpg'),
(18, 'Fear Of God tenis Moc Runner', '-25% extra', 9, 19835.00, 4958.75, 'fear_of_god_moc.jpg'),
(19, 'adidas tenis Samba College', 'Burgundy de adidas x ALWAYTH', 15, 10381.00, 0.00, 'adidas_samba_burgundy.jpg'),
(20, 'Saucony tenis ProGrid Omni 9', 'Jae Tips To Do List Tan', 20, 7067.00, 0.00, 'saucony_progrid.jpg'),
(21, 'New Balance tenis 1906L', 'Silver - Nueva temporada', 30, 10541.00, 0.00, 'newbalance_1906l.jpg'),
(22, 'ASICS tenis GEL-Kayano 20', 'Bodega Small Wins Add Up - Elección responsable', 12, 6027.00, 0.00, 'asics_gel_kayano.jpg'),
(23, 'Salomon tenis ACS Pro GTX', '-25% extra - Elección responsable', 5, 5345.00, 1336.25, 'salomon_acs_pro.jpg'),
(24, 'Salomon tenis XT-4 OG', 'Elección responsable', 15, 4112.00, 0.00, 'salomon_xt4.jpg'),
(25, 'New Balance tenis 530', '-25% extra - Elección responsable', 25, 3452.00, 863.00, 'newbalance_530.jpg'),
(26, 'ASICS tenis Gel-Kahana Tr V4', '-25% extra - Elección responsable', 18, 8289.00, 2072.25, 'asics_gel_kahana.jpg'),
(27, 'Valentino Garavani tenis Upvillage', '', 7, 13640.00, 0.00, 'valentino_upvillage.jpg'),
(28, 'Nike tenis Kobe 8 Protro', 'College Navy - Elección responsable', 9, 6640.00, 0.00, 'nike_kobe_8.jpg'),
(29, 'Jordan tenis Air Jordan 1', 'High OG Black Toe Reimagined - Elección responsable', 12, 5388.00, 0.00, 'jordan_airjordan1_high.jpg'),
(30, 'Nike tenis Air Foamposite One', 'Kazuya Mishima de Nike x Tekken 8 - Elección responsable', 5, 33751.00, 0.00, 'nike_air_foamposite.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `ID_Prov` int(11) NOT NULL,
  `Nombre_Prov` varchar(50) NOT NULL,
  `Contacto_Prov` varchar(50) DEFAULT NULL,
  `Telefono_Prov` varchar(15) DEFAULT NULL,
  `Email_Prov` varchar(100) DEFAULT NULL,
  `Direccion_Prov` varchar(100) DEFAULT NULL,
  `Ciudad_Prov` varchar(50) DEFAULT NULL,
  `Pais_Prov` varchar(50) DEFAULT NULL,
  `Imagen_Prov` varchar(50) DEFAULT NULL,
  `LocalidadID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`ID_Prov`, `Nombre_Prov`, `Contacto_Prov`, `Telefono_Prov`, `Email_Prov`, `Direccion_Prov`, `Ciudad_Prov`, `Pais_Prov`, `Imagen_Prov`, `LocalidadID`) VALUES
(1, 'Proveedores Aguascalientes S.A.', 'Luis Pérez', '449-123-4567', 'contacto@aguascalientes.com', 'Calle de la Paz 123', 'Aguascalientes', 'México', 'prov1.jpg', 1),
(2, 'Distribuidora de Aguascalientes', 'María Gómez', '449-234-5678', 'ventas@distribuidoraaguascalientes.com', 'Av. Universidad 456', 'Aguascalientes', 'México', 'prov2.jpg', 1),
(3, 'Comercializadora Aguascalientes', 'José Martínez', '449-345-6789', 'info@comercializadoraaguascalientes.com', 'Calle Juárez 789', 'Aguascalientes', 'México', 'prov3.jpg', 1),
(4, 'Servicios Industriales Aguascalientes', 'Patricia Ruiz', '449-456-7890', 'servicios@industrialesaguascalientes.com', 'Calle Madero 234', 'Aguascalientes', 'México', 'prov4.jpg', 1),
(5, 'Proveedora de Insumos', 'Juan Hernández', '449-567-8901', 'insumos@proveedoraaguascalientes.com', 'Calle 16 de Septiembre 567', 'Aguascalientes', 'México', 'prov5.jpg', 1),
(6, 'Almacenes Aguascalientes', 'Claudia López', '449-678-9012', 'almacenes@aguascalientes.com', 'Calle Morelos 678', 'Aguascalientes', 'México', 'prov6.jpg', 1),
(7, 'Distribuciones Rápidas Aguascalientes', 'Ricardo Torres', '449-789-0123', 'distribuciones@aguascalientes.com', 'Calle del Agua 789', 'Aguascalientes', 'México', 'prov7.jpg', 1),
(8, 'Suministros y Servicios Aguascalientes', 'Ana Sánchez', '449-890-1234', 'suministros@aguascalientes.com', 'Calle Lázaro Cárdenas 890', 'Aguascalientes', 'México', 'prov8.jpg', 1),
(9, 'Logística Aguascalientes', 'Santiago Ramírez', '449-901-2345', 'logistica@aguascalientes.com', 'Calle 5 de Febrero 901', 'Aguascalientes', 'México', 'prov9.jpg', 1),
(10, 'Abastecimientos Aguascalientes', 'Laura Fernández', '449-012-3456', 'abastecimientos@aguascalientes.com', 'Calle Emiliano Zapata 012', 'Aguascalientes', 'México', 'prov10.jpg', 1),
(11, 'Proveedores de Asientos', 'Ernesto Ríos', '465-123-4567', 'contacto@asientos.com', 'Calle Candelaria 123', 'Asientos', 'México', 'prov11.jpg', 2),
(12, 'Distribuciones Asientos S.A.', 'Fernanda López', '465-234-5678', 'ventas@distribucionesasientos.com', 'Calle 5 de Febrero 456', 'Asientos', 'México', 'prov12.jpg', 2),
(13, 'Comercializadora Asientos', 'Antonio Jiménez', '465-345-6789', 'info@comercializadoraasientos.com', 'Calle del Sol 789', 'Asientos', 'México', 'prov13.jpg', 2),
(14, 'Proveedores Calvillo S.A.', 'Beatriz Díaz', '466-456-7890', 'contacto@calvillo.com', 'Calle Huertas 234', 'Calvillo', 'México', 'prov14.jpg', 3),
(15, 'Comercial Calvillo', 'Hugo Gómez', '466-567-8901', 'ventas@comercialcalvillo.com', 'Calle Libertad 567', 'Calvillo', 'México', 'prov15.jpg', 3),
(16, 'Proveedores de Cosío', 'Mónica Sánchez', '467-678-9012', 'contacto@cosio.com', 'Calle San Juan 890', 'Cosío', 'México', 'prov16.jpg', 4),
(17, 'Distribuidora Cosío', 'Ricardo Salazar', '467-789-0123', 'ventas@distribuidoracosio.com', 'Calle Del Valle 123', 'Cosío', 'México', 'prov17.jpg', 4),
(18, 'Proveedores El Llano', 'José Castro', '468-890-1234', 'contacto@elllano.com', 'Calle Ejidal 456', 'El Llano', 'México', 'prov18.jpg', 5),
(19, 'Comercializadora El Llano', 'Verónica Ortiz', '468-901-2345', 'ventas@comercializadoraelllano.com', 'Calle San Felipe 789', 'El Llano', 'México', 'prov19.jpg', 5),
(20, 'Proveedores de Jesús María', 'Arturo Ramírez', '469-012-3456', 'contacto@jesusmaria.com', 'Calle San Antonio 234', 'Jesús María', 'México', 'prov20.jpg', 6),
(21, 'Distribuciones Jesús María', 'Sofía Álvarez', '469-123-4567', 'ventas@distribucionesjesusmaria.com', 'Calle de los Ríos 567', 'Jesús María', 'México', 'prov21.jpg', 6),
(22, 'Proveedores Pabellón', 'Diego Hernández', '470-234-5678', 'contacto@pabellon.com', 'Calle Central 890', 'Pabellón de Arteaga', 'México', 'prov22.jpg', 7),
(23, 'Comercializadora Pabellón', 'Carla Mendoza', '470-345-6789', 'ventas@comercializadora.pabellon.com', 'Calle de las Flores 123', 'Pabellón de Arteaga', 'México', 'prov23.jpg', 7),
(24, 'Proveedores Rincón', 'Adriana Torres', '471-456-7890', 'contacto@rincon.com', 'Calle del Río 456', 'Rincón de Romos', 'México', 'prov24.jpg', 8),
(25, 'Distribuciones Rincón', 'Javier López', '471-567-8901', 'ventas@distribucionesrincon.com', 'Calle Independencia 789', 'Rincón de Romos', 'México', 'prov25.jpg', 8),
(26, 'Proveedores San Francisco', 'Patricia Ramírez', '472-678-9012', 'contacto@sanfrancisco.com', 'Calle Zaragoza 234', 'San Francisco de los Romo', 'México', 'prov26.jpg', 9),
(27, 'Comercializadora San Francisco', 'Francisco García', '472-789-0123', 'ventas@comercializadorasfrancisco.com', 'Calle Libertad 567', 'San Francisco de los Romo', 'México', 'prov27.jpg', 9),
(28, 'Proveedores San José', 'Claudia Pérez', '473-890-1234', 'contacto@sanjose.com', 'Calle Las Flores 890', 'San José de Gracia', 'México', 'prov28.jpg', 10),
(29, 'Distribuidora San José', 'Roberto Morales', '473-901-2345', 'ventas@distribuidorasanjose.com', 'Calle Lázaro Cárdenas 123', 'San José de Gracia', 'México', 'prov29.jpg', 10),
(30, 'Proveedores CDMX', 'Fernando Ruiz', '474-012-3456', 'contacto@cdmx.com', 'Paseo de la Reforma 456', 'Ciudad de México', 'México', 'prov30.jpg', 11);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`RFC_Cte`),
  ADD KEY `LocalidadID` (`LocalidadID`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`ID_Envio`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`ID_Estado`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`Folio_Factura`),
  ADD KEY `EnvioID` (`EnvioID`),
  ADD KEY `ProveedorID` (`ProveedorID`),
  ADD KEY `ClienteRFC` (`ClienteRFC`);

--
-- Indices de la tabla `factura_producto`
--
ALTER TABLE `factura_producto`
  ADD PRIMARY KEY (`FacturaFolio`,`ProductoID`),
  ADD KEY `ProductoID` (`ProductoID`);

--
-- Indices de la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD PRIMARY KEY (`ID_Localidad`),
  ADD KEY `MunicipioID` (`MunicipioID`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`ID_Municipio`),
  ADD KEY `EstadoID` (`EstadoID`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Prod`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`ID_Prov`),
  ADD KEY `LocalidadID` (`LocalidadID`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`LocalidadID`) REFERENCES `localidad` (`ID_Localidad`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`EnvioID`) REFERENCES `envio` (`ID_Envio`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`ProveedorID`) REFERENCES `proveedor` (`ID_Prov`),
  ADD CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`ClienteRFC`) REFERENCES `cliente` (`RFC_Cte`);

--
-- Filtros para la tabla `factura_producto`
--
ALTER TABLE `factura_producto`
  ADD CONSTRAINT `factura_producto_ibfk_1` FOREIGN KEY (`FacturaFolio`) REFERENCES `factura` (`Folio_Factura`),
  ADD CONSTRAINT `factura_producto_ibfk_2` FOREIGN KEY (`ProductoID`) REFERENCES `producto` (`ID_Prod`);

--
-- Filtros para la tabla `localidad`
--
ALTER TABLE `localidad`
  ADD CONSTRAINT `localidad_ibfk_1` FOREIGN KEY (`MunicipioID`) REFERENCES `municipio` (`ID_Municipio`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`EstadoID`) REFERENCES `estado` (`ID_Estado`);

--
-- Filtros para la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`LocalidadID`) REFERENCES `localidad` (`ID_Localidad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
