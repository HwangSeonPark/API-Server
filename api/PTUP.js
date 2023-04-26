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

// ATA
router.get('/ATA', async (req,res)=>{
    const result = await PTUPController.ATA(req);
    res.json(result);
})

// GTA
router.get('/GTA', async (req,res)=>{
    const result = await PTUPController.GTA(req);
    res.json(result);
})

// AGTA_M
router.get('/AGTA_M', async (req,res)=>{
    const result = await PTUPController.AGTA_M(req);
    res.json(result);
})

// AGTA_F
router.get('/AGTA_F', async (req,res)=>{
    const result = await PTUPController.AGTA_F(req);
    res.json(result);
})

// AUR_Y
router.get('/AUR_Y', async (req,res)=>{
    const result = await PTUPController.AUR_Y(req);
    res.json(result);
})

// AUR_N
router.get('/AUR_N', async (req,res)=>{
    const result = await PTUPController.AUR_N(req);
    res.json(result);
})

module.exports = router;