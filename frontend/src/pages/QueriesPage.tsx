import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { fetchQueries } from "../http";
import type { QueryType } from "../types/query-types";
import tableClasses from "../styles/Table.module.css";

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

  const navigate = useNavigate();

  const handleRowClick = (query: QueryType) => {
    navigate(`/queries/${query.id}`, { state: query });
  };

  return (
    <div className={tableClasses.tableContainer}>
      <table className={tableClasses.table}>
        <thead>
          <tr>
            <th>Query ID</th>
            <th>Tag</th>
            <th>Connection ID</th>
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
          {queries.map((query) => (
            <tr key={query.id} onClick={() => handleRowClick(query)}>
              <td>{query.id}</td>
              <td>{query.tag}</td>
              <td>{query.connectionId}</td>
              <td>{query.createdAt?.toLocaleString()}</td>
              <td colSpan={2}>{query.updatedAt?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
