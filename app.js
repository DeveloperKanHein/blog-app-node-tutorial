const express = require('express');
const ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
const mongoose = require('mongoose');
const ApiRoute = require('./routes/api_routes');
const WebRoute = require('./routes/web_routes');
const AuthRoute = require('./routes/auth_routes');
const Middleware = require('./middlewares/middleware');
const UserController = require('./controller/user_controller');
const res_helper = require('./helper/res_helper');
const Blog = require('./models/blog');
const mail_helper = require('./helper/mail_helper');


const app = express();
var expressWs = require('express-ws')(app);

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blog");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'Abc123!@#',
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());

app.use('/api/v1/', Middleware.checkUser, ApiRoute);
app.use('/auth/', AuthRoute);
app.use('/web/', Middleware.checkWebUser, WebRoute);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/likes/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send({ likes: blog.likes});
});

// app.get('/blogs', async (req, res) => {
//     try{
//         const blogs = await Blog.find().populate('friend');
//         res_helper(res, blogs, "Blog data are collected successfully");
//     }catch(e){
//         mail_helper('developer.kanhein@gmail.com','Blog API ERROR', `${e}`);
//         res_helper(res, null, "Blog data has error", false);
//     }
// });

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

