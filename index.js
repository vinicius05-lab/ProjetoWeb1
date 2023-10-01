const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/connect");
const Subscribed = require("./database/subscribed");
const bcrypt = require("bcrypt");
const porta = 8088;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static("public"));

connection.
    authenticate().
    then(() => {
        console.log("Conectado com o banco de dados");
    }).catch((err) => {
        console.log("Erro: " + err);
    });

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/iasc", (req, res) => {
    res.render("iasc");
});

app.get("/estudo-dos-astros", (req, res) => {
    res.render("astros");
});

app.get("/projeto-foguetes", (req, res) => {
    res.render("foguetes");
});

app.get("/sobre-nos", (req, res) => {
    res.render("sobre");
});

app.get("/inscricao", (req, res) => {
    res.render("subscribed");
});

app.post("/cadastro", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    Subscribed.findOne({
        where: {email: email}
    }).then((subs) => {
        if(subs == undefined){
            Subscribed.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            });
        }else{
            res.send('<script>alert("O email já foi inscrito."); window.location.href = "/";</script>');
        }
    })
});

app.listen(porta, () => {
    console.log("Servidor rodando na porta: " + porta);
});