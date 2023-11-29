import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from './components/screens/FeedScreen';
import AddPostScreen from './components/screens/AddPostScreen';


const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
