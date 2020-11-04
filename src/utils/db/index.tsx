import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~SQLite.sqlite',
  },
  () => {
    console.log('Connection to database established.');
  },
  (error) => {
    console.log('Error connecting to database: ' + error);
  },
);

export default db;
