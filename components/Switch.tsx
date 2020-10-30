import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const BaseSwitch = styled.Switch``;

const Text = styled.Text`
  color: #c9d6df;
  text-align: center;
  font-size: 16px;
`;

interface ISwitch {
  defaultValue: boolean;
  updateValue: (value: boolean) => void;
  text: string;
}

const Switch: React.FC<ISwitch> = ({defaultValue, updateValue, text}) => {
  return (
    <View style={{marginTop: 32}}>
      <Text>{text}</Text>
      <BaseSwitch
        style={{alignSelf: 'center', marginTop: 8}}
        value={defaultValue}
        onValueChange={(value) => updateValue(value)}
      />
    </View>
  );
};

export default Switch;
