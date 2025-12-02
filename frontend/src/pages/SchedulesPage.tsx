import { Link, useLoaderData } from "react-router-dom";
import classes from "./ConnectionsPage.module.css";
import { fetchSchedules } from "../http";
import type { ScheduleType } from "../types/schedule-type";

export async function loader() {
  const response = await fetchSchedules();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch schedules." }));
  }
  const resData = await response.json();
  
  return resData.schedules as ScheduleType[];
}

export default function SchedulesPage() {
  // Use the data loaded by the loader function
  const schedules = useLoaderData() as ScheduleType[];
  return (
    <ul className={classes.list}>
      {schedules.length === 0 && <p>No schedules yet!</p>}
      {schedules.length > 0 &&
        schedules.map((schedule) => (
          <li key={schedule.id} className={classes.card}>
            <Link to={`${schedule.id}`}>
              <h2>Schedule ID: {schedule.id}</h2>
              <h2>Query ID: {schedule.queryId}</h2>
              <h2>Cron: {schedule.cron}</h2>
              {schedule.createdAt && <h2>Created at: {schedule.createdAt.toLocaleString()}</h2>}
              {schedule.updatedAt && <h2>Updated at: {schedule.updatedAt.toLocaleString()}</h2>}
            </Link>
          </li>
        ))}
    </ul>
  );
}
