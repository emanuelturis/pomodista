import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {Container} from '../styles';
import {IPomodoro} from '../types';
import db from '../utils/db';
import groupBy from 'lodash/groupBy';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

const FETCH_POMODOROS = () =>
  new Promise<IPomodoro[]>((resolve) => {
    db.transaction((trx) => {
      trx.executeSql(
        'SELECT * FROM pomodoros WHERE ended_at IS NOT NULL;',
        [],
        (_, result) => {
          const items = [...Array(result.rows.length)].map((_, i) =>
            result.rows.item(i),
          );
          resolve(items);
        },
      );
    });
  });

const StatsScreen = () => {
  const isFocused = useIsFocused();

  const [pomodoros, setPomodoros] = useState<{[key: string]: IPomodoro[]}>({
    '': [],
  });
  const [labels, setLabels] = useState(['']);

  useEffect(() => {
    if (isFocused) {
      FETCH_POMODOROS().then((results) => {
        const pomodoros = groupBy(results, (r) => r.name);
        const labels = Object.keys(pomodoros);

        setPomodoros(() => {
          setLabels(labels);
          return pomodoros;
        });
      });
    }
  }, [isFocused]);

  return (
    <Container>
      <BarChart
        data={{
          labels,
          datasets: [
            {
              data: labels.map((label) => {
                const totalSeconds = pomodoros[label].reduce((a, b) => {
                  if (!b.ended_at) {
                    return a + 0;
                  }

                  const seconds =
                    (new Date(b.ended_at).getTime() -
                      new Date(b.started_at).getTime()) /
                    1000;

                  return a + seconds;
                }, 0);

                return totalSeconds;
              }),
            },
          ],
        }}
        width={Dimensions.get('window').width - 32}
        height={256}
        yAxisLabel=""
        yAxisSuffix=" m"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#52616B',
          backgroundGradientFrom: '#52616B',
          backgroundGradientTo: '#52616B',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '8',
            strokeWidth: '2',
            stroke: '#52616B',
          },
        }}
      />
    </Container>
  );
};

export default StatsScreen;
