import { Request, Response } from "express";

import db from "../database/connection";

import convertHourToMinutes from "../utils/convertHourToMinutes";

import UserRepository from "../repository/UserRepository";
import ClassRepository from "../repository/ClassRepository";
import ScheduleRepository from "../repository/ScheduleRepository";

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [+week_day])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule, email, password } = request.body;

    const userRepository = new UserRepository();
    const classRepository = new ClassRepository();
    const scheduleRepository = new ScheduleRepository();

    const { id: user_id } = await userRepository.createUser({
      name,
      avatar,
      whatsapp,
      bio,
      email,
      password,
    });

    return user_id;


    const classRepResponse = await classRepository.createClass({
      subject,
      cost,
      user_id,
    });
  }
}
