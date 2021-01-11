const express = require('express');
const router = express.Router();
const pets = require('../../Pets');
const path = require('path');
var cors = require('cors')

// enable cors middleware on all routes
router.use(cors())

//get all pets' data
router.get('/',(req,res)=>{
    res.json(pets)
});


//get a single pet's data
router.get('/:id',(req,res)=>{
    const found = pets.some(pet=>pet.id===parseInt(req.params.id));
    if(found){
        res.json(pets.filter(pet=>pet.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg:`No pet with the id of ${req.params.id}`})
    }
})

router.get('/picture/:id',(req,res)=>{
    const found = pets.some(pet=>pet.id===parseInt(req.params.id));
    if(found){
        const petData=pets.filter(pet=>pet.id === parseInt(req.params.id))
        const petName=petData[0].name
        // picFolder refers to the backEnd folder
        const picFolder=path.resolve(path.resolve(__dirname,'..'),'..')
        res.sendFile(path.join(picFolder,'petPics',`${petName}.jpg`))
    }else{
        res.status(400).json({msg:`No pet with the id of ${req.params.id}`})
    }
})



module.exports = router;