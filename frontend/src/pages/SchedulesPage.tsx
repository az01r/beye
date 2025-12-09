import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { fetchSchedules } from "../http";
import type { ScheduleType } from "../types/schedule-type";
import tableClasses from "../styles/Table.module.css";

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

  const navigate = useNavigate();

  const handleRowClick = (schedule: ScheduleType) => {
    navigate(`/schedules/${schedule.id}`, { state: schedule });
  };

  return (
    <div className={tableClasses.tableContainer}>
      <table className={tableClasses.table}>
        <thead>
          <tr>
            <th>Schedule ID</th>
            <th>Tag</th>
            <th>Query ID</th>
            <th>Cron</th>
            <th>File format</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th className={tableClasses.actionCell}>
              <Link to="new" className={tableClasses.actionButton}>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M13 11h7a1 1 0 0 1 0 2h-7v7a1 1 0 0 1-2 0v-7H4a1 1 0 0 1 0-2h7V4a1 1 0 0 1 2 0v7z"></path>
                  </g>
                </svg>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} onClick={() => handleRowClick(schedule)}>
              <td>{schedule.id}</td>
              <td>{schedule.tag}</td>
              <td>{schedule.queryId}</td>
              <td>{schedule.cron}</td>
              <td>{schedule.fileFormat}</td>
              <td>{schedule.createdAt?.toLocaleString()}</td>
              <td colSpan={2}>{schedule.updatedAt?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
