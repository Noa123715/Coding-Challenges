import { Router } from 'express';
const router = Router();
import logInService from '../services/logInService.js';

router.get('/username/:username/password/:password', async (req, res) => {
    let results = await logInService.getLogIn(req.params.username, req.params.password);
    res.json(results);
});

export default router;
