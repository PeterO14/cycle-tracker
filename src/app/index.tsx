import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useCycle } from '../context/CycleContext';
import { addDays, averageCycleLength, daysBetween, formatDate, latestPeriod, toDateKey } from '../lib/dates';

const todayKey = () => toDateKey(new Date());

export default function TodayScreen() {
  const { periods, settings, isLoading, startPeriod, endCurrentPeriod } = useCycle();
  const today = todayKey();
  const latest = latestPeriod(periods);
  const cycleLength = averageCycleLength(periods, settings.cycleLength);
  const currentCycleDay = latest ? daysBetween(latest.startDate, today) + 1 : undefined;
  const currentPeriod = latest && !latest.endDate ? latest : undefined;
  const estimatedStart = latest && cycleLength ? addDays(latest.startDate, cycleLength) : undefined;

  const logToday = () => {
    if (currentPeriod) {
      Alert.alert('End period today?', 'This will mark today as the last day of this period.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End period', onPress: () => void endCurrentPeriod(today) },
      ]);
      return;
    }

    Alert.alert('Start a new period today?', 'You can change or remove this later in History.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Start period', onPress: () => void startPeriod(today) },
    ]);
  };

  if (isLoading) return <View style={styles.loading}><Text>Loading your cycle…</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>CYCLE NOTES</Text>
      <Text style={styles.title}>{currentPeriod ? 'You are on your period.' : 'Today, simply.'}</Text>
      <Text style={styles.description}>
        {latest
          ? `Your last period began ${formatDate(latest.startDate)}.`
          : 'Start by logging the first day of your next period.'}
      </Text>

      <View style={styles.primaryCard}>
        <Text style={styles.label}>TODAY</Text>
        <Text style={styles.primaryValue}>
          {currentCycleDay ? `Cycle day ${currentCycleDay}` : 'No cycle logged yet'}
        </Text>
        <Pressable accessibilityRole="button" onPress={logToday} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
          <Text style={styles.buttonText}>{currentPeriod ? 'My period ended today' : 'My period started today'}</Text>
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>NEXT PERIOD</Text>
          <Text style={styles.summaryValue}>{estimatedStart ? formatDate(estimatedStart) : 'Not enough data'}</Text>
          <Text style={styles.summaryNote}>{estimatedStart ? 'An estimate, not a promise.' : 'Log two starts to see an estimate.'}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>CYCLE LENGTH</Text>
          <Text style={styles.summaryValue}>{cycleLength ? `${cycleLength} days` : '—'}</Text>
          <Text style={styles.summaryNote}>{settings.cycleLength ? 'Your chosen setting.' : 'Based on start dates.'}</Text>
        </View>
      </View>

      <Text style={styles.privacy}>Your entries are stored only on this device.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF8F5', flexGrow: 1, gap: 18, padding: 24, paddingTop: 64 },
  loading: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  eyebrow: { color: '#A84A5A', fontSize: 12, fontWeight: '700', letterSpacing: 1.6 },
  title: { color: '#2F1B23', fontSize: 34, fontWeight: '700', letterSpacing: -0.8, lineHeight: 40 },
  description: { color: '#604A51', fontSize: 16, lineHeight: 24 },
  primaryCard: { backgroundColor: '#FFFFFF', borderColor: '#F0D9D5', borderRadius: 24, borderWidth: 1, gap: 12, marginTop: 8, padding: 22 },
  label: { color: '#8D6871', fontSize: 11, fontWeight: '700', letterSpacing: 1.1 },
  primaryValue: { color: '#2F1B23', fontSize: 25, fontWeight: '700' },
  button: { alignItems: 'center', backgroundColor: '#A84A5A', borderRadius: 14, marginTop: 8, padding: 16 },
  pressed: { opacity: 0.78 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', gap: 12 },
  summaryCard: { backgroundColor: '#F9EDEA', borderRadius: 18, flex: 1, gap: 8, padding: 16 },
  summaryValue: { color: '#41252C', fontSize: 17, fontWeight: '700', lineHeight: 22 },
  summaryNote: { color: '#80656C', fontSize: 12, lineHeight: 17 },
  privacy: { color: '#80656C', fontSize: 13, lineHeight: 19, marginTop: 'auto', textAlign: 'center' },
});
