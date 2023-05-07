import { NavigationContainer } from "@react-navigation/native";
import  MoviesMainScreen from "./screens/MoviesMainScreen/MoviesMainSceen.js";
import MoviesDetailScreen from "./screens/MoviesDetailScreen/MoviesDetailScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MoviesMainScreen" component={MoviesMainScreen} options={{title: 'Movies'}} />
        <Stack.Screen name="MoviesDetailScreen" component={MoviesDetailScreen} initialParams={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
