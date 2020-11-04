export interface IPomodoro {
  pomodoro_id: string;
  name: string;
  ended_at: string;
  total_seconds: number;
}

export interface ISettings {
  pomodoro: number;
  short_break: number;
  long_break: number;
  auto_start: number;
  long_break_interval: number;
  pomodoros_left: number;
  notify: number;
}
