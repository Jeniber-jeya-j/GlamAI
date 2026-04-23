import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';

const RESULTS = [
  { icon: '👗', badge: 'Outfit', name: 'Silk Kanjivaram Saree', price: '₹4,500', store: 'Myntra', url: 'https://www.myntra.com' },
  { icon: '💎', badge: 'Accessories', name: 'Temple Jewellery Set', price: '₹2,200', store: 'Amazon', url: 'https://www.amazon.in' },
  { icon: '👡', badge: 'Footwear', name: 'Embellished Heels', price: '₹1,800', store: 'Flipkart', url: 'https://www.flipkart.com' },
  { icon: '💄', badge: 'Makeup', name: 'Smoky Eye + Red Lip', price: '₹999', store: 'Nykaa', url: 'https://www.nykaa.com' },
];

export default function ResultScreen({ navigation, route }) {
  const { event, style, budget } = route.params || {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Perfect Look ✨</Text>
        <Text style={styles.sub}>{event} · {style} · {budget}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        {RESULTS.map(({ icon, badge, name, price, store, url }) => (
          <View key={name} style={styles.card}>
            <View style={styles.img}><Text style={styles.imgIcon}>{icon}</Text></View>
            <View style={styles.info}>
              <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>
              <Text style={styles.itemName}>{name}</Text>
              <Text style={styles.itemPrice}>{price} · {store}</Text>
            </View>
            <TouchableOpacity style={styles.buyBtn} onPress={() => Linking.openURL(url)}>
              <Text style={styles.buyText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.wishBtn}>
          <Text style={styles.wishText}>♡ Save Look</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shopBtn}>
          <Text style={styles.shopText}>Shop All →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#3d1a5e', padding: 24, paddingTop: 56 },
  title: { fontSize: 22, color: '#f0d080', fontWeight: '600' },
  sub: { fontSize: 12, color: '#c9a0dc', marginTop: 4 },
  body: { padding: 16, gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 0.5, borderColor: '#e8e0f0', borderRadius: 14, padding: 12 },
  img: { width: 56, height: 70, borderRadius: 12, backgroundColor: '#f9f4ff', alignItems: 'center', justifyContent: 'center' },
  imgIcon: { fontSize: 28 },
  info: { flex: 1 },
  badge: { backgroundColor: '#f9f4ff', borderWidth: 0.5, borderColor: '#c9a0dc', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 4 },
  badgeText: { fontSize: 9, color: '#7040a0' },
  itemName: { fontSize: 13, fontWeight: '500', color: '#3d1a5e' },
  itemPrice: { fontSize: 11, color: '#9980b0', marginTop: 2 },
  buyBtn: { backgroundColor: '#f0d080', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 7 },
  buyText: { fontSize: 11, fontWeight: '600', color: '#1a0a2e' },
  bottomBar: { flexDirection: 'row', gap: 10, padding: 16 },
  wishBtn: { flex: 1, backgroundColor: '#f9f4ff', borderWidth: 1, borderColor: '#c9a0dc', borderRadius: 20, paddingVertical: 12, alignItems: 'center' },
  wishText: { color: '#3d1a5e', fontSize: 13 },
  shopBtn: { flex: 1, backgroundColor: '#3d1a5e', borderRadius: 20, paddingVertical: 12, alignItems: 'center' },
  shopText: { color: '#f0d080', fontSize: 13 },
});