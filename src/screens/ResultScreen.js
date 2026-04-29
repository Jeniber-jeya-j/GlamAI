import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
const RESULTS = [
  { icon: "👗", badge: "Outfit", name: "Silk Kanjivaram Saree", price: "₹4,500", store: "Myntra", url: "https://www.myntra.com" },
  { icon: "💎", badge: "Accessories", name: "Temple Jewellery Set", price: "₹2,200", store: "Amazon", url: "https://www.amazon.in" },
  { icon: "👡", badge: "Footwear", name: "Embellished Heels", price: "₹1,800", store: "Flipkart", url: "https://www.flipkart.com" },
  { icon: "💄", badge: "Makeup", name: "Smoky Eye + Red Lip", price: "₹999", store: "Nykaa", url: "https://www.nykaa.com" },
  { icon: "💇‍♀️", badge: "Hairstyle", name: "Classic Bun with Gajra", price: "₹1,500", store: "Local Salon", url: "https://www.google.com/search?q=bridal+hairstyles" },
  { icon: "👜", badge: "Handbag", name: "Embroidered Clutch", price: "₹1,200", store: "Ajio", url: "https://www.ajio.com" },
  { icon: "🌸", badge: "Floral", name: "Fresh Jasmine Flowers", price: "₹300", store: "Local Florist", url: "https://www.google.com/search?q=floral+accessories" },
  { icon: "💍", badge: "Jewelry", name: "Gold Bangles Set", price: "₹3,000", store: "Tanishq", url: "https://www.tanishq.co.in" } ,
  { icon: "👒", badge: "Headwear", name: "Embellished Maang Tikka", price: "₹1,000", store: "CaratLane", url: "https://www.caratlane.com" },
  { icon: "🧴", badge: "Perfume", name: "Floral Scented Perfume", price: "₹1,500", store: "Sephora", url: "https://www.sephora.com" }, 
];

export default function ResultScreen({ route }) {
  const { event, style, budget } = route.params || {};

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
        
      {/* BODY */}
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>Your Perfect Look ✨</Text>
        <Text style={styles.sub}>Based on your {event} event, {style} style, and {budget} budget</Text>

        {RESULTS.map(({ icon, badge, name, price, store, url }) => (
          <View key={name} style={styles.card}>
            
            <View style={styles.img}>
              <Text style={styles.imgIcon}>{icon}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.badge}>{badge}</Text>
              <Text style={styles.itemName}>{name}</Text>
              <Text style={styles.itemPrice}>
                {price} · {store}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => Linking.openURL(url)}
            >
              <LinearGradient
                colors={["#e8c08c", "#5d4118"]}
                style={styles.buyBtn}
              >
                <Text style={styles.buyText}>BUY</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.wishBtn}>
          <Text style={styles.wishText}>♡ SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shopBtn}>
          <LinearGradient
            colors={["#e8c08c", "#5d4118"]}
            style={styles.shopGradient}
          >
            <Text style={styles.shopText}>SHOP ALL</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    color: "#e8c08c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },

  sub: {
    fontSize: 12,
    color: "#c9a0dc",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },

  body: {
    padding: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 20,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(232,192,140,0.1)",
  },

  img: {
    width: 60,
    height: 70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  imgIcon: { fontSize: 28 },

  info: { flex: 1, marginLeft: 10 },

  badge: {
    color: "#e8c08c",
    fontSize: 10,
    marginBottom: 4,
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

  itemName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  itemPrice: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },

  buyBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },

  buyText: {
    color: "#1a0d28",
    fontWeight: "bold",
    fontSize: 11,
  },

  bottomBar: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },

  wishBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e8c08c",
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },

  wishText: {
    color: "#e8c08c",
  },

  shopBtn: { flex: 1 },

  shopGradient: {
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: "center",
  },

  shopText: {
    color: "#1a0d28",
    fontWeight: "bold",
  },
});