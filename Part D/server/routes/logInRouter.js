import { Router } from 'express';
const router = Router();
import logInService from '../services/logInService';

router.get('/:telephone/password/:password', async (req, res) => {
    let results = await logInService.getLogIn(req.params.telephone, req.params.password);
    res.json(results);
});

export default router;
