import db from '.';

export const createTable = () =>
  new Promise((resolve) =>
    db.transaction(
      (trx) => {
        trx.executeSql(
          'CREATE TABLE IF NOT EXISTS pomodoros (pomodoro_id VARCHAR(128) PRIMARY KEY, name VARCHAR(128) NOT NULL, ended_at VARCHAR(128) NOT NULL, total_seconds INTEGER NOT NULL);',
          [],
          (transaction) => console.log(transaction),
        );
        trx.executeSql(
          'CREATE TABLE IF NOT EXISTS settings (pomodoro INTEGER, short_break INTEGER, long_break INTEGER, auto_start INTEGER, long_break_interval INTEGER, pomodoros_left INTEGER, notify INTEGER);',
          [],
          (transaction) => console.log(transaction),
        );
      },
      (error) => console.log(error),
      () => resolve(),
    ),
  );
