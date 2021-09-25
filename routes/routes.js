const {Router}=require('express');
const { home, notFound } = require('../controllers/controllers');


const router=Router();

/* router.get('/', home) */

/* router.get('/', (req, res)=>{

})

router.get('/', (req, res)=>{

})

router.get('/', (req, res)=>{

}) */

router.get('*', notFound);

module.exports=router;