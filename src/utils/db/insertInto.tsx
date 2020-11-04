import db from '.';

interface IInsertIntoPomodoros {
  pomodoro_id: string;
  name: string;
  ended_at: string;
  total_seconds: number;
}

export const insertIntoPomodoros = ({
  pomodoro_id,
  name,
  ended_at,
  total_seconds,
}: IInsertIntoPomodoros) =>
  db.transaction((trx) => {
    trx.executeSql(
      'INSERT INTO pomodoros (pomodoro_id, name, ended_at, total_seconds) VALUES (?, ?, ?, ?);',
      [pomodoro_id, name, ended_at, total_seconds],
    );
  });
