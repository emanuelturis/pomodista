import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TimerScreen from './screens/TimerScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerContextProvider from './contexts/timerContext';
import {createTable} from './utils/db/createTable';
import StatsScreen from './screens/StatsScreen';
import NotificatonContextProvider from './contexts/notificationContext';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <>
      <NavigationContainer>
        <TimerContextProvider>
          <NotificatonContextProvider>
            <Tab.Navigator>
              <Tab.Screen
                name="Timer"
                component={TimerScreen}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="md-time" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="md-settings" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                  tabBarIcon: ({color, size}) => (
                    <Icon name="md-stats-chart" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NotificatonContextProvider>
        </TimerContextProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
