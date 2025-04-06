import { Router } from 'express';
const router = Router();
import catalogsService from '../services/catalogsService.js';

router.get('/', async (req, res) => {
    let results = await catalogsService.getCatalogs();
    res.json(results);
});

export default router;
