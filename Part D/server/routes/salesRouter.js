import { Router } from 'express';
const router = Router();
import salesService from '../services/salesService.js';

router.get('/getProducts', async (req, res) => {
    let results = await salesService.getProducts();
    res.json(results);
});

router.post('/endPurchase', async (req, res) => {
    let results = await salesService.endPurchase(req.body);
    res.json(results);
});

export default router;
