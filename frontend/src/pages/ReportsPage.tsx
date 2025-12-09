import { useLoaderData } from "react-router-dom";
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

export default function ReportsPage() {
  // Use the data loaded by the loader function
  const reports = useLoaderData() as ReportType[];

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

  return (
    <div className={tableClasses.tableContainer}>
      <table className={tableClasses.table}>
        <thead>
          <tr>
            <th>Report</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.fileName} onClick={() => handleRowClick(report)}>
              <td>{report.fileName}</td>
              <td>{report.createdAt.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
