import { Router } from 'express';
const router = Router();
import ordersService from '../services/ordersService.js';

// get all orders for a user
router.get('/user_id/:user_id', async (req, res) => {
    let results = await ordersService.getOrders(req.params.user_id);
    res.json(results);
});

// update a status of an order
router.put('/valid', async (req, res) => {
    let results = await ordersService.validOrder(req.body.user_id, req.body.order_id, req.body.status);
    res.json(results);
});

// get order details
router.get('/orderDetails/user_id/:user_id/order_id/:order_id', async (req, res) => {
    let results = await ordersService.getOrderDetails(req.params.user_id, req.params.order_id);
    res.json(results);
});

// get all products for an order
router.get('/orderProducts/order_id/:order_id', async (req, res) => {
    let results = await ordersService.getOrderProducts(req.params.order_id);
    res.json(results);
});

router.get('/store_owner', async (req, res) => {
    let results = await ordersService.getOrdersStoreOwner();
    res.json(results);
});

export default router;