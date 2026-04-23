import React, { useState } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  ImageBackground,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Sidebar from '../screens/Sidebar'; 
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [SidebarVisible, setSidebarVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState({
    Gender: null,
    Event: null,
    Type: null,
    Culture: null,
  });

  // Options Data
  const optionsData = {
    Gender: ["Male", "Female", "Baby", "Unisex"],
    Event: ["Wedding", "Party", "Formal", "Casual"],
    Type: ["Modern", "Vintage", "Minimalist", "workwear", "Ethnic", "Bold"],
    Culture: ["Indian", "Western", "Fusion", "Asian"],
  };

  const openSelection = (category) => {
    setActiveCategory(category);
    setModalVisible(true);
  };

  const handleSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [activeCategory]: option });
    setModalVisible(false);
  };

  // Internal Component for Cards
  const SelectionCard = ({ step, icon, title, category }) => {
    const isSelected = !!selectedOptions[category];
    return (
      <TouchableOpacity 
        style={styles.selectionCard} 
        activeOpacity={0.8}
        onPress={() => openSelection(category)}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.stepNumber, isSelected && styles.stepNumberComplete]}>
            <Text style={[styles.stepText, isSelected && styles.stepTextComplete]}>{step}</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <MaterialIcons name={icon} size={22} color="#e8c08c" style={{ marginRight: 10 }} />
              <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={[styles.statusText, isSelected && styles.statusTextActive]}>
              {isSelected ? selectedOptions[category] : "Tap to Select"}
            </Text>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#e8c08c" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* --- BACKGROUND --- */}
      <ImageBackground
        source={require('../../assets/images/header-bg.png')}
        style={styles.headerIllustrationContainer}
      >
        <LinearGradient colors={['rgba(26,13,40,0.4)', '#1a0d28']} style={styles.illustrationOverlay} />
      </ImageBackground>

      {/* --- FIXED HEADER --- */}
      <View style={styles.stickyHeader}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <MaterialIcons name="menu" size={30} color="#e8c08c" />
        </TouchableOpacity>
        
        <Text style={styles.logo}>GlamAI</Text>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('Profile')}
        >
          <MaterialIcons name="account-circle" size={30} color="#e8c08c" />
        </TouchableOpacity>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.welcomeText}>Welcome to GlamAI!</Text>
          <Text style={styles.highlightText}>Let's get you styled.</Text>
        </View>

        <View style={styles.cardContainer}>
          <SelectionCard step="1" icon="person" title="Select Gender" category="Gender" />
          <SelectionCard step="2" icon="celebration" title="Select Event" category="Event" />
          <SelectionCard step="3" icon="style" title="Select Type" category="Type" />
          <SelectionCard step="4" icon="public" title="Select Culture" category="Culture" />
        </View>

        {true && (
           <TouchableOpacity 
             style={styles.nextButton}
             onPress={() => navigation.navigate('Upload', { selectedOptions })}
           >
             <LinearGradient colors={["#e8c08c", "#5d4118"]} style={styles.gradientBtn}>
               <Text style={styles.nextText}>CONTINUE</Text>
             </LinearGradient>
           </TouchableOpacity>
        )}
      </ScrollView>

      {/* --- SIDEBAR OVERLAY (Outside ScrollView) --- */}
      <Sidebar 
        isVisible={SidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />

      {/* --- MODAL --- */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose {activeCategory}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#e8c08c" />
              </TouchableOpacity>
            </View>
            
            {activeCategory && optionsData[activeCategory].map((option, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.optionItem}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
                {selectedOptions[activeCategory] === option && (
                  <MaterialIcons name="check-circle" size={20} color="#e8c08c" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0d28" },
  headerIllustrationContainer: { position: 'absolute', top: 0, width: '100%', height: 350 },
  illustrationOverlay: { ...StyleSheet.absoluteFillObject },
  stickyHeader: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 20,
    paddingTop: 40,
    height: 100,
    zIndex: 10,
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  logo: { color: "#e8c08c", fontSize: 24, fontWeight: "bold", letterSpacing: 2 },
  iconButton: { backgroundColor: 'rgba(232,192,140,0.1)', padding: 4, borderRadius: 99 },
  titleContainer: { alignItems: 'center', marginBottom: 30 },
  welcomeText: { color: "#fff", fontSize: 28, fontWeight: 'bold' },
  highlightText: { color: "#e8c08c", fontSize: 16, fontStyle: 'italic', marginTop: 5 },
  cardContainer: { marginTop: 10 },
  selectionCard: {
    backgroundColor: "rgba(255,255,255,0.05)",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(232,192,140,0.1)",
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  stepNumber: { width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: '#e8c08c', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  stepNumberComplete: { backgroundColor: '#e8c08c' },
  stepText: { color: '#e8c08c', fontWeight: 'bold' },
  stepTextComplete: { color: '#1a0d28' },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  statusText: { color: "rgba(232,192,140,0.5)", fontSize: 12, marginTop: 4 },
  statusTextActive: { color: "#e8c08c", fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#231531', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, minHeight: 300 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { color: '#e8c08c', fontSize: 20, fontWeight: 'bold' },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 18, borderBottomWidth: 0.5, borderBottomColor: 'rgba(232,192,140,0.2)' },
  optionText: { color: '#fff', fontSize: 16 },
  nextButton: { marginTop: 20 },
  gradientBtn: { paddingVertical: 18, borderRadius: 30, alignItems: 'center' },
  nextText: { color: '#1a0d28', fontWeight: 'bold', letterSpacing: 2 }
});