import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Sidebar from '../screens/Sidebar'; 

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(''); // 'menu' or 'detail'
  const [activeTitle, setActiveTitle] = useState('');
  const [name, setName] = useState('Your Name');
  const [profileImage, setProfileImage] = useState(null);
  const [musePhotos, setMusePhotos] = useState([]);
  
  // 1. Sidebar state kandaipa function kulla irukkanum
  const [SidebarVisible, setSidebarVisible] = useState(false);

  // --- Image Picker Logic ---
  const handlePickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'profile' ? [1, 1] : [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
      } else {
        setMusePhotos([result.assets[0].uri, ...musePhotos]); 
      }
    }
  };

  // --- Modal Navigation Logic ---
  const openSettingsMenu = () => {
    setModalType('menu');
    setActiveTitle('Settings');
    setModalVisible(true);
  };

  const openDetailView = (title) => {
    setActiveTitle(title);
    setModalType('detail');
    setModalVisible(true);
  };

  const renderDetailContent = () => {
    const details = {
      'Edit Profile': 'Manage your name, style persona, and connected social accounts.',
      'Notifications': 'Customize alerts for new trend drops and AI style suggestions.',
      'Privacy & Security': 'Update your password and manage data encryption settings.',
      'Help Center': 'Chat with our support team or browse the GlamAI stylist guide.',
      'SAVED LOOKS': 'You have 124 curated looks. Tap to organize into collections.',
      'CONSULTS': 'View your past 18 AI style sessions and human stylist chats.',
      'CLOSET': 'Manage your 42 digitalized garments and accessories.'
    };
    return <Text style={styles.detailPara}>{details[activeTitle] || 'Detailed information coming soon...'}</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* 2. FIXED HEADER (Updated with Hamburger Menu) */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerLeft}>
          {/* Menu Button to trigger Sidebar */}
          <TouchableOpacity 
            onPress={() => setSidebarVisible(true)}
            style={styles.menuIconContainer}
          >
            <MaterialIcons name="menu" size={28} color="#e8c08c" />
          </TouchableOpacity>
          <Text style={styles.headerLogo}>GlamAI</Text>
        </View>
        <TouchableOpacity style={styles.settingsBtn} onPress={openSettingsMenu}>
          <MaterialIcons name="settings" size={24} color="#e8c08c" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* AVATAR SECTION */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => handlePickImage('profile')} activeOpacity={0.8}>
            <View style={styles.imageContainer}>
              <LinearGradient colors={['#5d4118', '#e8c08c']} style={styles.imageGradient}>
                <View style={styles.avatarCircle}>
                  {profileImage ? (
                    <Image source={{ uri: profileImage }} style={styles.profileImg} />
                  ) : (
                    <MaterialIcons name="account-circle" size={120} color="rgba(232,192,140,0.3)" />
                  )}
                </View>
                <View style={styles.cameraOverlay}><MaterialIcons name="add-a-photo" size={16} color="#fff" /></View>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          <View style={styles.nameRow}>
            <TextInput style={styles.userNameInput} value={name} onChangeText={setName} />
            <MaterialIcons name="edit" size={16} color="#e8c08c" />
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>TIMELESS ELEGANT</Text></View>
        </View>

        {/* STATS CARDS */}
        <View style={styles.statsRow}>
          {['SAVED LOOKS', 'CONSULTS', 'CLOSET'].map((label, index) => (
            <TouchableOpacity key={index} style={styles.statBox} onPress={() => openDetailView(label)}>
              <Text style={styles.statValue}>{index === 0 ? '124' : index === 1 ? '18' : '42'}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* MUSE BOARD */}
        <View style={styles.sectionTitleRow}>
          <View>
            <Text style={styles.sectionTag}>INSPIRATION</Text>
            <Text style={styles.sectionHeader}>The Muse Board</Text>
          </View>
          <TouchableOpacity><Text style={styles.viewAllText}>VIEW ALL</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.museList}>
          {musePhotos.map((uri, idx) => (
            <Image key={idx} source={{ uri }} style={styles.museImage} />
          ))}
          <TouchableOpacity style={styles.addMuseBtn} onPress={() => handlePickImage('muse')}>
            <MaterialIcons name="add" size={30} color="#e8c08c" />
            <Text style={styles.addMuseText}>ADD PHOTO</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* SIGN OUT */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('Splash')}>
          <MaterialIcons name="logout" size={16} color="rgba(240,219,255,0.4)" />
          <Text style={styles.logoutText}>SIGN OUT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 3. SIDEBAR OVERLAY (Positioned at the end for proper z-index) */}
      <Sidebar 
        isVisible={SidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />

      {/* DYNAMIC MODAL */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{activeTitle}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={28} color="#e8c08c" />
              </TouchableOpacity>
            </View>

            {modalType === 'menu' ? (
              <View style={styles.modalList}>
                {['Edit Profile', 'Notifications', 'Privacy & Security', 'Help Center'].map((item) => (
                  <TouchableOpacity key={item} style={styles.modalOption} onPress={() => openDetailView(item)}>
                    <Text style={styles.optionText}>{item}</Text>
                    <MaterialIcons name="chevron-right" size={24} color="rgba(232,192,140,0.5)" />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.modalList}>
                {renderDetailContent()}
                <TouchableOpacity style={styles.actionBtn} onPress={() => setModalVisible(false)}>
                  <Text style={styles.actionBtnText}>BACK</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0d28" },
  stickyHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingTop: 50, 
    height: 110, 
    backgroundColor: 'rgba(26,13,40,0.98)',
    zIndex: 10
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIconContainer: { padding: 5, marginRight: 10 },
  headerLogo: { color: '#e8c08c', fontSize: 24, fontWeight: 'bold', fontStyle: 'italic' },
  settingsBtn: { padding: 8, backgroundColor: 'rgba(232,192,140,0.1)', borderRadius: 20 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  profileSection: { alignItems: 'center', marginVertical: 30 },
  imageContainer: { width: 140, height: 140, borderRadius: 70, padding: 3 },
  imageGradient: { flex: 1, borderRadius: 70, padding: 2, justifyContent: 'center', alignItems: 'center' },
  avatarCircle: { width: '100%', height: '100%', borderRadius: 70, backgroundColor: '#231531', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  profileImg: { width: '100%', height: '100%' },
  cameraOverlay: { position: 'absolute', bottom: 5, right: 10, backgroundColor: '#5d4118', padding: 6, borderRadius: 15, borderWidth: 1, borderColor: '#e8c08c' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  userNameInput: { color: '#f0dbff', fontSize: 24, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: 'rgba(232,192,140,0.2)' },
  badge: { backgroundColor: '#322441', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20, marginTop: 10 },
  badgeText: { color: '#e8c08c', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 },
  statBox: { backgroundColor: '#231531', width: (width - 60) / 3, paddingVertical: 18, borderRadius: 18, alignItems: 'center' },
  statValue: { color: '#e8c08c', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: 'rgba(240,219,255,0.4)', fontSize: 9, marginTop: 5 },
  sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  sectionTag: { color: '#f9abff', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  sectionHeader: { color: '#f0dbff', fontSize: 22, fontWeight: 'bold' },
  viewAllText: { color: '#e8c08c', fontSize: 12, fontWeight: 'bold' },
  museList: { flexDirection: 'row', marginBottom: 40 },
  museImage: { width: 120, height: 170, borderRadius: 20, marginRight: 15 },
  addMuseBtn: { width: 120, height: 170, borderRadius: 20, borderStyle: 'dashed', borderWidth: 1, borderColor: '#e8c08c', justifyContent: 'center', alignItems: 'center' },
  addMuseText: { color: '#e8c08c', fontSize: 10, marginTop: 8, fontWeight: 'bold' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  logoutText: { color: 'rgba(240,219,255,0.3)', fontSize: 12, fontWeight: 'bold', marginLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#231531', borderTopLeftRadius: 35, borderTopRightRadius: 35, padding: 25, minHeight: 450 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  modalTitle: { color: '#e8c08c', fontSize: 24, fontWeight: 'bold' },
  modalOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(232,192,140,0.1)' },
  optionText: { color: '#f0dbff', fontSize: 18 },
  detailPara: { color: 'rgba(240,219,255,0.7)', fontSize: 16, lineHeight: 26, marginBottom: 30 },
  actionBtn: { backgroundColor: '#e8c08c', padding: 18, borderRadius: 15, alignItems: 'center' },
  actionBtnText: { color: '#1a0d28', fontWeight: 'bold', fontSize: 16 }
});