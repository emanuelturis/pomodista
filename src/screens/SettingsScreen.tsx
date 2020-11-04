import React, {useContext} from 'react';
import {View} from 'react-native';
import Slider from '../components/Slider';
import Switch from '../components/Switch';
import {TimerContext} from '../contexts/timerContext';
import {ScrollableContainer} from '../styles';

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
    notify,
    setNotify,
  } = useContext(TimerContext);

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 250,
        }}>
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
      </View>
    </ScrollableContainer>
  );
};

export default SettingsScreen;
