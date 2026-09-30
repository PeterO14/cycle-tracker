import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

import { loadCycleData, saveCycleData } from '../lib/storage';
import { CycleData, Period } from '../types/cycle';

type CycleContextValue = CycleData & {
  isLoading: boolean;
  startPeriod: (dateKey: string) => Promise<void>;
  endCurrentPeriod: (dateKey: string) => Promise<void>;
  removePeriod: (id: string) => Promise<void>;
  setDisplayName: (displayName?: string) => Promise<void>;
  setCycleLength: (cycleLength?: number) => Promise<void>;
  clearAllData: () => Promise<void>;
  exportData: () => string;
};

const CycleContext = createContext<CycleContextValue | undefined>(undefined);

const initialData: CycleData = { periods: [], settings: {}, profile: {} };

export function CycleProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<CycleData>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCycleData().then((saved) => {
      setData(saved);
      setIsLoading(false);
    });
  }, []);

  const updateData = async (nextData: CycleData) => {
    setData(nextData);
    await saveCycleData(nextData);
  };

  const value = useMemo<CycleContextValue>(() => ({
    ...data,
    isLoading,
    async startPeriod(dateKey) {
      if (data.periods.some((period) => period.startDate === dateKey)) return;
      const period: Period = { id: `${dateKey}-${Date.now()}`, startDate: dateKey };
      await updateData({ ...data, periods: [...data.periods, period] });
    },
    async endCurrentPeriod(dateKey) {
      const current = [...data.periods]
        .filter((period) => !period.endDate && period.startDate <= dateKey)
        .sort((first, second) => second.startDate.localeCompare(first.startDate))[0];
      if (!current) return;
      await updateData({
        ...data,
        periods: data.periods.map((period) =>
          period.id === current.id ? { ...period, endDate: dateKey } : period,
        ),
      });
    },
    async removePeriod(id) {
      await updateData({ ...data, periods: data.periods.filter((period) => period.id !== id) });
    },
    async setDisplayName(displayName) {
      await updateData({ ...data, profile: { ...data.profile, displayName } });
    },
    async setCycleLength(cycleLength) {
      await updateData({ ...data, settings: { ...data.settings, cycleLength } });
    },
    async clearAllData() {
      await updateData(initialData);
    },
    exportData() {
      return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), ...data }, null, 2);
    },
  }), [data, isLoading]);

  return <CycleContext.Provider value={value}>{children}</CycleContext.Provider>;
}

export function useCycle() {
  const context = useContext(CycleContext);
  if (!context) throw new Error('useCycle must be used within CycleProvider');
  return context;
}
