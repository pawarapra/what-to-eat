import React from 'react';
import { StyleSheet, View,  Image, TouchableOpacity } from 'react-native';
import { Text} from '@rneui/themed';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/icon.png')} style={styles.image} />
        <Text style={styles.title}>Welcome to What to Eat!</Text>
        <Text style={styles.subtitle}>What to Eat is an app that helps you find restaurants around you.</Text>
        <Text style={styles.featureTitle}>Key Features:</Text>
        <Text style={styles.feature}>1. Random Now: Generates a random restaurant within a 2 km radius of your current location.{'\n'}2. Explore: Browse a list of restaurants around you and apply filters to narrow down your choices.</Text>
        <Text style={styles.feature}></Text>
        <Text style={styles.featureTitle}>How to Use:</Text>
        <Text style={styles.step}>1. Tap "Get Started" to begin exploring restaurants.{'\n'}2. Choose either "Random Now" or "Explore" to find a restaurant.{'\n'}3. Enjoy your meal!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Landing')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff724c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 222,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffe175',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffe175',
  },
  feature: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'left',
  },
  step: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#ffe175',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
