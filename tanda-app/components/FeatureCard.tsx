import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  textColor?: string;
  onPress?: () => void; // optional, agar kompatibel jika dipakai tanpa Link
}

export default function FeatureCard({
  icon,
  title,
  subtitle,
  color,
  textColor = '#fff',
  onPress,
}: Props) {
  return (
    <Pressable style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <Text style={[styles.icon, { color: textColor }]}>{icon}</Text>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>{subtitle}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
  },
});
