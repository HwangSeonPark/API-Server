const router = require('express').Router();
const PTUPController = require('./_controller/PTUPController');


// create
router.post("/", async (req, res) => {
    const result = await PTUPController.create(req);
    res.json(result);
    });


// list
router.get('/', async (req,res)=>{
    const result = await PTUPController.list(req);
    res.json(result);
})


// update
router.put('/:id', async (req,res)=>{
    const result = await PTUPController.update(req);
    res.json(result);
})

// delete
router.delete('/:id', async (req,res)=>{
    const result = await PTUPController.delete(req);
    res.json(result);
})

module.exports = router;