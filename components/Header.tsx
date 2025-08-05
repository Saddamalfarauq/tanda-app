import { Bell, UserCheck } from 'lucide-react-native';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

// Deklarasi props dengan tipe yang benar
interface HeaderProps {
  onNotifPress?: () => void;
  onProfilePress?: () => void;
}

export default function Header({
  onNotifPress,
  onProfilePress,
}: HeaderProps) {
  return (
    <View
      style={{
        backgroundColor: '#dc2626',
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
      }}
    >
      {/* Profile & Icons */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: Platform.OS === 'android' ? 30 : 24,
          paddingHorizontal: 22,
          marginBottom: 18,
          zIndex: 2,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: '#EF4444',
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>KA</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Kiel Artama</Text>
            <Text style={{ color: '#FECACA', fontSize: 13, marginTop: 1 }}>Koordinator RT 05</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff2',
              padding: 11,
              borderRadius: 30,
              marginRight: 4,
              position: 'relative',
            }}
            onPress={onNotifPress}
          >
            <Bell size={22} color="white" />
            <View
              style={{
                position: 'absolute',
                top: 5,
                right: 4,
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: '#FACC15',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#7F1D1D' }}>5</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: '#fff2', padding: 11, borderRadius: 30 }}
            onPress={onProfilePress}
          >
            <UserCheck size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Status KOMUNITAS */}
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        <View
          style={{
            width: 335,
            backgroundColor: '#d94848',
            borderRadius: 15,
            paddingVertical: 18,
            paddingHorizontal: 18,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          {/* Status & Lokasi */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 6,
            }}
          >
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#22C55E',
                    marginRight: 6,
                    borderWidth: 1,
                    borderColor: 'white',
                  }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Status Komunitas</Text>
              </View>
              <Text style={{ color: '#ffe0e0', fontSize: 12, marginTop: -2 }}>Siaga Normal - Level 1</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: '#ffb3b3', fontSize: 11 }}>Lokasi</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#fff' }}>Sulawesi Selatan</Text>
              <Text style={{ color: '#ffb3b3', fontSize: 11 }}>RT 05/RW 12</Text>
            </View>
          </View>
          {/* Progress Bar */}
          <View style={{ marginVertical: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
              <Text style={{ fontSize: 11, color: '#fff' }}>Tingkat Kesiapsiagaan</Text>
              <Text style={{ fontSize: 11, color: '#fff' }}>89%</Text>
            </View>
            <View
              style={{
                backgroundColor: '#fca5a5',
                height: 8,
                borderRadius: 8,
                overflow: 'hidden',
                marginBottom: 2,
              }}
            >
              <View
                style={{
                  backgroundColor: '#22C55E',
                  height: 8,
                  borderRadius: 8,
                  width: '89%',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Card Statistik (Pisah per Card) */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,
          gap: 3,
        }}
      >
        {[
          { label: 'Warga', value: 156 },
          { label: 'Online', value: 25 },
          { label: 'Laporan', value: 3 },
          { label: 'Bantuan', value: 7 },
        ].map((stat) => (
          <View
            key={stat.label}
            style={{
              backgroundColor: '#d94848',
              borderRadius: 14,
              paddingVertical: 13,
              paddingHorizontal: 18,
              alignItems: 'center',
              minWidth: 75,
              marginHorizontal: 2,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>{stat.value}</Text>
            <Text style={{ color: '#fff', fontSize: 13, marginTop: -2 }}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}