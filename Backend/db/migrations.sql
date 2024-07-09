-- creating database

CREATE DATABASE IF NOT EXISTS bookstore;

USE `bookstore`;

CREATE TABLE IF NOT EXISTS `Genres` (
  `genre_id` INT NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`genre_id`)
);


CREATE TABLE IF NOT EXISTS `Authors` (
  `author_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `display_name` VARCHAR(255) NOT NULL,
  `biography` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `display_name` (`display_name`)
);


CREATE TABLE IF NOT EXISTS `Languages` (
  `language_id` INT NOT NULL AUTO_INCREMENT,
  `language_name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`language_id`),
  UNIQUE KEY `language_name` (`language_name`)
);


CREATE TABLE `Books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `publication_date` date NOT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `image_URL` varchar(255) DEFAULT NULL,
  `storage_section` varchar(255) NOT NULL,
  `storage_shelf` varchar(255) DEFAULT NULL,
  `is_offer_available` tinyint(1) NOT NULL DEFAULT '0',
  `author_id` int NOT NULL,
  `language_id` int NOT NULL,
  `genre_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`book_id`),
  KEY `author_id` (`author_id`),
  KEY `language_id` (`language_id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `Authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `Languages` (`language_id`) ON UPDATE CASCADE,
  CONSTRAINT `books_ibfk_3` FOREIGN KEY (`genre_id`) REFERENCES `Genres` (`genre_id`) ON UPDATE CASCADE
) 

 