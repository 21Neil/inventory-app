import sharp from 'sharp';
import { createItem, getAllCategories } from '../db/queries.js';

const getNewItemView = async (req, res) => {
  const categories = await getAllCategories();
  res.render('newItem', {
    title: 'New item',
    categories,
  });
};

const postNewItem = async (req, res) => {
  console.log(req.body)
  const getPath = name =>
    '/images/' + name + '.' + req.file.mimetype.split('/')[1];

  const imgPath = getPath(req.body.name);
  const thumbnailPath = getPath(req.body.name + '-thumbnail');

  await sharp(req.file.buffer)
    .resize(400, 400)
    .toFile('./' + imgPath);

  await sharp(req.file.buffer)
    .resize(100, 100)
    .toFile('./' + thumbnailPath);

  await createItem({
    ...req.body,
    img_url: imgPath,
    thumbnail_url: thumbnailPath,
  });
  res.redirect('/');
};

export { getNewItemView, postNewItem };
