import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { useCycle } from '../context/CycleContext';
import { formatDate, formatMonth, isDateInPeriod, orderedPeriods, toDateKey } from '../lib/dates';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HistoryScreen() {
  const { periods, removePeriod, startPeriod } = useCycle();
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const today = toDateKey(new Date());
  const firstWeekday = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday + daysInMonth }, (_, index) => index - firstWeekday + 1);

  const selectDate = (day: number) => {
    const dateKey = toDateKey(new Date(month.getFullYear(), month.getMonth(), day));
    const existing = periods.find((period) => period.startDate === dateKey);
    if (existing) {
      Alert.alert('Period start', formatDate(dateKey), [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove entry', style: 'destructive', onPress: () => void removePeriod(existing.id) },
      ]);
      return;
    }
    Alert.alert('Add a period start?', formatDate(dateKey), [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Add start date', onPress: () => void startPeriod(dateKey) },
    ]);
  };

  const changeMonth = (amount: number) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>HISTORY</Text>
      <Text style={styles.title}>Your dates, at a glance.</Text>
      <Text style={styles.description}>Tap a date to add a period start. Tap a start date again to remove it.</Text>

      <View style={styles.calendarCard}>
        <View style={styles.monthHeader}>
          <Pressable accessibilityLabel="Previous month" onPress={() => changeMonth(-1)} style={styles.monthButton}><Text style={styles.monthButtonText}>‹</Text></Pressable>
          <Text style={styles.monthTitle}>{formatMonth(month)}</Text>
          <Pressable accessibilityLabel="Next month" onPress={() => changeMonth(1)} style={styles.monthButton}><Text style={styles.monthButtonText}>›</Text></Pressable>
        </View>
        <View style={styles.weekRow}>{weekdays.map((day, index) => <Text key={`${day}-${index}`} style={styles.weekday}>{day}</Text>)}</View>
        <View style={styles.grid}>
          {cells.map((day, index) => {
            if (day <= 0) return <View key={`blank-${index}`} style={styles.dayCell} />;
            const dateKey = toDateKey(new Date(month.getFullYear(), month.getMonth(), day));
            const isStart = periods.some((period) => period.startDate === dateKey);
            const isPeriodDay = periods.some((period) => isDateInPeriod(period, dateKey, today));
            const isToday = dateKey === today;
            return <Pressable key={dateKey} onPress={() => selectDate(day)} style={[styles.dayCell, isPeriodDay && styles.periodDay, isStart && styles.startDay, isToday && styles.today]}><Text style={[styles.dayText, isStart && styles.startDayText]}>{day}</Text></Pressable>;
          })}
        </View>
      </View>

      <Text style={styles.sectionTitle}>PERIOD STARTS</Text>
      {orderedPeriods(periods).length === 0 ? (
        <Text style={styles.empty}>No dates logged yet.</Text>
      ) : orderedPeriods(periods).map((period) => (
        <View key={period.id} style={styles.entry}>
          <View><Text style={styles.entryDate}>{formatDate(period.startDate)}</Text><Text style={styles.entryDetail}>{period.endDate ? `Ended ${formatDate(period.endDate)}` : 'Currently in progress'}</Text></View>
          <Pressable onPress={() => void removePeriod(period.id)} hitSlop={10}><Text style={styles.remove}>Remove</Text></Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF8F5', flexGrow: 1, gap: 16, padding: 24, paddingTop: 64 },
  eyebrow: { color: '#A84A5A', fontSize: 12, fontWeight: '700', letterSpacing: 1.6 },
  title: { color: '#2F1B23', fontSize: 30, fontWeight: '700', letterSpacing: -0.6 },
  description: { color: '#604A51', fontSize: 15, lineHeight: 22 },
  calendarCard: { backgroundColor: '#FFFFFF', borderColor: '#F0D9D5', borderRadius: 22, borderWidth: 1, gap: 12, padding: 16 },
  monthHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  monthButton: { alignItems: 'center', height: 36, justifyContent: 'center', width: 36 },
  monthButtonText: { color: '#A84A5A', fontSize: 30, lineHeight: 32 },
  monthTitle: { color: '#2F1B23', fontSize: 17, fontWeight: '700' },
  weekRow: { flexDirection: 'row' },
  weekday: { color: '#8D6871', flex: 1, fontSize: 12, fontWeight: '700', textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { alignItems: 'center', borderRadius: 16, height: 42, justifyContent: 'center', width: '14.2857%' },
  dayText: { color: '#40282E', fontSize: 14, fontWeight: '600' },
  periodDay: { backgroundColor: '#FBE4E0' },
  startDay: { backgroundColor: '#A84A5A' },
  startDayText: { color: '#FFFFFF' },
  today: { borderColor: '#A84A5A', borderWidth: 1 },
  sectionTitle: { color: '#8D6871', fontSize: 12, fontWeight: '700', letterSpacing: 1.2, marginTop: 8 },
  empty: { color: '#80656C', fontSize: 15 },
  entry: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#F0D9D5', borderRadius: 16, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
  entryDate: { color: '#2F1B23', fontSize: 16, fontWeight: '700' },
  entryDetail: { color: '#80656C', fontSize: 13, marginTop: 4 },
  remove: { color: '#A84A5A', fontSize: 14, fontWeight: '700' },
});
