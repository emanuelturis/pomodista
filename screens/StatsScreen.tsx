import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {ScrollableContainer} from '../styles';
import {IPomodoro} from '../types';
import db from '../utils/db';
import groupBy from 'lodash/groupBy';
import {useIsFocused} from '@react-navigation/native';
import {VictoryPie} from 'victory-native';
import styled from 'styled-components/native';
import {subDays, startOfDay} from 'date-fns';

const FETCH_POMODOROS = (startAt: string, endAt: string) =>
  new Promise<IPomodoro[]>((resolve) => {
    db.transaction((trx) => {
      trx.executeSql(
        'SELECT * FROM pomodoros WHERE ended_at >= ? AND ended_at <= ?;',
        [startAt, endAt],
        (_, result) => {
          const items = [...Array(result.rows.length)].map((_, i) =>
            result.rows.item(i),
          );
          resolve(items);
        },
      );
    });
  });

const Text = styled.Text`
  margin: 16px 12px;
`;

const StatsScreen = () => {
  const isFocused = useIsFocused();

  const [data, setData] = useState([{x: '', y: 0}]);
  const [startAt, setStartAt] = useState(startOfDay(new Date()).toISOString());
  const [endAt, setEndAt] = useState(new Date().toISOString());

  useEffect(() => {
    if (isFocused) {
      setStartAt(startOfDay(new Date()).toISOString());
      setEndAt(new Date().toISOString());
    }
  }, [isFocused]);

  useEffect(() => {
    FETCH_POMODOROS(startAt, endAt).then((results) => {
      const pomodoros = groupBy(results, (r) => r.name);
      const labels = Object.keys(pomodoros);

      setData(
        labels.map((label) => {
          const totalSeconds = pomodoros[label].reduce((a, b) => {
            return a + b.total_seconds;
          }, 0);

          return {
            x: label,
            y: Math.floor(totalSeconds / 60),
          };
        }),
      );
    });
  }, [startAt, endAt]);

  const TimePeriods = [
    {
      text: 'Today',
      active: startAt === startOfDay(new Date()).toISOString(),
      onPress: () => {
        setStartAt(startOfDay(new Date()).toISOString());
        setEndAt(new Date().toISOString());
      },
    },
    {
      text: 'Last 7 Days',
      active: startAt === subDays(startOfDay(new Date()), 7).toISOString(),
      onPress: () => {
        setStartAt(subDays(startOfDay(new Date()), 7).toISOString());
        setEndAt(new Date().toISOString());
      },
    },
    {
      text: 'Last 30 Days',
      active: startAt === subDays(startOfDay(new Date()), 30).toISOString(),
      onPress: () => {
        setStartAt(subDays(startOfDay(new Date()), 30).toISOString());
        setEndAt(new Date().toISOString());
      },
    },
  ];

  return (
    <ScrollableContainer
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {TimePeriods.map(({text, onPress, active}, index) => (
          <Text
            key={index}
            style={{color: '#fff', opacity: active ? 1 : 0.5}}
            onPress={onPress}>
            {text}
          </Text>
        ))}
      </View>
      <VictoryPie
        data={data}
        labelRadius={75}
        labels={({datum}) => `${datum.x}`}
        style={{
          labels: {
            fill: '#fff',
          },
        }}
      />
      <View>
        {data.map((value, index) => (
          <View
            key={index}
            style={{
              width: Dimensions.get('window').width - 32,
              marginTop: 8,
              borderRadius: 8,
              backgroundColor: '#F0F5F9',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{value.x}</Text>
            <Text
              style={{
                backgroundColor: '#C9D6DF',
                paddingTop: 2.5,
                paddingBottom: 2.5,
                paddingRight: 8,
                paddingLeft: 8,
                borderRadius: 8,
              }}>
              {value.y < 60 && `${value.y} Minutes`}
              {value.y === 60 && `${value.y / 60} Hour`}
              {value.y > 60 && `${value.y / 60} Hours`}
            </Text>
          </View>
        ))}
      </View>
    </ScrollableContainer>
  );
};

export default StatsScreen;
