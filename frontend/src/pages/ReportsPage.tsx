import { useLoaderData, useRevalidator } from "react-router-dom";
import { fetchReport, fetchReports } from "../http";
import type { ReportType } from "../types/report-type";
import tableClasses from "../styles/Table.module.css";

export async function loader() {
  const response = await fetchReports();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch reports." }));
  }
  const resData = await response.json();

  return resData.reports as ReportType[];
}

const handleRowClick = async (report: ReportType) => {
  try {
    const response = await fetchReport(report.fileName);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', report.fileName);
    document.body.appendChild(link);

    link.click();

    link.parentNode!.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Download failed:', error);
  }
};

export default function ReportsPage() {
  // Use the data loaded by the loader function
  const reports = useLoaderData() as ReportType[];

  const { revalidate, state } = useRevalidator();

  return (
    <div className={tableClasses.tableContainer}>
      <table className={tableClasses.table}>
        <thead>
          <tr>
            <th>Report</th>
            <th>Created At</th>
            <th className={tableClasses.actionCell}>
              <button
                className={tableClasses.actionButton}
                onClick={() => revalidate()}
                disabled={state === "loading"}
              >
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M19.146 4.854l-1.489 1.489A8 8 0 1 0 12 20a8.094 8.094 0 0 0 7.371-4.886 1 1 0 1 0-1.842-.779A6.071 6.071 0 0 1 12 18a6 6 0 1 1 4.243-10.243l-1.39 1.39a.5.5 0 0 0 .354.854H19.5A.5.5 0 0 0 20 9.5V5.207a.5.5 0 0 0-.854-.353z"></path>
                  </g>
                </svg>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.fileName} onClick={() => handleRowClick(report)}>
              <td>{report.fileName}</td>
              <td colSpan={2}>{report.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
