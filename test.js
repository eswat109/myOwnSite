const port = 3000;
const host = '127.0.0.1'
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const nodemailer = require('nodemailer');

//let testEmailAccount = nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'CodeformMail@gmail.com',
        pass: 'code12321'
    }
});

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
//app.use('/public', express.static('public'));

app.get("/", (req, res) => {
    //res.sendFile(__dirname + '/public/main.html')
    res.render('main', {});
});

app.get("/news", (req, res) => {
    res.render('news', {});
});

app.get("/codeform", (req, res) => {
    res.render('main', {});
});

app.get('/order', (req, res) => {
    res.render('order', {});
});

app.post('/order', urlencodedParser,  (req, res) =>{
    if(!req.body) return res.sendStatus(400);

    transporter.sendMail({
        from: '"MagnaCorp" <CodeformMail@gmail.com>',
        to: req.body.email,
        subject: "Thank you for order Codeform!",
        html: `Dear <strong>${req.body.firstName} ${req.body.lastName}</strong>
<br>You ordered our product from the site <a href='http://127.0.0.1:3000'>CodeForm.com</a>
<br>Please throw your 300 dollars into the screen and we will send you the Codeform.`,
    });

    res.sendFile(__dirname + '/public/success.html');
})

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));