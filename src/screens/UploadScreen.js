import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView, 
  StatusBar,
  Alert // Warning message kaatatha
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; // Image Picker Import
import Sidebar from '../screens/Sidebar';

const { width } = Dimensions.get('window');
export default function UploadScreen({ navigation, route }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { selectedOptions } = route.params || {};
  const [selectedImage, setSelectedImage] = useState(null); // Selected image-ai store panna

  // --- 1. Gallery-la irunthu photo select panna ---
  const pickImageFromGallery = async () => {
    // Permission kekkum
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Gallery access is required to upload photos.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true, // Crop panna allow pannum
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Gallery Image URI:", result.assets[0].uri);
    }
  };

  // --- 2. Camera-la irunthu photo edukka ---
  const takeSelfieWithCamera = async () => {
    // Camera Permission kekkum
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera access is required to take a selfie.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("Camera Image URI:", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.bgGlow} />

      {/* --- HEADER --- */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setIsMenuOpen(true)} style={styles.menuIconBox}>
            <MaterialIcons name="menu" size={28} color="#e8c08c" />
          </TouchableOpacity>
          <Text style={styles.logoText}>GlamAI</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('../../assets/icon/icon.png')}
            style={styles.avatarImg}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.mainTitle}>Upload Your{"\n"}<Text style={{color: '#e8c08c'}}>Digital Muse</Text></Text>
        </View>

        {/* --- GLASS UPLOAD CARD --- */}
        <View style={styles.cardWrapper}>
          <BlurView intensity={30} tint="dark" style={styles.glassCard}>
            <LinearGradient colors={['rgba(232, 192, 140, 0.15)', 'rgba(26, 13, 40, 0.6)']} style={styles.cardGradient}>
              
              {/* IMAGE PREVIEW: Photo select pannuna inga theriyum */}
              <View style={styles.iconCircle}>
                {selectedImage ? (
                  <Image source={{ uri: selectedImage }} style={{ width: '100%', height: '100%', borderRadius: 45 }} />
                ) : (
                  <MaterialIcons name="camera-enhance" size={45} color="#e8c08c" />
                )}
              </View>

              <Text style={styles.cardTitle}>{selectedImage ? "Image Ready!" : "Upload Your Photo"}</Text>
              <Text style={styles.cardSubtitle}>
                {selectedImage ? "You can proceed to the next step or re-upload." : "Ensure natural lighting and high clarity for best results."}
              </Text>

              <View style={styles.buttonGroup}>
                {/* GALLERY BUTTON */}
                <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={styles.primaryBtn} 
                  onPress={pickImageFromGallery}
                >
                  <LinearGradient
                    colors={['#e8c08c', '#5d4118']}
                    start={{x:0, y:0}} end={{x:1, y:0}}
                    style={styles.gradientBtn}
                  >
                    <Text style={styles.primaryBtnText}>SELECT FROM GALLERY</Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* CAMERA BUTTON */}
                <TouchableOpacity 
                  style={styles.secondaryBtn} 
                  onPress={takeSelfieWithCamera}
                >
                  <Text style={styles.secondaryBtnText}>TAKE A SELFIE</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </BlurView>
        </View>

        {/* --- BOTTOM NAVIGATION --- */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.continueBtn, !selectedImage && { opacity: 0.5 }]} 
            onPress={() => navigation.navigate('Style', { selectedOptions })}>
            <Text style={styles.continueText}>CONTINUE</Text>
            <View style={styles.arrowBox}>
              <MaterialIcons name="arrow-forward" size={20} color="#1a0d28" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
        {/* --- SIDEBAR --- */}
      <Sidebar isVisible={isMenuOpen} onClose={() => setIsMenuOpen(false)} navigation={navigation} />
    </SafeAreaView>
  );
}

// Styles are the same as before...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0d28" },
  bgGlow: { position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: 150, backgroundColor: '#e8c08c', opacity: 0.08 },
  stickyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, height: 110 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconBox: { width: 45, height: 45, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(232,192,140,0.1)' },
  logoText: { color: '#e8c08c', fontSize: 24, fontWeight: 'bold', marginLeft: 15, letterSpacing: 3 },
  profileCircle: { borderWidth: 1.5, borderColor: '#e8c08c', borderRadius: 25, padding: 2 },
  avatarImg: { width: 35, height: 35, borderRadius: 18 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  welcomeSection: { marginTop: 20, marginBottom: 30 },
  subTag: { color: '#f9abff', fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 8 },
  mainTitle: { color: '#fff', fontSize: 36, fontWeight: 'bold', lineHeight: 42 },
  cardWrapper: { borderRadius: 30, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(232,192,140,0.2)' },
  glassCard: { width: '100%' },
  cardGradient: { padding: 30, alignItems: 'center' },
  iconCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#1a0d28', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: 'rgba(232,192,140,0.3)', overflow: 'hidden' },
  cardTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  cardSubtitle: { color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center', paddingHorizontal: 20, marginBottom: 30 },
  buttonGroup: { width: '100%', gap: 15 },
  primaryBtn: { width: '100%' },
  gradientBtn: { paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
  primaryBtnText: { color: '#1a0d28', fontWeight: 'bold', letterSpacing: 1.5 },
  secondaryBtn: { width: '100%', paddingVertical: 18, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(232,192,140,0.4)', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)' },
  secondaryBtnText: { color: '#e8c08c', fontWeight: 'bold' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 },
  backLink: { color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', letterSpacing: 1 },
  continueBtn: { flexDirection: 'row', alignItems: 'center' },
  continueText: { color: '#e8c08c', fontWeight: 'bold', letterSpacing: 2, marginRight: 12 },
  arrowBox: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#e8c08c', justifyContent: 'center', alignItems: 'center' }
});