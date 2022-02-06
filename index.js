
const express = require('express');

// imoport models
const {User} = require('./models');

// import routes
const {authRoutes, postRoutes} = require('./routes');

const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(require('./routes/user'));

//Start Server and connect to the MongoDB :)
require('./utils').start(app);