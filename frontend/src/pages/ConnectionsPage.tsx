import { Link, useLoaderData, useNavigate } from "react-router-dom";
import type { ConnectionType } from "../types/connection-types";
import { fetchConnections } from "../http";

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
    <table>
      <thead>
        <tr>
          <th>Connection ID</th>
          <th>DB Type</th>
          <th>Host</th>
          <th>Port</th>
          <th>DB Name</th>
          <th>User</th>
          <th>Created at</th>
          <th>Updated at</th>
          <th>
            <Link to="new">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                <g fill={"var(--color-text)"} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" style={{ mixBlendMode: "normal" }}>
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
        {connections.map((connection) => (
          <tr key={connection.id} onClick={() => handleRowClick(connection)}>
            <td>{connection.id}</td>
            <td>{connection.dbType}</td>
            <td>{connection.host}</td>
            <td>{connection.port}</td>
            <td>{connection.dbName}</td>
            <td>{connection.user}</td>
            <td>{connection.createdAt?.toLocaleString()}</td>
            <td>{connection.updatedAt?.toLocaleString()}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
