import { Form, useActionData, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import classes from "./AuthForm.module.css";
import type { QueryType } from "../types/query-types";
import type { ScheduleType } from "../types/schedule-type";

export default function ScheduleForm({ isEditing }: { isEditing: boolean }) {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422
  const location = useLocation(); // retrieved from the state of the location object: navigate(`/connections/${connection.id}`, { state: connection });
  const schedule = location.state as ScheduleType | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDeleting = navigation.formAction?.includes('destroy') && isSubmitting;

  const queries = useLoaderData() as QueryType[];

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isEditing ? "Edit Schedule" : "New Schedule"}</h1>
        {actionData && actionData.message && (
          <ul>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li>{actionData.message}</li>}
          </ul>
        )}
        <p>
          <label htmlFor="queryId">Query ID</label>
          <select id="queryId" name="queryId" defaultValue={schedule?.queryId}>
            {queries.map(query => (
              <option key={query.id} value={query.id}>Query ID: {query.id}, Connection ID: {query.connectionId}</option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="cron">Cron</label>
          <input type="text" id="cron" name="cron" required defaultValue={schedule?.cron} />
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
            {isSubmitting && !isDeleting ? "Submitting..." : isEditing ? "Save Changes" : "Create Schedule"}
          </button>
        </div>
      </Form>
    </>
  );
}
