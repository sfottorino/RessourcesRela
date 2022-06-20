const express = require('express')
const app = express();
const port = 5000;
var mysql = require("mysql");

let cors = require("cors");
app.use(cors());

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
// });

// var sql = "CREATE DATABASE IF NOT EXISTS ressources_relationnelle;";
// connection.query(sql, function () {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ressources_relationnelle",
  });

  // TODO add error case 

  // sql = "CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, nom VARCHAR(100), prenom VARCHAR(100), email VARCHAR(255), password VARCHAR(255));";
  // connection.query(sql);
  // var sql = "SELECT nom FROM user WHERE nom = 'admin'";
  // connection.query(sql, function (err, row) {
  //   if (row && row.length === 0) {
  //     sql = "INSERT INTO users (nom, prenom, email, password)  VALUES  ('admin', 'admin', 'admin@admin.admin', SHA1('admin'))";
  //     connection.query(sql);
  //   }
  // });
  // sql = "CREATE TABLE IF NOT EXISTS resource (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), upload_date DATETIME, deletion_date DATETIME, author VARCHAR(255), type VARCHAR(255), short_desription VARCHAR(255), contenu LONGTEXT);";
  // connection.query(sql);
  // sql = "CREATE TABLE IF NOT EXISTS comment (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, content VARCHAR(255), createdAt DATETIME, updatedAt DATETIME, deletedAt DATETIME, idResource INT, idUser INT, FOREIGN KEY (idResource) REFERENCES resource(id), FOREIGN KEY (idUser) REFERENCES user(id));";
  // connection.query(sql);

  // sql = "CREATE TABLE IF NOT EXISTS role (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, name VARCHAR(255), description VARCHAR(255));";
  // connection.query(sql);
  // sql = "CREATE TABLE IF NOT EXISTS user_has_role (userId INT NOT NULL, roleId INT NOT NULL, FOREIGN KEY (userId) REFERENCES user(id), FOREIGN KEY (roleId) REFERENCES role(id));";
  // connection.query(sql);
// });

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// user list
app.get('/users', (req, res) => {
  var sql = "SELECT lastname, firstname, email FROM user";
  connection.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

// new user
app.get('/users/insert/:lastname/:fisrtname/:email/:password', (req, res) => {
  console.log(req.params);
  var sql = "INSERT INTO user (lastname, firstname, email, created_date, password)  VALUES  ('"+req.params.lastname+"', '"+req.params.fisrtname+"', '"+req.params.email+"', NOW(), SHA1('"+req.params.password+"'))";
  connection.query(sql, function (err) {
    sql = "SELECT lastname, firstname, email FROM user where email='"+req.params.email+"' and password=SHA1('"+req.params.password+"')";
    connection.query(sql, function (err, result) {
      console.log(result);
      res.send(result);
    });
  });
});

// connect user
app.get('/users/connect/:email/:password', (req, res) => {
  console.log(req.params)
  var sql = "SELECT lastname, firstname, email FROM user where email='"+req.params.email+"' and password=SHA1('"+req.params.password+"')";
  connection.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.get('/resource/insert/:name/:author/:type/:short_desription/:contenu', (req, res) => {
  console.log(req.params)
  var sql = "INSERT INTO user (name, upload_date, author, type, short_desription, contenu)  VALUES  ('"+req.params.nom+"', '"+req.params.prenom+"', '"+req.params.email+"', NOW(), SHA1('"+req.params.password+"'))";
  connection.query(sql, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// const express = require("express");
// const app = express();
  
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
  
// const PORT = process.env.PORT || 8080;
  
// app.listen(PORT, console.log(`Server started on port ${PORT}`));