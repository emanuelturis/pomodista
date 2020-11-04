import React, {useState} from 'react';
import {View} from 'react-native';
import BaseSlider from '@react-native-community/slider';
import styled from 'styled-components/native';

const Text = styled.Text`
  color: #c9d6df;
  text-align: center;
  font-size: 16px;
`;

interface ISlider {
  text: string;
  defaultValue: number;
  updateValue: (value: number) => void;
  noDecimal?: boolean;
}

const Slider: React.FC<ISlider> = ({
  text,
  defaultValue,
  updateValue,
  noDecimal,
}) => {
  const [active, setActive] = useState<null | number>(null);

  const value = noDecimal ? defaultValue : defaultValue / 60;

  return (
    <View style={{marginTop: 32}}>
      <Text>{text}</Text>
      <BaseSlider
        style={{width: 250, marginTop: 8}}
        step={1}
        value={value}
        minimumValue={1}
        maximumValue={noDecimal ? 8 : 60}
        onValueChange={(value) => {
          setActive(value);
        }}
        onSlidingComplete={(value) => {
          setActive(null);
          updateValue(noDecimal ? value : value * 60);
        }}
        thumbTintColor="#C9D6DF"
        minimumTrackTintColor="#C9D6DF"
        maximumTrackTintColor="#C9D6DF"
      />
      <Text style={{marginTop: 8}}>
        {active || value} {noDecimal !== true && 'minutes'}
      </Text>
    </View>
  );
};

export default Slider;
