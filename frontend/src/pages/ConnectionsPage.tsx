import { Link, useLoaderData } from "react-router-dom";
import type { ConnectionType } from "../types/connection-types";
import classes from "./ConnectionsPage.module.css";
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
  return (
    <ul className={classes.list}>
      {connections.length === 0 && <p>No connections yet!</p>}
      {connections.length > 0 &&
        connections.map((connection) => (
          <li key={connection.id} className={classes.card}>
            <Link to={`${connection.id}`}>
              <h2>Connection ID: {connection.id}</h2>
              <h2>DB Type: {connection.dbType}</h2>
              <h2>Host: {connection.host}</h2>
              <h2>Port: {connection.port}</h2>
              <h2>DB Name: {connection.dbName}</h2>
              <h2>User: {connection.user}</h2>
              {connection.createdAt && <h2>Created at: {connection.createdAt.toLocaleString()}</h2>}
              {connection.updatedAt && <h2>Updated at: {connection.updatedAt.toLocaleString()}</h2>}
            </Link>
          </li>
        ))}
    </ul>
  );
}
