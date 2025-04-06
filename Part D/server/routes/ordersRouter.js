import { Router } from 'express';
const router = Router();
import ordersService from '../services/ordersService.js';

router.get('/user_id/:user_id', async (req, res) => {
    let results = await ordersService.getOrders(req.params.user_id);
    res.json(results);
});

export default router;