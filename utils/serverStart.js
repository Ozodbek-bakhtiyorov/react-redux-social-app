require("colors");
const { connect } = require("mongoose");
const express = require('express');
const path = require('path');
const {MONGO_URI}= require('../config/keys');

module.exports = (app) => {
  connect(MONGO_URI, (err) =>
    err
      ? console.error(err)
      : console.log(`Mongo Connected Sucessfully :) ...`.green)
  );

  const PORT = process.env.PORT || 5000;

  // if(process.env.NODE_ENV==='production'){
  //   app.use(express.static('client/build'));
  //   app.get("*", (req, res)=>{
  //     res.sendFile(path.resolve(__dirname,"client","build", "index.html"))
  //   })
  // }
  app.listen(PORT, (err) =>
    err
      ? console.error(err)
      : console.log(
          `Server has been started on development in ${PORT} successfully :}...`
            .rainbow
        )
  );
};
