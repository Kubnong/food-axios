import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './src/screens/HomeScreen';
import RecipesDetailScreen from './src/screens/RecipesDetailScrren';
import FavoriteScreen from "C:/food-axios/src/screens/FavoriteScreen"

const Stack = createStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {backgroundColor: "#ff6f61"},
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {fontSize: 24 , fontWeight: 'bold'},
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="RecipesDetailScreen" component={RecipesDetailScreen}/>
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App
