import db from './connection.js';

async function test() {
  try {
    const [rows] = await db.execute('SELECT 1');

    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

test();