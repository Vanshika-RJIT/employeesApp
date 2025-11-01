import React from 'react';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();
// const myOptions = {
//   title: 'My Sweet Home',
//   headerTintColor: 'white',
//   headerStyle: {backgroundColor: '#6bc1ff'},
// };

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'My Sweet Home',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#6bc1ff'},
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          // options={{...myOptions, title: 'Profile'}}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="CreateEmployee"
          component={CreateEmployee}
          // options={{...myOptions, title: 'Create Employee'}}
          options={{title: 'Create Employee'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
