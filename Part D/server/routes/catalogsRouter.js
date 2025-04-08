import { Router } from 'express';
const router = Router();
import catalogsService from '../services/catalogsService.js';

// get all catalogs
router.get('/', async (req, res) => {
    let results = await catalogsService.getCatalogs();
    res.json(results);
});

// get all products from a catalog
router.get('/getAllProducts/user_id/:user_id', async (req, res) => {
    let results = await catalogsService.getAllProducts(req.params.user_id);
    res.json(results);
});

export default router;
