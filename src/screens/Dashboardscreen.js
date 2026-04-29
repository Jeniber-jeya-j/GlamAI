import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Sidebar from "./Sidebar";

const { width } = Dimensions.get("window");

const icons = {
  Makeup: "face",
  Accessory: "watch",
  Hairstyle: "content-cut",
  Footwear: "directions-walk",
  Perfume: "spa",
  Handbag: "shopping-bag",
};

export default function DashboardScreen({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* BACKGROUND */}
      <ImageBackground
        source={require("../../assets/images/header-bg.png")}
        style={styles.bgImage}
        resizeMode="contain"
      >
        <LinearGradient
          colors={["rgba(26,13,40,0.6)", "#1a0d28"]}
          style={styles.overlay}
        />
      </ImageBackground>

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <MaterialIcons name="menu" size={30} color="#e8c08c" />
        </TouchableOpacity>

        <Text style={styles.logo}>GlamAI</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons name="account-circle" size={30} color="#e8c08c" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Let's get you styled.</Text>

        {/* GRID */}
        <View style={styles.grid}>
          {Object.keys(icons).map((item, index) => {
            const scaleAnim = new Animated.Value(1); // ✅ FIX

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

            return (
              <Animated.View
                key={index}
                style={{
                  transform: [{ scale: scaleAnim }],
                  width: "48%",
                  aspectRatio: 1,
                  marginBottom: 18,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  onPress={() =>
                    navigation.navigate("Category", { type: item })
                  }
                  style={styles.card}
                >
                  <LinearGradient
                    colors={["rgba(232,192,140,0.2)", "transparent"]}
                    style={styles.gradientBorder}
                  >
                    <View style={styles.cardInner}>
                      <MaterialIcons name={icons[item]} size={32} color="#e8c08c" />
                      <Text style={styles.cardText}>{item}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      {/* SHOP NOW BUTTON */}
<TouchableOpacity
  style={styles.shopBtn}
  onPress={() => navigation.navigate("Preview")}
>
  <LinearGradient
    colors={["#e8c08c", "#5d4118"]}
    style={styles.shopGradient}
  >
    <Text style={styles.shopText}>VIEW YOUR LOOK</Text>
  </LinearGradient>
</TouchableOpacity>
</ScrollView>

      <Sidebar isVisible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0d28" },

  bgImage: {
    position: "absolute",
    width: width,
    height: 500,
    top: 0,
  },

  overlay: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
    zIndex: 10,
  },

  logo: { color: "#e8c08c", fontSize: 24, fontWeight: "bold" },

  scrollContent: { padding: 20 },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: { flex: 1, borderRadius: 22, overflow: "hidden" },

  gradientBorder: { flex: 1, padding: 1, borderRadius: 22 },

  cardInner: {
    flex: 1,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(232,192,140,0.08)",
  },

  cardText: { color: "#fff", marginTop: 10 },
  shopBtn: {
  marginTop: 25,
},

shopGradient: {
  paddingVertical: 18,
  borderRadius: 30,
  alignItems: "center",
},

shopText: {
  color: "#1a0d28",
  fontWeight: "bold",
  letterSpacing: 2,
},
});