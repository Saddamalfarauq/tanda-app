import { LinearGradient } from 'expo-linear-gradient';
import { AlertTriangle, Star } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CommunityAlerts() {
  return (
    <View style={{ paddingHorizontal: 16, marginTop:20,marginBottom: 0 }}>
      {/* Weather Alert */}
      <LinearGradient
        colors={['#f59e0b', '#b45309']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={styles.alertCard}
      >
        <View style={styles.iconCircle}>
          <AlertTriangle size={22} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.alertTitle}>Peringatan Cuaca Ekstrem</Text>
          <Text style={{ color: '#fff', fontSize: 12 }}>
            Hujan lebat + angin kencang dalam 2 jam
          </Text>
          <Text style={{ color: '#ffe082', fontSize: 12, marginTop: 2 }}>
            BMKG: Waspada banjir & pohon tumbang
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Detail</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Gotong Royong */}
      <LinearGradient
        colors={['#2563eb', '#0ea5e9']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[styles.alertCard, { marginTop: 14 }]}
      >
        <View style={styles.iconCircle}>
          <Star size={22} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.alertTitle}>Gotong Royong Besok</Text>
          <Text style={{ color: '#fff', fontSize: 12 }}>
            Pembersihan saluran air - 08:00 WIB
          </Text>
          <Text style={{ color: '#e0e7ff', fontSize: 12, marginTop: 2 }}>
            Balai RW • Bawa alat seadanya
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ikut</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  alertCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconCircle: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    padding: 9,
    borderRadius: 99,
    marginRight: 12,
  },
  alertTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 1,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
