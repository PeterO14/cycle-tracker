import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [periodStartedToday, setPeriodStartedToday] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>CYCLE NOTES</Text>
        <Text style={styles.title}>A calmer way to notice your cycle.</Text>
        <Text style={styles.description}>
          Start with one small action: log when your period begins. Your data
          will stay on your device when local storage is added in the next
          milestone.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>TODAY</Text>
          <Text style={styles.cardDate}>Set your first entry</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: periodStartedToday }}
            onPress={() => setPeriodStartedToday((wasStarted) => !wasStarted)}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>
              {periodStartedToday ? 'Period start logged' : 'My period started today'}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.note}>
          This first screen is intentionally a prototype: it confirms the
          interaction before we add permanent storage, history, and predictions.
        </Text>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 18,
  },
  eyebrow: {
    color: '#A84A5A',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  title: {
    color: '#2F1B23',
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 42,
  },
  description: {
    color: '#604A51',
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#F0D9D5',
    borderRadius: 24,
    borderWidth: 1,
    gap: 10,
    marginTop: 12,
    padding: 22,
  },
  cardLabel: {
    color: '#8D6871',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  cardDate: {
    color: '#2F1B23',
    fontSize: 22,
    fontWeight: '600',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#A84A5A',
    borderRadius: 14,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    color: '#785E65',
    fontSize: 13,
    lineHeight: 19,
  },
});
