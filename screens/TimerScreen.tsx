import React, {useContext, useEffect, useState} from 'react';
import {Container} from '../styles';
import {formatTimer} from '../utils/formatTimer';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';
import BaseIcon from 'react-native-vector-icons/Ionicons';
import {LocalNotification} from '../utils/notificationService';
import {TimerContext} from '../contexts/timerContext';
import TypesButtons from '../components/TypesButtons';

const Timer = styled.Text`
  font-size: 48.83px;
  color: #f0f5f9;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 32px;
  border-radius: 8px;
  background-color: #c9d6df;
`;

const ButtonText = styled.Text`
  color: #52616b;
  font-size: 16px;
  font-weight: 700;
`;

const View = styled.View`
  margin-top: 10px;
`;

const Icon = styled(BaseIcon)`
  margin-right: 8px;
  margin-top: 2px;
  font-size: 16px;
  color: #52616b;
`;

const TimerScreen = () => {
  const {
    pomodoro,
    longBreakInterval,
    pomodorosLeft,
    setPomodorosLeft,
    autoStart,
  } = useContext(TimerContext);

  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(pomodoro);
  const [type, setType] = useState('pomodoro');

  const decreasePomodorosLeft = () => {
    setPomodorosLeft(
      pomodorosLeft !== 0 ? pomodorosLeft - 1 : longBreakInterval,
    );
  };

  const handleDecreasePomodorosLeft = () => {
    if (type === 'pomodoro' || type === 'longBreak') {
      decreasePomodorosLeft();
    }

    setType((t) => {
      if (t === 'pomodoro' && pomodorosLeft === 1) {
        return 'longBreak';
      }
      if (t === 'pomodoro' && pomodorosLeft !== 1) {
        return 'shortBreak';
      }
      if (t === 'longBreak') {
        return 'pomodoro';
      }
      if (t === 'shortBreak') {
        return 'pomodoro';
      }
      return t;
    });

    handleLocalNotification();
  };

  const Types: {[key: string]: string} = {
    pomodoro: 'pomodoro',
    shortBreak: 'short break',
    longBreak: 'long break',
  };

  const handleLocalNotification = () => {
    return LocalNotification({
      title: 'Pomodoro Session Completed.',
      message: `The ${
        Types[type]
      } session has been completed. It's now time for ${
        type !== 'pomodoro' ? 'work' : 'a break'
      }!`,
    });
  };

  useEffect(() => {
    if (running) {
      return BackgroundTimer.runBackgroundTimer(() => {
        setTimer((t) => t - 450);
      }, 1000);
    }
    return BackgroundTimer.stopBackgroundTimer();
  }, [running]);

  useEffect(() => {
    if (timer === 0 && autoStart === false) {
      handleDecreasePomodorosLeft();
      setRunning(false);
      setTimer(pomodoro);
    }
    if (timer === 0 && autoStart === true) {
      handleDecreasePomodorosLeft();
      setTimer(pomodoro);
    }
  }, [timer]);

  return (
    <Container>
      <Timer>{formatTimer(timer)}</Timer>
      <View>
        <Button activeOpacity={0.8} onPress={() => setRunning(!running)}>
          <Icon name={!running ? 'md-play' : 'md-pause'} />
          <ButtonText>{!running ? 'Start Timer' : 'Stop Timer'}</ButtonText>
        </Button>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {[...Array(longBreakInterval)].map((e, i) => {
          if (pomodorosLeft > i) {
            return (
              <BaseIcon name="md-checkmark" size={25} color="#F0F5F9" key={i} />
            );
          }
          return (
            <BaseIcon
              name="md-checkmark"
              size={25}
              color="#F0F5F9"
              style={{opacity: 0.5}}
              key={i}
            />
          );
        })}
      </View>
      <TypesButtons
        buttonType={type}
        setType={(type) => {
          setType(type);
        }}
      />
    </Container>
  );
};

export default TimerScreen;
