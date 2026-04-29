import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Stylecontext } from "../context/Stylecontext";
import { MaterialIcons } from "@expo/vector-icons";
export default function PreviewScreen({ navigation }) {
  const { selections } = useContext(Stylecontext);

  return (
    <SafeAreaView style={styles.container}>

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

      {/* TITLE */}
      <Text style={styles.title}>Your Styled Look ✨</Text>

      {/* FULL LOOK IMAGE */}
      <View style={styles.previewBox}>
        <Image
          source={require("../../assets/images/Model.png")} 
          style={styles.modelImage}
        />

        {/* Overlay selected items (optional basic version) */}
        {Object.values(selections).map((img, index) => (
          <Image key={index} source={img} style={styles.overlayItem} />
        ))}
      </View>

      {/* SHOP NOW BUTTON */}
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => navigation.navigate("Result")}
      >
        <LinearGradient
          colors={["#e8c08c", "#5d4118"]}
          style={styles.btn}
        >
          <Text style={styles.btnText}>SHOP NOW</Text>
        </LinearGradient>
      </TouchableOpacity>
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

  title: {
    color: "#e8c08c",
    fontSize: 22,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },

  previewBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modelImage: {
    width: 250,
    height: 400,
    resizeMode: "contain",
  },
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingTop: 40,
  paddingBottom: 10,
  alignItems: "center",
  zIndex: 10,
},

logo: {
  color: "#e8c08c",
  fontSize: 22,
  fontWeight: "bold",
},

  overlayItem: {
    position: "absolute",
    width: 80,
    height: 80,
    opacity: 0.8,
  },

  btnContainer: {
    padding: 20,
  },

  btn: {
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
  },

  btnText: {
    color: "#1a0d28",
    fontWeight: "bold",
    letterSpacing: 2,
  },
});