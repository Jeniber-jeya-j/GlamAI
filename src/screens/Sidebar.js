import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  SafeAreaView 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Add screen names for navigation
const menuItems = [
  { name: 'Home', icon: 'home', type: 'MI', screen: 'Home' },
  { name: 'Profile', icon: 'person', type: 'MI', screen: 'Profile' },
  { name: 'Upload', icon: 'cloud-upload', type: 'MI', screen: 'Upload' },
  { name: 'Studio', icon: 'auto-fix-high', type: 'MI', screen: 'Studio' },
  { name: 'Closet', icon: 'wardrobe-outline', type: 'MCI', screen: 'Closet' },
];

const Sidebar = ({ isVisible, onClose, navigation }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      {/* Tap background to close */}
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose} 
      />

      {/* Glass Panel */}
      <BlurView intensity={100} tint="dark" style={styles.drawerContainer}>
        <SafeAreaView style={styles.safeArea}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>GlamAI</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={28} color="#E0C097" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Menu */}
<View style={styles.menuList}>
  {menuItems.map((item, idx) => (
    <TouchableOpacity
      key={idx}
      style={styles.navItem}
      onPress={() => {
        // Only navigate for your defined 5 screens
        if (['Home', 'Profile', 'Upload', 'Studio', 'Closet'].includes(item.screen)) {
          navigation.navigate(item.screen);
            onClose(); // Close sidebar after navigation
        }
      }}
    >
      <View style={styles.iconContainer}>
        {item.type === 'MI' ? (
          <MaterialIcons name={item.icon} size={24} color="#E0C097" />
        ) : (
          <MaterialCommunityIcons name={item.icon} size={24} color="#E0C097" />
        )}
      </View>
      <Text style={styles.navText}>{item.name}</Text>
    </TouchableOpacity>
  ))}
</View>

          {/* Footer Sign Out */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.signOutBtn}
              onPress={() => {
                onClose();
                navigation.navigate('Splash'); // Navigate to SplashScreen
              }}
            >
              <BlurView intensity={40} tint="light" style={styles.signOutGlass}>
                <MaterialIcons name="logout" size={22} color="#FF9E9E" />
                <Text style={styles.signOutText}>Sign Out</Text>
              </BlurView>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContainer: {
    width: width * 0.75,
    height: height,
    borderRightWidth: 1,
    borderRightColor: 'rgba(224, 192, 151, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 0 },
    backgroundColor: 'rgba(61,46,76,0.2)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    marginTop: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0C097',
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(224, 192, 151, 0.2)',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  menuList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  navText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 15,
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    marginBottom: 30,
  },
  signOutBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  signOutGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
  },
  signOutText: {
    color: '#FF9E9E',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Sidebar;