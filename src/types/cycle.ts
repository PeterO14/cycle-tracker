export type Period = {
  id: string;
  startDate: string;
  endDate?: string;
};

export type CycleSettings = {
  cycleLength?: number;
};

export type CycleProfile = {
  displayName?: string;
};

export type CycleData = {
  periods: Period[];
  settings: CycleSettings;
  profile: CycleProfile;
};
