import AsyncStorage from '@react-native-async-storage/async-storage';

import { CycleData } from '../types/cycle';

const storageKey = '@cycle-notes/data-v1';

const emptyData: CycleData = { periods: [], settings: {}, profile: {} };

export async function loadCycleData(): Promise<CycleData> {
  const saved = await AsyncStorage.getItem(storageKey);
  if (!saved) return emptyData;

  try {
    const data = JSON.parse(saved) as Partial<CycleData>;
    return {
      periods: Array.isArray(data.periods) ? data.periods : [],
      settings: data.settings ?? {},
      profile: data.profile ?? {},
    };
  } catch {
    return emptyData;
  }
}

export function saveCycleData(data: CycleData) {
  return AsyncStorage.setItem(storageKey, JSON.stringify(data));
}
