import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TimerScreen from '../screens/TimerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerContextProvider from '../contexts/timerContext';
import {createTable} from '../utils/db/createTable';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createTable().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <TimerContextProvider>
          <Tab.Navigator>
            <Tab.Screen
              name="Timer"
              component={TimerScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="time" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="settings" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Stats"
              component={StatsScreen}
              options={{
                tabBarIcon: ({color, size}) => (
                  <Icon name="stats-chart" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </TimerContextProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
