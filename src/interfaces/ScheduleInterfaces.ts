interface Schedule {
  schedule: [ScheduleItem];
  class_id: "number";
}

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export { Schedule, ScheduleItem };
