import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

import { Schedule, ScheduleItem } from "../interfaces/ScheduleInterfaces";

export default class ScheduleRepository {
  async createUser(scheduleObj: Schedule) {
    const trx = await db.transaction();

    const { schedule, class_id } = scheduleObj;

    try {
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        };
      });

      const insertedSchedulesIds = await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return { id: insertedSchedulesIds, trxSuccessfull: true };
    } catch (error) {
      await trx.rollback();
      console.error(error);

      return {
        trxSuccessfull: false,
        error,
      };
    }
  }
}
