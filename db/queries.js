import pool from './pool.js';

const itemImgUrlTable =
  'SELECT items.id, items.name, items.description, items.quantity, items.img_id, items.category_id, img.extension, ' +
  "'/images/' || img.id || '.' || img.extension as img_url, " +
  "'/images/' || img.id || '-thumbnail.' || img.extension as thumbnail_url " +
  'FROM items JOIN images img ON img_id = img.id';

const getAllItems = async () => {
  const result = await pool.query(itemImgUrlTable);
  return result.rows;
};

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

const createItem = async ({
  name,
  description,
  quantity,
  img_id,
  category_id,
}) => {
  const result = await pool.query(
    'INSERT INTO items (name, description, quantity, img_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, description, quantity, img_id, category_id]
  );

  return result.rows[0].id;
};

const getItemByCategory = async id => {
  const result = await pool.query(
    'SELECT * FROM items WHERE category_id = $1',
    [id]
  );
  return result.rows;
};

const getCategoryById = async id => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ]);
  return result.rows;
};

const getItemById = async id => {
  const result = await pool.query(itemImgUrlTable + ' WHERE items.id = $1', [
    id,
  ]);
  return result.rows;
};

const updateItemById = async (
  id,
  { name, description, quantity, category_id }
) => {
  await pool.query(
    'UPDATE items SET name=$1, description=$2, quantity=$3, category_id=$4 WHERE id=$5',
    [name, description, quantity, category_id, id]
  );
};

const createImg = async extension => {
  const result = await pool.query(
    'INSERT INTO images (extension) VALUES ($1) RETURNING id',
    [extension]
  );

  return result.rows[0].id;
};

const updateImgById = async (id, extension) => {
  await pool.query('UPDATE images SET extension=$1 WHERE id=$2', [
    extension,
    id,
  ]);
};

export {
  getAllItems,
  getAllCategories,
  createItem,
  getItemByCategory,
  getCategoryById,
  getItemById,
  updateItemById,
  createImg,
  updateImgById
};
