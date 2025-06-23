import sharp from 'sharp';
import {
  createImg,
  createItem,
  deleteImg,
  deleteItem,
  getAllCategories,
  getItemById,
  updateImgById,
  updateItemById,
} from '../db/queries.js';
import fs from 'fs';

const getNewItemView = async (req, res) => {
  const categories = await getAllCategories();
  res.render('itemForm', {
    title: 'New item',
    categories,
  });
};

const getPath = (id, req) =>
  './images/' + id + '.' + req.file.mimetype.split('/')[1];

const uploadImg = async req => {
  const imgId = await createImg(req.file.mimetype.split('/')[1]);
  const imgPath = getPath(imgId, req);
  const thumbnailPath = getPath(imgId + '-thumbnail', req);

  await sharp(req.file.buffer).resize(400, 400).toFile(imgPath);

  await sharp(req.file.buffer).resize(100, 100).toFile(thumbnailPath);

  return imgId;
};

const updateImg = async (id, req) => {
  await updateImgById(id, req.file.mimetype.split('/')[1]);
  const imgPath = getPath(id, req);
  const thumbnailPath = getPath(id + '-thumbnail', req);

  await sharp(req.file.buffer).resize(400, 400).toFile(imgPath);

  await sharp(req.file.buffer).resize(100, 100).toFile(thumbnailPath);
};

const postNewItem = async (req, res) => {
  const imgId = await uploadImg(req);
  await createItem({
    ...req.body,
    img_id: imgId,
  });

  res.redirect('/');
};

const getUpdateView = async (req, res) => {
  const categories = await getAllCategories();
  const itemArr = await getItemById(req.params.id);
  const item = itemArr[0];
  const { error } = req.query;

  res.render('itemForm', {
    title: 'Update item',
    categories,
    item,
    error,
  });
};

const postUpdateItem = async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    const image = (await getItemById(id))[0];
    await updateImg(image.img_id, req);
  }

  await updateItemById(id, {
    ...req.body,
  });

  res.redirect('/');
};

const postDeleteItem = async (req, res) => {
  const { id } = req.params;
  const image = (await getItemById(id))[0];

  const getPath = (id, extension) => './images/' + id + '.' + extension;

  const imgUrl = getPath(image.img_id, image.extension);
  const thumbnailUrl = getPath(image.img_id + '-thumbnail', image.extension);

  const deleteLocalImg = imgId => {
    fs.unlink(imgUrl, () => {});
    fs.unlink(thumbnailUrl, () => {});
  };

  deleteLocalImg(image.img_id);

  await deleteItem(id);
  await deleteImg(id);
  res.redirect('/');
};

export {
  getNewItemView,
  postNewItem,
  getUpdateView,
  postUpdateItem,
  postDeleteItem,
};
