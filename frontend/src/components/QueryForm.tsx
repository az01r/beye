import { Form, useActionData, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import classes from "./AuthForm.module.css";
import type { QueryType } from "../types/query-types";
import type { ConnectionType } from "../types/connection-types";

export default function QueryForm({ isEditing }: { isEditing: boolean }) {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422
  const location = useLocation(); // retrieved from the state of the location object: navigate(`/connections/${connection.id}`, { state: connection });
  const query = location.state as QueryType | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDeleting = navigation.formAction?.includes('destroy') && isSubmitting;

  const connections = useLoaderData() as ConnectionType[];

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isEditing ? "Edit Query" : "New Query"}</h1>
        {actionData && actionData.message && (
          <ul>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li>{actionData.message}</li>}
          </ul>
        )}
        <p>
          <label htmlFor="connectionId">Connection ID</label>
          <select id="connectionId" name="connectionId" defaultValue={query?.connectionId}>
            {connections.map(connection => (
              <option key={connection.id} value={connection.id}>{connection.id}, {connection.dbType}, {connection.dbName}</option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="query">Query</label>
          <textarea id="query" name="query" required defaultValue={query?.query} />
        </p>
        <div className={classes.actions}>
          {isEditing && (
            <button
              formAction="destroy"
              className={classes.deleteButton}
              disabled={isSubmitting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
          <button disabled={isSubmitting}>
            {isSubmitting && !isDeleting ? "Submitting..." : isEditing ? "Save Changes" : "Create Query"}
          </button>
        </div>
      </Form>
    </>
  );
}
