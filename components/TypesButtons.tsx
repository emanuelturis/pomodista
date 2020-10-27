import React from 'react';
import styled from 'styled-components/native';

const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
`;

const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px;
  margin: 0px 4px;
  border-radius: 8px;
  background-color: #c9d6df;
`;

const ButtonText = styled.Text`
  color: #52616b;
`;

const Buttons = [
  {
    text: 'Pomodoro',
    type: 'pomodoro',
  },
  {
    text: 'Short Break',
    type: 'shortBreak',
  },
  {
    text: 'Long Break',
    type: 'longBreak',
  },
];

interface ITypesButtons {
  buttonType: string;
  setType: (type: string) => void;
}

const TypesButtons = ({buttonType, setType}: ITypesButtons) => {
  return (
    <ButtonsContainer>
      {Buttons.map(({text, type}) => (
        <Button
          disabled={type === buttonType ? true : false}
          style={{
            opacity: type === buttonType ? 0.5 : 1,
          }}
          activeOpacity={0.2}
          onPress={() => setType(type)}
          key={type}>
          <ButtonText>{text}</ButtonText>
        </Button>
      ))}
    </ButtonsContainer>
  );
};

export default TypesButtons;
