import { Router } from 'express'
import { getCategoryView } from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/:id', getCategoryView)

export default categoriesRouter
