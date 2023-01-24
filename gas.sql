-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2021 at 09:16 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gas`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `customers_sp` (IN `_updateid` INT, IN `_name` VARCHAR(250), IN `_dis` VARCHAR(250), IN `_village` VARCHAR(250), IN `_phone` VARCHAR(250), IN `_email` VARCHAR(250), IN `_gender` VARCHAR(20))  NO SQL
BEGIN
if EXISTS(SELECT * FROM customers WHERE id = _updateid )THEN

UPDATE customers SET name = _name,district=_dis,village=_village,phone=_phone,email=_email,gender=_gender WHERE id = _updateid;

SELECT 'Updated' As  Message;

ELSE
INSERT INTO customers(name,district,village,phone,email,gender) VALUES(_name,_dis,_village,_phone,_email,_gender);

SELECT 'Registered' As Message;

end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `gas_sp` (IN `_updateid` INT, IN `_type` VARCHAR(260), IN `_price` VARCHAR(260))  NO SQL
BEGIN
if EXISTS(SELECT * FROM gas WHERE id = _updateid )THEN

UPDATE gas SET type = _type,price=_price WHERE id = _updateid;

SELECT 'Updated' As  Message;

ELSE
INSERT INTO gas(type,price) VALUES(_type,_price);

SELECT 'Registered' As Message;

end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_sp` (IN `_username` VARCHAR(250), IN `_password` VARCHAR(250))  NO SQL
BEGIN
if EXISTS(SELECT * FROM users WHERE users.username=_username AND users.password=PASSWORD(_password))THEN

        SELECT *FROM users WHERE users.username=_username;
   


ELSE
 select 'Incorrect' as Message;
end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mechanics_sp` (IN `_updateid` INT, IN `_name` VARCHAR(250), IN `_gender` VARCHAR(250), IN `_phone` VARCHAR(250), IN `_add` VARCHAR(250), IN `_salary` VARCHAR(250), IN `_date` DATE)  NO SQL
BEGIN
if EXISTS(SELECT * FROM mechanics WHERE id = _updateid )THEN

UPDATE mechanics SET name = _name,gender = _gender,phone=_phone,address=_add,salary=_salary,date=_date WHERE id = _updateid;

SELECT 'Updated' As  Message;

ELSE
INSERT INTO mechanics(name,gender,phone,address,salary,date) VALUES(_name,_gender,_phone,_add,_salary,_date);

SELECT 'Registered' As Message;

end IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `orders_sp` (IN `update_id` INT, IN `_name` VARCHAR(250), IN `_phone` VARCHAR(250), IN `_dis` VARCHAR(250), IN `_village` VARCHAR(250), IN `_type` VARCHAR(250), IN `_price` VARCHAR(250))  NO SQL
BEGIN

if EXISTS(SELECT * FROM orders WHERE id = update_id )THEN

UPDATE orders SET name = _name,phone=_phone,district = _dis,village = _village,type=_type,price=_price WHERE id = update_id;

SELECT 'Updated' As  Message;

ELSE
INSERT INTO orders(name,phone,district,village,type,price) VALUES(_name,_phone,_dis,_village,_type,_price);

SELECT 'Registered' As Message;


END if;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `users_sp` (IN `update_id` INT, IN `_name` VARCHAR(250), IN `_username` VARCHAR(250), IN `_password` VARCHAR(250), IN `_phone` VARCHAR(250), IN `_gender` VARCHAR(250), IN `_img` VARCHAR(250), IN `_date` DATE)  NO SQL
BEGIN

if EXISTS(SELECT * FROM users WHERE id = update_id )THEN

UPDATE users SET name = _name,username = _username,password = PASSWORD(_password),gender=_gender,phone=_phone,image=_img,date=_date WHERE id = update_id;

SELECT 'Updated' As  Message;

ELSE
INSERT INTO users(name,username,password,phone,gender,image,date) VALUES(_name,_username,PASSWORD(_password),_phone,_gender,_img,_date);

SELECT 'Registered' As Message;


END if;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `district` varchar(250) NOT NULL,
  `village` varchar(250) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `gender` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `district`, `village`, `date`, `phone`, `email`, `gender`) VALUES
(24, 'oska', 'kaxxda', 'ma ogi', '2021-01-08 12:12:33', '6757656', 'test@gmail.com', 'Male'),
(31, 'faadumo', 'madiino', 'm', '2021-01-08 12:00:08', '86597', 'fadumo@gami;.com', 'Female'),
(37, '', '', '', '2021-01-08 16:00:44', '', '', '0'),
(38, 'najma', 'hodan', 'jhff', '2021-01-09 07:59:00', '867546', 'najma@gmail.com', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `gas`
--

CREATE TABLE `gas` (
  `id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `price` varchar(260) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gas`
--

INSERT INTO `gas` (`id`, `type`, `price`) VALUES
(3, '8 Kg', '11$'),
(5, '17 Kg', '21$'),
(6, '33 Kg', '35$');

-- --------------------------------------------------------

--
-- Table structure for table `mechanics`
--

CREATE TABLE `mechanics` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `address` varchar(250) NOT NULL,
  `salary` varchar(250) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mechanics`
--

INSERT INTO `mechanics` (`id`, `name`, `gender`, `phone`, `address`, `salary`, `date`) VALUES
(2, 'mohmamed', 'male', '8736453', 'hodan', '120', '2020-12-08'),
(3, 'faadumo', 'Female', '66666', 'hodan', '210', '2020-12-07'),
(6, 'Abdullahi ahmed maxamed', 'Male', '333333', 'karaan', '120$', '2020-12-09'),
(7, 'nasir', 'Male', '8676', 'sebiyaano', '210', '2020-12-01');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `district` varchar(250) NOT NULL,
  `village` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `price` varchar(250) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `phone`, `district`, `village`, `type`, `price`, `date`) VALUES
(32, 'halima', '65863', 'madina', 'mm', '43Kg', '', '2021-01-08 14:45:06'),
(33, 'halima', '65863', 'madina', 'mm', '43Kg', '', '2021-01-08 14:45:20'),
(37, 'fffff', '34535', 'kaxxda', 'mm', '100Kg', '140', '2021-01-08 15:01:20'),
(38, 'd', 'd', 'd', 'd', '8 Kg', '11$', '2021-01-08 16:10:37'),
(44, 'ww', '2323', 'q', 'q', '17 Kg', '', '2021-01-08 16:36:52'),
(51, 'last one', '6666', 'hodan', 'sebiyano', '8 Kg', '11$', '2021-01-08 16:58:28'),
(53, 'ali', '578567', 'xamar weyne', 'via roma', '33 Kg', '35$', '2021-01-08 17:16:59'),
(64, 'halima', '0615511852', 'hodan', 'seebiyano', '8 Kg', '11$', '2021-01-09 07:48:02'),
(65, 'zahuur', '2323', 'hodan', 'via roma', '8 Kg', '11$', '2021-01-09 07:53:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `username` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `gender`, `phone`, `image`, `date`) VALUES
(5, 'osman aba haji', 'oska', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Male', '343444443', '5.png', '2020-06-02'),
(11, 'oska', 'saanuu', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Male', '534645', '11.png', '2020-12-01'),
(17, 'mohamed ahmed', 'mohamed', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Male', '534645', '17.png', '2020-08-12'),
(19, ' ahmed ali', 'ali', '*FB36B91F1CE025D6674232D9306F5EA6374C76DF', 'Female', '534645', '19.png', '2020-08-12'),
(30, 'test gggg', 'test', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Female', 'dfgd', '30.png', '2021-01-05'),
(31, 'halima', 'halima', '*23AE809DDACAF96AF0FD78ED04B6A265E05AA257', 'Female', '67876', '31.png', '2021-01-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gas`
--
ALTER TABLE `gas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mechanics`
--
ALTER TABLE `mechanics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `gas`
--
ALTER TABLE `gas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mechanics`
--
ALTER TABLE `mechanics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
