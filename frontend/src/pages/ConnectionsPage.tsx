import { Link, useLoaderData, useNavigate } from "react-router-dom";
import type { ConnectionType } from "../types/connection-types";
import { fetchConnections } from "../http";
import tableClasses from "../styles/Table.module.css";

export async function loader() {
  const response = await fetchConnections();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch connections." }));
  }
  const resData = await response.json();

  return resData.connections as ConnectionType[];
}

export default function ConnectionsPage() {
  // Use the data loaded by the loader function
  const connections = useLoaderData() as ConnectionType[];

  const navigate = useNavigate();

  const handleRowClick = (connection: ConnectionType) => {
    navigate(`/connections/${connection.id}`, { state: connection });
  };

  return (
    <div className={tableClasses.tableContainer}>
      <table className={tableClasses.table}>
        <thead>
          <tr>
            <th>Connection ID</th>
            <th>Tag</th>
            <th>DB Type</th>
            <th>Host</th>
            <th>Port</th>
            <th>DB Name</th>
            <th>User</th>
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
          {connections.map((connection) => (
            <tr key={connection.id} onClick={() => handleRowClick(connection)}>
              <td>{connection.id}</td>
              <td>{connection.tag}</td>
              <td>{connection.dbType}</td>
              <td>{connection.host}</td>
              <td>{connection.port}</td>
              <td>{connection.dbName}</td>
              <td>{connection.user}</td>
              <td>{connection.createdAt?.toLocaleString()}</td>
              <td colSpan={2}>{connection.updatedAt?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
