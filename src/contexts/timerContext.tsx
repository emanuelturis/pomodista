import React, {createContext, useEffect, useReducer} from 'react';
import {ISettings} from '../types';
import db from '../utils/db';

interface ITimerContext {
  pomodoro: number;
  setPomodoro: Function;
  shortBreak: number;
  setShortBreak: Function;
  longBreak: number;
  setLongBreak: Function;
  autoStart: boolean;
  setAutoStart: Function;
  longBreakInterval: number;
  setLongBreakInterval: Function;
  pomodorosLeft: number;
  setPomodorosLeft: Function;
  notify: boolean;
  setNotify: Function;
}

export const TimerContext = createContext<ITimerContext>({
  pomodoro: 1800,
  setPomodoro: () => null,
  shortBreak: 300,
  setShortBreak: () => null,
  longBreak: 1200,
  setLongBreak: () => null,
  autoStart: false,
  setAutoStart: () => null,
  longBreakInterval: 4,
  setLongBreakInterval: () => null,
  pomodorosLeft: 4,
  setPomodorosLeft: () => null,
  notify: true,
  setNotify: () => null,
});

interface State {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  longBreakInterval: number;
  pomodorosLeft: number;
  notify: boolean;
}

interface Action {
  type:
    | 'setPomodoro'
    | 'setShortBreak'
    | 'setLongBreak'
    | 'setAutoStart'
    | 'setLongBreakInterval'
    | 'setPomodorosLeft'
    | 'setNotify';
  payload: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setPomodoro':
      return {...state, pomodoro: action.payload};
    case 'setShortBreak':
      return {...state, shortBreak: action.payload};
    case 'setLongBreak':
      return {...state, longBreak: action.payload};
    case 'setAutoStart':
      return {...state, autoStart: action.payload};
    case 'setLongBreakInterval':
      return {...state, longBreakInterval: action.payload};
    case 'setPomodorosLeft':
      return {...state, pomodorosLeft: action.payload};
    case 'setNotify':
      return {...state, notify: action.payload};
    default:
      return state;
  }
};

const FETCH_SETTINGS = () =>
  new Promise<ISettings | null>((resolve) => {
    db.transaction((trx) => {
      trx.executeSql('SELECT * FROM settings;', [], (_, result) => {
        if (!result.rows.item(0)) {
          trx.executeSql(
            'INSERT INTO settings (pomodoro, short_break, long_break, auto_start, long_break_interval, pomodoros_left, notify) VALUES (1800, 300, 1200, 0, 4, 4, 1);',
            [],
          );
          return resolve(null);
        }
        return resolve(result.rows.item(0));
      });
    });
  });

const TimerContextProvider: React.FC = ({children}) => {
  const initialState = {
    pomodoro: 1800,
    shortBreak: 300,
    longBreak: 1200,
    autoStart: false,
    longBreakInterval: 4,
    pomodorosLeft: 4,
    notify: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    FETCH_SETTINGS().then((results) => {
      if (!results) {
        return;
      }
      dispatch({type: 'setPomodoro', payload: results.pomodoro});
      dispatch({type: 'setShortBreak', payload: results.short_break});
      dispatch({type: 'setLongBreak', payload: results.long_break});
      dispatch({
        type: 'setAutoStart',
        payload: results.auto_start === 1 ? true : false,
      });
      dispatch({
        type: 'setLongBreakInterval',
        payload: results.long_break_interval,
      });
      dispatch({type: 'setPomodorosLeft', payload: results.pomodoros_left});
      dispatch({
        type: 'setNotify',
        payload: results.notify === 1 ? true : false,
      });
    });
  }, []);

  return (
    <TimerContext.Provider
      value={{
        pomodoro: state.pomodoro,
        setPomodoro: (payload: number) => {
          dispatch({type: 'setPomodoro', payload});
          db.executeSql('UPDATE settings SET pomodoro = ?', [payload]);
        },
        shortBreak: state.shortBreak,
        setShortBreak: (payload: number) => {
          dispatch({type: 'setShortBreak', payload});
          db.executeSql('UPDATE settings SET short_break = ?', [payload]);
        },
        longBreak: state.longBreak,
        setLongBreak: (payload: number) => {
          dispatch({type: 'setLongBreak', payload});
          db.executeSql('UPDATE settings SET long_break = ?', [payload]);
        },
        autoStart: state.autoStart,
        setAutoStart: (payload: boolean) => {
          dispatch({type: 'setAutoStart', payload});
          db.executeSql('UPDATE settings SET auto_start = ?', [payload]);
        },
        longBreakInterval: state.longBreakInterval,
        setLongBreakInterval: (payload: number) => {
          dispatch({type: 'setLongBreakInterval', payload});
          db.executeSql('UPDATE settings SET long_break_interval = ?', [
            payload,
          ]);
        },
        pomodorosLeft: state.pomodorosLeft,
        setPomodorosLeft: (payload: number) => {
          dispatch({type: 'setPomodorosLeft', payload});
          db.executeSql('UPDATE settings SET pomodoros_left = ?', [payload]);
        },
        notify: state.notify,
        setNotify: (payload: boolean) => {
          dispatch({type: 'setNotify', payload});
          db.executeSql('UPDATE settings SET notify = ?', [payload]);
        },
      }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
