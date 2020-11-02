import db from '.';

export const createTable = async () => {
  db.transaction(
    (trx) => {
      trx.executeSql(
        'CREATE TABLE IF NOT EXISTS pomodoros (pomodoro_id VARCHAR(128) PRIMARY KEY, name VARCHAR(128) NOT NULL, ended_at VARCHAR(128) NOT NULL, total_seconds INTEGER NOT NULL);',
        [],
        (transaction) => console.log(transaction),
      );
    },
    (error) => console.log(error),
  );
};
