import {
  AlertTriangle,
  CheckCircle,
  CloudDrizzle,
  PartyPopper,
  Soup
} from "lucide-react-native";
import { Text, View } from "react-native";

const activities = [
  {
    icon: <AlertTriangle color="#DC2626" size={22} />,
    bg: "#FECACA",
    title: "Laporan banjir di Jl. Sudirman",
    desc: "Dilaporkan oleh Ibu Sari • 15 menit lalu",
    badge: "Baru",
    badgeBg: "#FECACA",
    badgeColor: "#DC2626",
  },
  {
    icon: <CheckCircle color="#22C55E" size={22} />,
    bg: "#BBF7D0",
    title: "Bantuan evakuasi berhasil diselesaikan",
    desc: "Tim Relawan RT 04 • 1 jam lalu",
    badge: "Selesai",
    badgeBg: "#BBF7D0",
    badgeColor: "#22C55E",
  },
  {
    icon: <CloudDrizzle color="#2563EB" size={22} />,
    bg: "#DBEAFE",
    title: "Peringatan cuaca ekstrem diterbitkan",
    desc: "BMKG Jakarta • 2 jam lalu",
    badge: "Aktif",
    badgeBg: "#FEF08A",
    badgeColor: "#CA8A04",
  },
  {
    icon: <Soup color="#2563EB" size={22} />,
    bg: "#DDD6FE",
    title: "Bantuan makanan untuk 5 keluarga",
    desc: "Koordinator RT 03 • 3 jam lalu",
    badge: "Bantuan",
    badgeBg: "#BFDBFE",
    badgeColor: "#2563EB",
  },
  {
    icon: <PartyPopper color="#CA8A04" size={22} />,
    bg: "#FDE68A",
    title: "Gotong royong pembersihan selesai",
    desc: "Warga RW 12 • 5 jam lalu",
    badge: "Selesai",
    badgeBg: "#BBF7D0",
    badgeColor: "#22C55E",
  },
];

export default function RecentActivity() {
  return (
    <View style={{ paddingHorizontal: 24, marginBottom: 28 }}>
      <Text style={{ fontWeight: "bold", fontSize: 16, color: "#22223B", marginBottom: 14 }}>
        Aktivitas Terbaru
      </Text>
      <View>
        {activities.map((a, idx) => (
          <View key={idx}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 14,
              padding: 14,
              marginBottom: 8,
              shadowColor: "#000",
              elevation: 2,
              borderWidth: 1,
              borderColor: "#F1F5F9"
            }}>
            <View style={{
              backgroundColor: a.bg, borderRadius: 18,
              width: 36, height: 36, alignItems: "center", justifyContent: "center", marginRight: 14
            }}>
              {a.icon}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 13, color: "#22223B" }}>{a.title}</Text>
              <Text style={{ fontSize: 11, color: "#6B7280" }}>{a.desc}</Text>
            </View>
            <View style={{
              backgroundColor: a.badgeBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginLeft: 8
            }}>
              <Text style={{ color: a.badgeColor, fontSize: 11, fontWeight: "bold" }}>{a.badge}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={{
        marginTop: 10, textAlign: "center", color: "#2563EB",
        fontWeight: "bold", fontSize: 13
      }}>
        Lihat Semua Aktivitas
      </Text>
    </View>
  );
}
