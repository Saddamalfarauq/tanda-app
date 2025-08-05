// BottomNavBar.tsx
import { LucideAlertTriangle, LucideHome, LucideLifeBuoy, LucideMapPin, LucideVolume2 } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type TabKey = 'Home' | 'Lapor' | 'Broadcast' | 'Bantuan' | 'Peta';

const TABS: TabKey[] = ['Home', 'Lapor', 'Broadcast', 'Bantuan', 'Peta'];

const iconMap: Record<TabKey, React.ComponentType<{ color: string; size: number }>> = {
  Home: LucideHome,
  Lapor: LucideAlertTriangle,
  Broadcast: LucideVolume2,
  Bantuan: LucideLifeBuoy,
  Peta: LucideMapPin,
};

interface BottomNavBarProps {
  active: TabKey;
  onTabPress: (tab: TabKey) => void;
  badges?: Partial<Record<TabKey, number>>;
}

export default function BottomNavBar({ active, onTabPress, badges }: BottomNavBarProps) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', justifyContent: 'space-around', paddingVertical: 6, elevation: 10 }}>
      {TABS.map(tab => {
        const Icon = iconMap[tab];
        const isActive = active === tab;
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabPress(tab)}
            style={{ alignItems: 'center', flex: 1 }}
            activeOpacity={0.7}
          >
            <View style={{ position: 'relative' }}>
              <Icon color={isActive ? '#dc2626' : '#94a3b8'} size={26} />
              {!!badges?.[tab] && (
                <View style={{
                  position: 'absolute',
                  top: -7,
                  right: -10,
                  backgroundColor:
                    tab === 'Lapor' ? '#dc2626' :
                    tab === 'Broadcast' ? '#facc15' :
                    tab === 'Bantuan' ? '#3b82f6' :
                    '#22c55e',
                  borderRadius: 8,
                  minWidth: 18,
                  paddingHorizontal: 4,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: '#fff',
                }}>
                  <Text style={{
                    color:
                      tab === 'Broadcast' ? '#7c2d12' :
                      tab === 'Bantuan' ? '#fff' :
                      '#fff',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}>{badges[tab]}</Text>
                </View>
              )}
            </View>
            <Text style={{ color: isActive ? '#dc2626' : '#94a3b8', fontSize: 13, marginTop: 2, fontWeight: isActive ? 'bold' : 'normal' }}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
