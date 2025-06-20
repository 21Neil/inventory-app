import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
  DROP TABLE IF EXISTS items;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS images;

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
  );
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    extension VARCHAR(50)
  );
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50),
    description  VARCHAR(255),
    quantity INTEGER,
    img_id INTEGER references images(id),
    category_id INTEGER references categories(id)
    );

  INSERT INTO categories (name)
  VALUES ('塔羅牌'), ('水晶球');
  
  INSERT INTO images (extension)
  VALUES ('jpeg'),
  ('jpeg');

  INSERT INTO items (name, description, quantity, img_id, category_id)
  VALUES ('史密斯偉特無邊塔羅', '經典的偉特塔羅，適合初學者', 3, 1, 1),
  ('白水晶球', '化煞 生財 擋煞', 5, 2, 2);
`;

const main = async () => {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
};

main();
