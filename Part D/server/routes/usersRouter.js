import { Router } from 'express';
const router = Router();
import usersService from '../services/usersService.js';

router.get('/username/:username/password/:password', async (req, res) => {
    let results = await usersService.getLogIn(req.params.username, req.params.password);
    res.json(results);
});

router.post('/newUser', async (req, res) => {
    let results = await usersService.postSignUp(req.body);
    res.json(results);
});

router.get('/getSuppliers', async (req, res) => {
    let results = await usersService.getSuppliers();
    res.json(results);
});

export default router;
