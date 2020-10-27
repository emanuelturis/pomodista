import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TimerScreen from './screens/TimerScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerContextProvider from './contexts/timerContext';

const Tab = createBottomTabNavigator();

const App = () => {
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
          </Tab.Navigator>
        </TimerContextProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
