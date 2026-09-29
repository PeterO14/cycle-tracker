import { Alert, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { useCycle } from '../context/CycleContext';

export default function SettingsScreen() {
  const { periods, settings, setCycleLength, clearAllData, exportData } = useCycle();
  const [cycleLength, setLength] = useState(settings.cycleLength?.toString() ?? '');

  const saveLength = () => {
    const value = Number(cycleLength);
    if (!cycleLength) {
      void setCycleLength(undefined);
      return;
    }
    if (!Number.isInteger(value) || value < 15 || value > 60) {
      Alert.alert('Choose a number from 15 to 60 days.');
      return;
    }
    void setCycleLength(value);
  };

  const shareData = () => {
    Alert.alert('Share your data?', 'Your cycle entries are sensitive. Only share them with a person or service you trust.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Share', onPress: () => void Share.share({ message: exportData(), title: 'Cycle Notes export' }) },
    ]);
  };

  const eraseData = () => {
    Alert.alert('Delete all cycle data?', 'This removes every saved period date and setting from this device. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete all data', style: 'destructive', onPress: () => void clearAllData() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>SETTINGS</Text>
      <Text style={styles.title}>Keep it yours.</Text>
      <Text style={styles.description}>Cycle Notes stores {periods.length === 1 ? '1 period' : `${periods.length} periods`} only on this device.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Typical cycle length</Text>
        <Text style={styles.cardText}>Optional. Use this before you have enough history for a personal estimate.</Text>
        <View style={styles.inputRow}>
          <TextInput value={cycleLength} onChangeText={setLength} keyboardType="number-pad" maxLength={2} placeholder="28" placeholderTextColor="#A98E95" style={styles.input} accessibilityLabel="Typical cycle length in days" />
          <Text style={styles.days}>days</Text>
          <Pressable onPress={saveLength} style={styles.saveButton}><Text style={styles.saveText}>Save</Text></Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your data</Text>
        <Text style={styles.cardText}>There are no accounts, analytics, or cloud backups in this version.</Text>
        <Pressable onPress={shareData} style={styles.secondaryButton}><Text style={styles.secondaryText}>Export data</Text></Pressable>
        <Pressable onPress={eraseData} style={styles.dangerButton}><Text style={styles.dangerText}>Delete all data</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF8F5', flexGrow: 1, gap: 16, padding: 24, paddingTop: 64 },
  eyebrow: { color: '#A84A5A', fontSize: 12, fontWeight: '700', letterSpacing: 1.6 },
  title: { color: '#2F1B23', fontSize: 30, fontWeight: '700', letterSpacing: -0.6 },
  description: { color: '#604A51', fontSize: 15, lineHeight: 22, marginBottom: 8 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#F0D9D5', borderRadius: 20, borderWidth: 1, gap: 10, padding: 18 },
  cardTitle: { color: '#2F1B23', fontSize: 17, fontWeight: '700' },
  cardText: { color: '#604A51', fontSize: 14, lineHeight: 20 },
  inputRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 4 },
  input: { backgroundColor: '#FFF8F5', borderColor: '#E8CDC9', borderRadius: 10, borderWidth: 1, color: '#2F1B23', fontSize: 16, paddingHorizontal: 12, paddingVertical: 10, width: 62 },
  days: { color: '#604A51', flex: 1, fontSize: 15 },
  saveButton: { backgroundColor: '#A84A5A', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 11 },
  saveText: { color: '#FFFFFF', fontWeight: '700' },
  secondaryButton: { alignItems: 'center', borderColor: '#A84A5A', borderRadius: 12, borderWidth: 1, marginTop: 6, padding: 13 },
  secondaryText: { color: '#A84A5A', fontWeight: '700' },
  dangerButton: { alignItems: 'center', marginTop: 2, padding: 12 },
  dangerText: { color: '#A84A5A', fontWeight: '700' },
});
