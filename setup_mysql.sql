-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS dragons;
CREATE USER IF NOT EXISTS 'db_admin'@'localhost' IDENTIFIED BY '123123';
GRANT ALL PRIVILEGES ON `dragons`.* TO 'db_admin'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'db_admin'@'localhost';
FLUSH PRIVILEGES;
