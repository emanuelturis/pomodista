import React, {useContext} from 'react';
import {Text} from 'react-native';
import {not} from 'react-native-reanimated';
import Slider from '../components/Slider';
import Switch from '../components/Switch';
import {NotificationContext} from '../contexts/notificationContext';
import {TimerContext} from '../contexts/timerContext';
import {Container, ScrollableContainer} from '../styles';

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
    autoStart,
    setAutoStart,
  } = useContext(TimerContext);

  const {notify, setNotify} = useContext(NotificationContext);

  return (
    <ScrollableContainer
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
      }}>
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
      <Switch
        defaultValue={autoStart}
        updateValue={(value) => setAutoStart(value)}
        text="Auto Start"
      />
      <Switch
        defaultValue={notify}
        updateValue={(value) => setNotify(value)}
        text="Notifications"
      />
    </ScrollableContainer>
  );
};

export default SettingsScreen;
