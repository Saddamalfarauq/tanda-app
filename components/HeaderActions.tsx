// HeaderActions.tsx
import { Bell, UserCheck } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  notifCount?: number;
  onNotifPress?: () => void;
  onProfilePress?: () => void;
};

export default function HeaderActions({ notifCount = 0, onNotifPress, onProfilePress }: Props) {
  return (
    <View style={{ flexDirection: 'row', gap: 14 }}>
      <TouchableOpacity
        onPress={onNotifPress}
        style={{
          backgroundColor: "#fff2",
          padding: 12,
          borderRadius: 40,
          position: "relative",
          marginRight: 6,
        }}
      >
        <Bell color="white" size={24} />
        {notifCount > 0 && (
          <View style={{
            position: "absolute",
            top: 5, right: 5,
            backgroundColor: "#FACC15",
            borderRadius: 10,
            width: 20, height: 20,
            alignItems: "center", justifyContent: "center",
            borderWidth: 2, borderColor: "#dc2626"
          }}>
            <Text style={{ color: "#7F1D1D", fontWeight: "bold", fontSize: 13 }}>{notifCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onProfilePress}
        style={{
          backgroundColor: "#fff2",
          padding: 12,
          borderRadius: 40,
        }}
      >
        <UserCheck color="white" size={24} />
      </TouchableOpacity>
    </View>
  );
}
