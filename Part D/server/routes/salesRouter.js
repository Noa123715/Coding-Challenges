import { Router } from 'express';
const router = Router();
import salesService from '../services/salesService.js';

router.get('/', async (req, res) => {
    let results = await salesService.getSales();
    res.json(results);
});

export default router;
