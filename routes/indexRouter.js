import { Router } from 'express'
import { getIndexView } from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', getIndexView)

export default indexRouter
