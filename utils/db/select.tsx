import db from '.';

export const selectFrom = () => {
  db.transaction((trx) => {
    trx.executeSql('SELECT * FROM pomodoros;', [], (transaction, results) => {
      [...Array(results.rows.length)].map((_, i) => {
        const item = results.rows.item(i);
        console.log(item);
      });
    });
  });
};
