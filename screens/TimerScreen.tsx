import React, {useEffect, useState} from 'react';
import {Container} from '../styles';
import {formatTimer} from '../utils/formatTimer';
import styled from 'styled-components/native';
import BackgroundTimer from 'react-native-background-timer';
import BaseIcon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import {LocalNotification} from '../utils/notificationService';

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
  const [running, setRunning] = useState(false);
  const [timer, setTimer] = useState(1800);
  const [type, setType] = useState('pomodoro');

  useEffect(() => {
    if (running) {
      BackgroundTimer.runBackgroundTimer(() => {
        setTimer((t) => {
          if (t === 0) {
            LocalNotification({
              title: 'Pomodoro Session Completed.',
              message: `The ${type} session has been completed. It's now time for a break!`,
            });
          }
          return t - 1;
        });
      }, 1000);
    } else if (!running) {
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [running]);

  return (
    <Container>
      <Timer>{formatTimer(timer)}</Timer>
      <View>
        <Button activeOpacity={0.8} onPress={() => setRunning(!running)}>
          <Icon name={!running ? 'md-play' : 'md-pause'} />
          <ButtonText>{!running ? 'Start Timer' : 'Stop Timer'}</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default TimerScreen;
