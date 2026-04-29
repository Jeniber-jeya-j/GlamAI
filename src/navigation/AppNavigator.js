import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import UploadScreen from '../screens/UploadScreen';
import StyleScreen from '../screens/StyleScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Dashboardscreen from '../screens/Dashboardscreen';
import CategoryScreen from '../screens/CategoryScreen';
import PreviewScreen from '../screens/PreviewScreen';
import { StyleProvider } from "../context/Stylecontext";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <StyleProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="Style" component={StyleScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Dashboard" component={Dashboardscreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
    </StyleProvider>
  );

  
}