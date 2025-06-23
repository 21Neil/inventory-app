import { Router } from 'express';
import {
  postDeleteItem,
  getNewItemView,
  getUpdateView,
  postNewItem,
  postUpdateItem,
} from '../controllers/itemsController.js';
import multer from 'multer';
import requirePassword from '../middleware/requirePassword.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const itemsRouter = Router();

itemsRouter.get('/new', getNewItemView);
itemsRouter.post('/new', upload.single('image'), postNewItem);
itemsRouter.get('/update/:id', getUpdateView);
itemsRouter.post('/update/:id', upload.single('image'), requirePassword, postUpdateItem);
itemsRouter.post('/delete/:id', requirePassword, postDeleteItem);

export default itemsRouter;
