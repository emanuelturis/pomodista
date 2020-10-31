import db from '.';
import {IPomodoro} from '../../types';

interface IInsertIntoPomodoros {
  pomodoro_id: string;
  name: string;
  started_at: string;
}

export const insertIntoPomodoros = ({
  pomodoro_id,
  name,
  started_at,
}: IInsertIntoPomodoros) =>
  db.transaction((trx) => {
    trx.executeSql(
      'INSERT INTO pomodoros (pomodoro_id, name, started_at) VALUES (?, ?, ?);',
      [pomodoro_id, name, started_at],
    );
  });
