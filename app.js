const express = require('express');
const ejs = require('ejs');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ApiRoute = require('./routes/api_routes');
const AuthRoute = require('./routes/auth_routes');
const Middleware = require('./middlewares/middleware');
const UserController = require('./controller/user_controller');

var cron = require('node-cron');
const MyClass = require('./singleton/MyClass');


const app = express();
var expressWs = require('express-ws')(app);

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blog");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/', Middleware.checkUser, ApiRoute);
app.use('/api/auth/v1/', AuthRoute);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

//Web Socket
app.ws('/chat', function(ws, req) {
    
    ws.on('message', function(data) {
        //Received
        ws.send(data);  
    });

    ws.on('close', (data) => {
        console.log("Active Recently");
        console.log("CLOSED");
    });


});

//Web Socket
app.ws('/noti', function(ws, req) {
    
    ws.on('message', function(data) {

        const jsonData = JSON.parse(data);
        
        ws.send(jsonData.message + " from " + jsonData.user);

    });
});

app.get('/upload', (req, res) => {
    res.render('upload.ejs');
});

app.post('/upload', UserController.profileUpload.single('profile'), (req, res) => {
    res.send("SUCCESS");
});

app.listen(8000, () => {
    console.log("Server started at PORT: 8000");
});

