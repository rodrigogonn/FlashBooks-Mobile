import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from 'pages/Home';
import { Library } from 'pages/Library';
import { Reading } from 'pages/Reading';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Library">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen
          name="Reading"
          component={Reading}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
