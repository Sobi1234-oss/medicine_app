import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'ProductsDB.db',
  location: 'default',
});

const initializeDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price REAL,
  description TEXT,
  imageUri TEXT,
  fileUri TEXT
);
      )`,
      [],
      () => console.log('Products table ready'),
      error => console.log('Error creating table: ', error)
    );
  });
};

export {db, initializeDB};