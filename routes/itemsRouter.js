import { Router } from 'express';
import { getNewItemView, getUpdateView, postNewItem, postUpdateItem } from '../controllers/itemsController.js';
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const itemsRouter = Router();

itemsRouter.get('/new', getNewItemView);
itemsRouter.post('/new', upload.single('image'), postNewItem);
itemsRouter.get('/update/:id', getUpdateView)
itemsRouter.post('/update/:id', upload.single('image'), postUpdateItem)

export default itemsRouter;
