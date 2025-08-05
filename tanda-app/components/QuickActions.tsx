import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle, Flame, Hospital, PhoneCall, Waves } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function QuickActions() {
  return (
    <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
      <Text style={{
        fontWeight: "bold", fontSize: 16, color: "#22223B", marginBottom: 14
      }}>
        Aksi Cepat
      </Text>
      {/* 2 Big Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
        {/* Emergency Call */}
        <TouchableOpacity style={{ flex: 1, marginRight: 9, borderRadius: 16, overflow: "hidden" }}>
          <LinearGradient
            colors={["#DC2626", "#B91C1C"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 16, borderRadius: 16
            }}>
            <PhoneCall color="white" size={26} style={{ marginRight: 12 }} />
            <View>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>Darurat 112</Text>
              <Text style={{ color: "#fee2e2", fontSize: 11, fontWeight: "500" }}>24/7 Siaga</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        {/* SOS */}
        <TouchableOpacity style={{ flex: 1, marginLeft: 9, borderRadius: 16, overflow: "hidden" }}>
          <LinearGradient
            colors={["#FBBF24", "#CA8A04"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 16, borderRadius: 16
            }}>
            <AlertCircle color="white" size={26} style={{ marginRight: 12 }} />
            <View>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>SOS</Text>
              <Text style={{ color: "#fff9c4", fontSize: 11, fontWeight: "500" }}>Panic Button</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* 3 Small Quick Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity style={{
          flex: 1, backgroundColor: "#BFDBFE", borderRadius: 12, paddingVertical: 13, alignItems: "center", marginRight: 8
        }}>
          <Hospital color="#2563EB" size={22} />
          <Text style={{ color: "#2563EB", fontWeight: "bold", fontSize: 12, marginTop: 2 }}>Medis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1, backgroundColor: "#FECACA", borderRadius: 12, paddingVertical: 13, alignItems: "center", marginLeft: 4, marginRight: 4
        }}>
          <Flame color="#DC2626" size={22} />
          <Text style={{ color: "#DC2626", fontWeight: "bold", fontSize: 12, marginTop: 2 }}>Kebakaran</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          flex: 1, backgroundColor: "#CFFAFE", borderRadius: 12, paddingVertical: 13, alignItems: "center", marginLeft: 8
        }}>
          <Waves color="#06B6D4" size={22} />
          <Text style={{ color: "#06B6D4", fontWeight: "bold", fontSize: 12, marginTop: 2 }}>Banjir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
