import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
  DROP TABLE IF EXISTS items;
  DROP TABLE IF EXISTS categories;
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50),
    description  VARCHAR(255),
    quantity INTEGER,
    thumbnail_url VARCHAR(255),
    img_url VARCHAR(255),
    category_id INTEGER
  );
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50)
  );
  INSERT INTO categories (name)
  VALUES ('塔羅牌'),
  ('水晶球');
  INSERT INTO items (name, description, quantity, thumbnail_url, img_url, category_id)
  VALUES ('史密斯偉特無邊塔羅', '經典的偉特塔羅，適合初學者', 3, '/images/smith-waite-borderless-thumbnail.jpeg', '/images/smith-waite-borderless.jpeg', 1),
  ('白水晶球', '化煞 生財 擋煞', 5, '/images/crystal-thumbnail.jpeg', '/images/crystal.jpeg', 2);
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
