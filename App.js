import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// add font
import { useFonts } from 'expo-font';
import { AdventPro_400Regular, AdventPro_700Bold } from '@expo-google-fonts/advent-pro';
import { Anton_400Regular } from '@expo-google-fonts/anton';
import { RobotoCondensed_400Regular, RobotoCondensed_700Bold} from '@expo-google-fonts/roboto-condensed';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// add navigation
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// add theme
import { ThemeProvider,  Icon  } from '@rneui/themed';
import { mainTheme } from './themes/mainTheme';

// add page
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ExploresScreen from './screens/ExploresScreen';
import ExploreDetailScreen from './screens/ExploreDetailScreen';

import RandomDetailScreen from './screens/RandomDetailScreen';
import LoginScreen from './screens/LoginScreen';
import OnboardingScreen from './screens/OnboardingScreen';



const Stack = createNativeStackNavigator();

// Create navigation reference
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export default function App() {
  // hook to load fonts
  let [fontsLoaded] = useFonts({
    AdventPro_400Regular, AdventPro_700Bold,
    Anton_400Regular,
    RobotoCondensed_400Regular, RobotoCondensed_700Bold
  });

  // add a conditional to show the ActivityIndicator until the font loads
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#84c680' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={mainTheme}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName="Onboarding"
            screenOptions={{
              headerTitleStyle: {
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',
                color:'#1e1e1e',
              },
              headerStyle: {
                backgroundColor: '#ffe175', 
              },
            }}
          >
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Explore"
              component={ExploresScreen}

              options={{
                title: 'Explore',
                headerRight: () => (
                  <Icon
                    style={{ color: '#440e62' }}
                    name='person-circle'
                    type='ionicon'
                    onPress={() => navigate('LoginScreen')}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="ExploreDetailScreen"
              component={ExploreDetailScreen}
              options={{ title: 'Back' }}
            />
      
            <Stack.Screen 
              name="RandomDetail" 
              component={RandomDetailScreen} 
            />
            {/* <Stack.Screen 
              name="FavoriteScreen" 
              component={FavoriteScreen} 
            /> */}
           <Stack.Screen 
              name="LoginScreen" 
              component={LoginScreen} 
              options={{ title: 'Login' }}
            />
           <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});
