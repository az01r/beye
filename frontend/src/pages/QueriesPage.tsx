import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { fetchQueries } from "../http";
import type { QueryType } from "../types/query-types";

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
    <table>
      <thead>
        <tr>
          <th>Query ID</th>
          <th>Connection ID</th>
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
        {queries.map((query) => (
          <tr key={query.id} onClick={() => handleRowClick(query)}>
            <td>{query.id}</td>
            <td>{query.connectionId}</td>
            <td>{query.createdAt?.toLocaleString()}</td>
            <td>{query.updatedAt?.toLocaleString()}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>

    // <ul className={classes.list}>
    //   {queries.length === 0 && <p>No queries yet!</p>}
    //   {queries.length > 0 &&
    //     queries.map((query) => (
    //       <li key={query.id} className={classes.card}>
    //         <Link to={`${query.id}`}>
    //           <h2>Query ID: {query.id}</h2>
    //           <h2>Connection ID: {query.connectionId}</h2>
    //           <textarea readOnly>{query.query}</textarea>
    //           {query.createdAt && <h2>Created at: {query.createdAt.toLocaleString()}</h2>}
    //           {query.updatedAt && <h2>Updated at: {query.updatedAt.toLocaleString()}</h2>}
    //         </Link>
    //       </li>
    //     ))}
    // </ul>
  );
}
