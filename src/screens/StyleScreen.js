import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const STYLES = [
  { icon: "", name: "Elegant", desc: "Soft & luxury vibes" },
  { icon: "", name: "Bold", desc: "Statement & powerful" },
  { icon: "", name: "Trendy", desc: "Modern viral styles" },
];

export default function StyleScreen({ navigation, route }) {
  const [selected, setSelected] = useState("Elegant");
  const { selectedOptions } = route.params || {};
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

const styleMap = {
  "Female-Party-Modern-Indian": [
    require('../../assets/style/women indian party.webp'),
    require('../../assets/style/women indian mordern.webp'),
    require('../../assets/style/women ethnic fusion.webp'),
  ],
  "Female-Wedding-Bold-Western": [
    require('../../assets/style/women wedding western.webp'),
    require('../../assets/style/Women wedding fusion.webp'),
    require('../../assets/style/women wedding asian.jpg'),
  ],
};

const key = `${selectedOptions?.Gender}-${selectedOptions?.Event}-${selectedOptions?.Type}-${selectedOptions?.Culture}`;

const images = styleMap[key] || [
  require('../../assets/style/women western bold casul.webp'),
  require('../../assets/style/women minimalist.webp'),
  require('../../assets/style/women indian party.webp'),
];

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: translateAnim }],
        }}
      >
        {/* --- HEADER --- */}
      <View style={styles.header}>
  {/* LEFT - MENU */}
  <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
    <MaterialIcons name="menu" size={28} color="#e8c08c" />
  </TouchableOpacity>

  {/* CENTER - LOGO */}
  <Text style={styles.logoText}>GlamAI</Text>

  {/* RIGHT - PROFILE */}
  <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
    <Image
      source={require('../../assets/icon/icon.png')}
      style={styles.avatarImg}
    />
  </TouchableOpacity>
</View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Text */}
          <View style={styles.header}>
            <Text style={styles.tag}>CURATED FOR YOU</Text>
            <Text style={styles.title}>Choose Your Style</Text>
            <View style={styles.line} />
          </View>

          {/* Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {STYLES.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.chip,
                  selected === item.name && styles.chipActive,
                ]}
                onPress={() => setSelected(item.name)}
              >
                <Text style={styles.chipText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Cards */}
          <View style={styles.grid}>
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              }}
            >
              {images.map((img, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.card}
                  onPress={() => setSelectedImage(img)}
                >
                  <View style={styles.imageBox}>
                    <Image 
                      source={img} 
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.cardTitle}>Look {index + 1}</Text>
                  <Text style={styles.cardDesc}>
                    Perfect match for your selection
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaText}>
              Ready to transform your style?
            </Text>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => navigation.navigate("Dashboard")}
              >
                <LinearGradient
                  colors={["#e8c08c", "#5d4118"]}
                  style={styles.ctaBtn}
                >
                  <Text style={styles.ctaBtnText}>
                    Accessory and makeup Suggestions
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ScrollView>
        {selectedImage && (
  <View style={styles.modalContainer}>
    <TouchableOpacity 
      style={styles.modalClose}
      onPress={() => setSelectedImage(null)}
    >
      <Text style={{ color: "#fff", fontSize: 18 }}>Close</Text>
    </TouchableOpacity>

    <Image 
      source={selectedImage}
      style={styles.fullScreenImage}
      resizeMode="contain"
    />
  </View>
)}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a0d28",
  },

  /* 🔥 HEADER */
  topHeader: {
    position: "relative",
  },

  headerGradient: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  iconBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 12,
  },

  iconText: {
    color: "#e8c08c",
    fontSize: 18,
  },

  logo: {
    color: "#e8c08c",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#5d2c82",
    alignItems: "center",
    justifyContent: "center",
  },

  fullImage: {
  width: "100%",
  height: "100%",
  borderRadius: 16,
},

  curve: {
    position: "absolute",
    right: -60,
    top: 0,
    width: 200,
    height: 200,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 100,
  },
header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 12,
},

logoText: {
  position: "absolute",   
  left: 0,
  right: 0,
  textAlign: "center",
  color: "#e8c08c",
  fontSize: 20,
  fontWeight: "bold",
},

avatarImg: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: "#e8c08c",
},
  
  tag: {
    color: "#f9abff",
    fontSize: 10,
    letterSpacing: 2,
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    marginTop: 6,
  },

  modalContainer: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.95)",
  justifyContent: "center",
  alignItems: "center",
},

fullScreenImage: {
  width: "100%",
  height: "80%",
},

modalClose: {
  position: "absolute",
  top: 50,
  right: 20,
  zIndex: 10,
},

  line: {
    height: 3,
    width: 60,
    backgroundColor: "#e8c08c",
    marginTop: 10,
    borderRadius: 2,
  },

  chip: {
    backgroundColor: "#3d2e4c",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },

  chipActive: {
    backgroundColor: "#e8c08c",
  },

  chipText: {
    color: "#fff",
    fontSize: 12,
  },

  grid: {
    padding: 16,
  },

  card: {
    backgroundColor: "rgba(61,46,76,0.4)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },

  imageBox: {
    height: 180,
    borderRadius: 16,
    backgroundColor: "#322441",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },

  cardDesc: {
    color: "#bbb",
    fontSize: 12,
    marginBottom: 10,
  },

  glassBtn: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },

  glassText: {
    color: "#e8c08c",
    fontSize: 12,
  },

  ctaBox: {
    padding: 20,
    marginBottom: 40,
  },

  ctaText: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 14,
  },

  ctaBtn: {
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  ctaBtnText: {
    color: "#1a0d28",
    fontWeight: "bold",
    fontSize: 16,
  },
});