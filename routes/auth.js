const router = require('express').Router();
const {authCtrl} = require('../controllers');
const {signinmiddleware} = require('../middleware');  

//auth controllers
const {signin,signup} = authCtrl;

router.post('/signin',signin);
router.post('/signup',signup);

module.exports = router;
