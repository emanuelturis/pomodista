import React, {createContext, useReducer} from 'react';

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
});

interface State {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  longBreakInterval: number;
  pomodorosLeft: number;
}

interface Action {
  type:
    | 'setPomodoro'
    | 'setShortBreak'
    | 'setLongBreak'
    | 'setAutoStart'
    | 'setLongBreakInterval'
    | 'setPomodorosLeft';
  payload: any;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setPomodorosLeft':
      return {...state, pomodorosLeft: action.payload};
    default:
      return state;
  }
};

const TimerContextProvider: React.FC = ({children}) => {
  const initialState = {
    pomodoro: 1800,
    shortBreak: 300,
    longBreak: 1200,
    autoStart: false,
    longBreakInterval: 4,
    pomodorosLeft: 4,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider
      value={{
        pomodoro: state.pomodoro,
        setPomodoro: (payload: number) =>
          dispatch({type: 'setPomodoro', payload}),
        shortBreak: state.shortBreak,
        setShortBreak: (payload: number) =>
          dispatch({type: 'setShortBreak', payload}),
        longBreak: state.longBreak,
        setLongBreak: (payload: number) =>
          dispatch({type: 'setLongBreak', payload}),
        autoStart: state.autoStart,
        setAutoStart: (payload: number) =>
          dispatch({type: 'setAutoStart', payload}),
        longBreakInterval: state.longBreakInterval,
        setLongBreakInterval: (payload: number) =>
          dispatch({type: 'setLongBreakInterval', payload}),
        pomodorosLeft: state.pomodorosLeft,
        setPomodorosLeft: (payload: number) =>
          dispatch({type: 'setPomodorosLeft', payload}),
      }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;
