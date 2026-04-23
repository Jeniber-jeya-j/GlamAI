import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(-1)).current;
  const navigation = useNavigation();
  // Swipe
  const swipeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entry
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Text reveal
    setTimeout(() => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 800);

    // Glow breathing
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Shimmer loop
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  // Swipe gesture
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: swipeX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationX > width * 0.5) {
        navigation.replace('Home');
      } else {
        Animated.spring(swipeX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={styles.container}>
      {/* Glow Background */}
      <Animated.View style={[styles.glow, { opacity: glowAnim }]} />
      <View style={styles.glowSecondary} />

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Animated.Text style={[styles.label, { opacity: textOpacity }]}>
          YOUR STYLE POWERED BY AI
        </Animated.Text>

        <Animated.View
          style={{
            transform: [{ scale: logoScale }, { translateY: floatAnim }],
            opacity: logoOpacity,
          }}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
        </Animated.View>
      </View>

      {/* Swipe Section */}
      <View style={styles.swipeWrapper}>
        <View style={styles.swipeContainer}>
          {/* Text */}
          <Text style={styles.swipeText}>Swipe to Style</Text>

          {/* Shimmer */}
          <Animated.View
            style={[
              styles.shimmer,
              { transform: [{ translateX: shimmerTranslate }] },
            ]}
          />

          {/* Swipe Button */}
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[
                styles.swipeButton,
                { transform: [{ translateX: swipeX }] },
              ]}
            >
              <LinearGradient
                colors={['#e8c08c', '#5d4118']}
                style={styles.swipeGradient}
              >
                <Ionicons name="flash" size={22} color="#1a0d28" />
              </LinearGradient>
            </Animated.View>
          </PanGestureHandler>
        </View>

        {/* Glass Sign In */}
        <Text
          style={styles.signIn}
          onPress={() => navigation.navigate('SignIn')}
        >
          Sign In
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a0d28',
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerContent: {
    position: 'absolute',
    top: '25%',
    alignItems: 'center',
  },

  label: {
    color: '#f9abff',
    fontSize: 10,
    letterSpacing: 4,
    marginBottom: 30,
  },

  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },

  logoWrapper: {
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  glow: {
    position: 'absolute',
    width: 450,
    height: 450,
    borderRadius: 300,
    backgroundColor: 'rgba(87,0,102,0.5)',
  },

  glowSecondary: {
    position: 'absolute',
    bottom: 0,
    width: 350,
    height: 350,
    borderRadius: 200,
    backgroundColor: 'rgba(232,192,140,0.1)',
  },

  swipeWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '90%',
  },

  swipeContainer: {
    height: 60,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 15,
  },

  swipeText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#e8c08c',
    fontSize: 14,
    letterSpacing: 1,
  },

  swipeButton: {
    width: 60,
    height: 60,
    borderRadius: 40,
    overflow: 'hidden',
  },

  swipeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  arrow: {
    color: '#1a0d28',
    fontWeight: 'bold',
  },

  shimmer: {
    position: 'absolute',
    width: 100,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },

  signIn: {
    textAlign: 'center',
    color: '#e8c08c',
    opacity: 0.7,
  },
});