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
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                  <g fill="currentColor" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none">
                    <g transform="scale(5.12,5.12)">
                      <path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24,13v11h-11v2h11v11h2v-11h11v-2h-11v-11z"></path>
                    </g>
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
              <td>{schedule.updatedAt?.toLocaleString()}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
