import { Link, useLoaderData } from "react-router-dom";
import classes from "./ConnectionsPage.module.css";
import { fetchQueries } from "../http";
import type { QueryType } from "../types/query-type";

export async function loader() {
  const response = await fetchQueries();
  if (!response.ok) {
    throw new Response(JSON.stringify({ errors: "Failed to fetch queries." }));
  }
  const resData = await response.json();
  
  return resData.queries as QueryType[];
}

export default function QueriesPage() {
  // Use the data loaded by the loader function
  const queries = useLoaderData() as QueryType[];
  return (
    <ul className={classes.list}>
      {queries.length === 0 && <p>No queries yet!</p>}
      {queries.length > 0 &&
        queries.map((query) => (
          <li key={query.id} className={classes.card}>
            <Link to={`${query.id}`}>
              <h2>Query ID: {query.id}</h2>
              <h2>Connection ID: {query.connectionId}</h2>
              <textarea readOnly>{query.query}</textarea>
              {query.createdAt && <h2>Created at: {query.createdAt.toLocaleString()}</h2>}
              {query.updatedAt && <h2>Updated at: {query.updatedAt.toLocaleString()}</h2>}
            </Link>
          </li>
        ))}
    </ul>
  );
}
