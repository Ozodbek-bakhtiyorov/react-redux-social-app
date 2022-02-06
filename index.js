require("dotenv").config({ path: "./config/config.env" });
//cors 
const cors = require('cors');
const express = require('express');

// imoport models
const {User} = require('./models');

// import routes
const {authRoutes, postRoutes} = require('./routes');

const app = express();

const corsOption = {
  origin:"*",
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOption));
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(require('./routes/user'));

//Start Server and connect to the MongoDB :)
require('./utils').start(app);