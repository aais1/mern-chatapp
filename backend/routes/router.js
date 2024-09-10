const express=require('express');
const  router=express.Router();


router.get('/',(req,res)=>{
    console.log('router route called')
    res.json({ message: "router controller called" });
})


module.exports = router;