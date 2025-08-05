import { useRouter } from "expo-router";
import { AlertTriangle, HandHelping, MapPin, Volume2 } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

const menu = [
  {
    label: "Laporkan Kejadian",
    desc: "Laporkan situasi darurat di sekitar Anda dengan cepat",
    border: "#FECACA",
    icon: <AlertTriangle color="#DC2626" size={30} />,
    badge: "3",
    badgeColor: "#DC2626",
    highlight: "3 Laporan Aktif",
    highlightBg: "#FECACA",
    highlightColor: "#DC2626",
    info: "Terakhir: 15 menit lalu",
    route: "report",
  },
  {
    label: "Broadcast Lokal",
    desc: "Peringatan dan info penting dari warga sekitar",
    border: "#FEF08A",
    icon: <Volume2 color="#CA8A04" size={30} />,
    badge: "12",
    badgeColor: "#CA8A04",
    highlight: "12 Peringatan Baru",
    highlightBg: "#FEF08A",
    highlightColor: "#CA8A04",
    info: "Radius: 2 km",
    route: "broadcast",
  },
  {
    label: "Koordinasi Bantuan",
    desc: "Berikan atau minta bantuan dari komunitas",
    border: "#BFDBFE",
    icon: <HandHelping color="#2563EB" size={30} />,
    badge: "7",
    badgeColor: "#2563EB",
    highlight: "7 Butuh Bantuan",
    highlightBg: "#BFDBFE",
    highlightColor: "#2563EB",
    info: "23 Siap Membantu",
    route: "help",
  },
  {
    label: "Peta Komunitas",
    desc: "Lihat situasi real-time di sekitar Anda",
    border: "#BBF7D0",
    icon: <MapPin color="#22C55E" size={30} />,
    badge: "25",
    badgeColor: "#22C55E",
    highlight: "25 Warga Online",
    highlightBg: "#BBF7D0",
    highlightColor: "#22C55E",
    info: "Update: 1 menit lalu",
    route: "map",
  },
];

export default function MainMenu() {
  const router = useRouter();
  return (
    <View style={{ paddingHorizontal: 24, marginTop: 32}}>
      <Text style={{ fontWeight: "bold", fontSize: 18, color: "#22223B", marginBottom: 18 }}>
        Menu Utama
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {menu.map((item, idx) => (
          <TouchableOpacity
            onPress={() => router.push(`/${item.route}`)}
            key={item.label}
            style={{
              width: "48%",
              marginBottom: 18,
              borderRadius: 18,
              backgroundColor: "#fff",
              borderWidth: 1.5,
              borderColor: item.border,
              elevation: 4,
              padding: 18,
              shadowColor: "#000",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <View style={{ position: "relative", marginBottom: 10 }}>
                <View style={{
                  backgroundColor: item.highlightBg,
                  borderRadius: 16,
                  padding: 10,
                }}>
                  {item.icon}
                </View>
                <View style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: item.badgeColor,
                  borderRadius: 12,
                  paddingHorizontal: 7,
                  paddingVertical: 2,
                }}>
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>{item.badge}</Text>
                </View>
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 14, color: "#22223B", marginBottom: 4 }}>
                {item.label}
              </Text>
              <Text style={{ fontSize: 12, color: "#525252", textAlign: "center", marginBottom: 6 }}>{item.desc}</Text>
              <View style={{
                backgroundColor: item.highlightBg,
                borderRadius: 20,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginBottom: 2,
                alignSelf: "center"
              }}>
                <Text style={{ color: item.highlightColor, fontSize: 12, fontWeight: "600" }}>{item.highlight}</Text>
              </View>
              <Text style={{ fontSize: 11, color: "#999", textAlign: "center" }}>{item.info}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
