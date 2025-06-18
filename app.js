import express from 'express';
import indexRouter from './routes/indexRouter.js';
import itemRouter from './routes/itemRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/images', express.static('images'));
app.use('/items', itemRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
