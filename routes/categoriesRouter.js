import { Router } from 'express';
import {
  getCategoryView,
  getDeleteCategory,
  getNewCategoryView,
  postNewCategory,
} from '../controllers/categoriesController.js';

const categoriesRouter = Router();

categoriesRouter.get('/delete/:id', getDeleteCategory);
categoriesRouter.get('/new', getNewCategoryView);
categoriesRouter.post('/new', postNewCategory);
categoriesRouter.get('/:id', getCategoryView);

export default categoriesRouter;
