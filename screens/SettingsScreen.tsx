import React, {useContext} from 'react';
import {Text} from 'react-native';
import Slider from '../components/Slider';
import {TimerContext} from '../contexts/timerContext';
import {Container} from '../styles';

const SettingsScreen = () => {
  const {
    pomodoro,
    setPomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    longBreakInterval,
    setLongBreakInterval,
  } = useContext(TimerContext);
  return (
    <Container>
      <Slider
        text="Pomodoro"
        defaultValue={pomodoro}
        updateValue={(value) => setPomodoro(value)}
      />
      <Slider
        text="Short Break"
        defaultValue={shortBreak}
        updateValue={(value) => setShortBreak(value)}
      />
      <Slider
        text="Long Break"
        defaultValue={longBreak}
        updateValue={(value) => setLongBreak(value)}
      />
      <Slider
        text="Long Break Interval"
        defaultValue={longBreakInterval}
        updateValue={(value) => setLongBreakInterval(value)}
        noDecimal
      />
      {/* Add Auto Start Toggle */}
    </Container>
  );
};

export default SettingsScreen;
