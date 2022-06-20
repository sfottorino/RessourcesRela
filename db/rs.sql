CREATE DATABASE IF NOT EXISTS ressources_relationnelle;


CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(100), prenom VARCHAR(100), email VARCHAR(255), password VARCHAR(255));
CREATE TABLE IF NOT EXISTS resource (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), upload_date DATETIME, deletion_date DATETIME, author VARCHAR(255), type VARCHAR(255), short_desription VARCHAR(255), contenu LONGTEXT);
CREATE TABLE IF NOT EXISTS comment (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, content VARCHAR(255), createdAt DATETIME, updatedAt DATETIME, deletedAt DATETIME, idResource INT, idUser INT, FOREIGN KEY (idResource) REFERENCES resource(id), FOREIGN KEY (idUser) REFERENCES user(id));
CREATE TABLE IF NOT EXISTS role (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255));
CREATE TABLE IF NOT EXISTS user_has_role (userId INT NOT NULL, roleId INT NOT NULL, FOREIGN KEY (userId) REFERENCES user(id), FOREIGN KEY (roleId) REFERENCES role(id));

INSERT INTO users (nom, prenom, email, password)  VALUES  ('admin', 'admin', 'admin@admin.admin', SHA1('admin'))