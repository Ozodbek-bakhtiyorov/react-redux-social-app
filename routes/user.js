"use strict";
const {signinmiddleware} = require('../middleware');

const router = require('express').Router();
const {user} = require('../controllers');

router.get("/user/:id",signinmiddleware,user.getUser);

router.put('/follow',signinmiddleware,user.follow);
router.put('/unfollow',signinmiddleware,user.unfollow);
router.put('/updateavatar',signinmiddleware, user.updateavatar);
router.put('/editname',signinmiddleware,user.editname);

router.post('/searchuser', user.searchuser);
router.get('/allusers', user.getallusers);

module.exports = router;
