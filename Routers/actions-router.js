const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel.js');
const router = express.Router();

router.use((req,res,next) => {
    console.log('Action Router active')
    next();
})





module.exports = router;