import { Router } from 'express';
const router = Router();
import salesService from '../services/salesService.js';

// get all products
router.get('/getProducts', async (req, res) => {
    let results = await salesService.getProducts();
    res.json(results);
});

// automating the orders
router.post('/endPurchase', async (req, res) => {
    let results = await salesService.endPurchase(req.body);
    res.json(results);
});

export default router;
