import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stylecontext } from "../context/Stylecontext";

export default function CategoryScreen({ route, navigation }) {
  const type = route?.params?.type || "Makeup";
  const { updateSelection } = useContext(Stylecontext);
  const [selectedIndex, setSelectedIndex] = useState(null);
  console.log("TYPE:", route?.params?.type);

  const imageMap = {
    Makeup: [
      require("../../assets/images/makeup1.jpg"),
      require("../../assets/images/makeup2.jpg"),
      require("../../assets/images/makeup3.jpg"),
    ],
    Accessory: [
      require("../../assets/images/acc1.png"),
      require("../../assets/images/acc2.png"),
      require("../../assets/images/acc3.jpg"),
    ],
    Hairstyle: [
      require("../../assets/images/hairstyle1.png"),
      require("../../assets/images/hairstyle2.png"),
      require("../../assets/images/hairstyle3.png"),
    ],
    Footwear: [
      require("../../assets/images/footwear1.jpg"),
      require("../../assets/images/footwear2.jpg"),
      require("../../assets/images/footwear3.jpg"),
    ],
    Perfume: [
      require("../../assets/images/perfume1.jpg"),
      require("../../assets/images/perfume2.jpg"),
      require("../../assets/images/perfume3.jpg"),
    ],
    Handbag: [
      require("../../assets/images/handbag1.jpg"),
      require("../../assets/images/handbag2.jpg"),
      require("../../assets/images/handbag3.jpg"),
    ],
  };

  const images = imageMap[type] || [];

  const handleConfirm = () => {
    if (selectedIndex !== null) {
      updateSelection(type, images[selectedIndex]);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="#e8c08c" />
        </TouchableOpacity>

        <Text style={styles.logo}>GlamAI</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <MaterialIcons name="account-circle" size={28} color="#e8c08c" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{type} Styles</Text>

        {images.map((img, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedIndex(index)}
            style={[
              styles.imageBox,
              selectedIndex === index && styles.selectedBorder,
            ]}
          >
            <Image source={img} style={styles.image} />

            <View style={styles.overlayIcon}>
              <MaterialIcons
                name={
                  selectedIndex === index
                    ? "check-circle"
                    : "radio-button-unchecked"
                }
                size={24}
                color="#e8c08c"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedIndex !== null && (
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <LinearGradient colors={["#e8c08c", "#5d4118"]} style={styles.btn}>
            <Text style={styles.btnText}>CONFIRM SELECTION</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0d28" },

  bgImage: {
    position: "absolute",
    width: "100%",
    height: 300,
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

  logo: { color: "#e8c08c", fontSize: 22, fontWeight: "bold" },

  scrollContent: { padding: 20 },

  title: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },

  imageBox: {
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },

  selectedBorder: { borderColor: "#e8c08c" },

  image: { width: "100%", height: "100%" },

  overlayIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 5,
  },

  confirmBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  btn: {
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  btnText: {
    color: "#1a0d28",
    fontWeight: "bold",
  },
});