const express = require("express")
const router = express.Router(); //router do Express

//request e response 
router.get('/', (req, res) => {
    res.render('index') //faz o render e retorna a view Index.ejs
}) 


module.exports = router
