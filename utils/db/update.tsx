import db from '.';

interface IUpdatePomodoro {
  pomodoro_id: string;
  ended_at: string;
}

export const updatePomodoro = ({pomodoro_id, ended_at}: IUpdatePomodoro) =>
  db.transaction((trx) => {
    trx.executeSql('UPDATE pomodoros SET ended_at = ? WHERE pomodoro_id = ?', [
      ended_at,
      pomodoro_id,
    ]);
  });
