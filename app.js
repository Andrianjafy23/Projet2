const express = require("express");
const app = express()
const mysql = require("mysql");
const myconnex = require("express-myconnection");
const connection = require("express-myconnection");

const db = {
  host : "localhost",
  user : "root",
  password : "",
  port : 3306 , 
  database : "Réservation"
};

//connection pour le base de données 
app.use(myconnex(mysql , db , 'pool'));

// extraction de données de formulaire
app.use(express.urlencoded({ extended : false}));

app.set("view engine" , "ejs");
app.set("views" , "laza");

app.use(express.static('public'));

// insertion des données base d
app.post("/laza" , (req, res) =>{
  let nom = req.body.Nom;
  let tel = req.body.tel;
  let cin = req.body.CIN;
  let email = req.body.email;
  let date = req.body.date;
  let heure = req.body.heure;
  let det = req.body.dest;
  
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO laza(id, Nom, Numph, NumCIN, email, date, heure, destination) VALUES (?, ?, ?, ?, ?, ?, ?, ?)" , 
        [null, nom, tel, cin, email, date, heure, det], (erreur) => {
             if(erreur){
              console.log(erreur);
             } else {
              res.redirect("/");
             }

        }
      )
    }
  })
})



app.get("/admin", (req, res) =>{
  req.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        "SELECT * FROM laza", 
        [], (erreur , resultat) => {
             if(erreur){
              console.log(erreur);
             } else {
              res.render("admin", { resultat });
             }

        }
      )
    }
  })
})


app.delete("/laza/:id", (req, res) => {
  let id = req.params.id;
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
    } else {
      connection.query(
        "DELETE FROM laza WHERE id = ?", [id], (erreur, resultat) =>{
          if (erreur) {
            console.log(erreur);
          } else {
            res.status(200).json({ routeRacine: "admin"});
          }
        }
      )
    }
  })
})
app.get("/", (req, res) => {
  res.render('index')
})

app.get("/admin", (req, res) => {
  res.render("admin")
})

app.get('/firstadmin' , (req , res )=>{
  res.render("admin1")
})

app.listen(3005 , ()=> {
  console.log("coucou");
});