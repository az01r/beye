import { Form, useActionData, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import type { QueryType } from "../types/query-types";
import type { ScheduleType } from "../types/schedule-type";
import formClasses from "../styles/Form.module.css";
import btnClasses from "../styles/Button.module.css";

export default function ScheduleForm({ isEditing }: { isEditing: boolean }) {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422
  const location = useLocation(); // retrieved from the state of the location object: navigate(`/connections/${connection.id}`, { state: connection });
  const schedule = location.state as ScheduleType | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDeleting = navigation.formAction?.includes('destroy') && isSubmitting;

  const queries = useLoaderData() as QueryType[];

  return (
    <div className={formClasses.form}>
      <Form method="post">
        <h1 className={formClasses.formTitle}>{isEditing ? "Edit Schedule" : "New Schedule"}</h1>
        {actionData && actionData.message && (
          <ul className={formClasses.errorList}>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err} className={formClasses.errorItem}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li className={formClasses.errorItem}>{actionData.message}</li>}
          </ul>
        )}
        <div className={formClasses.formGroup}>
          <label htmlFor="queryId" className={formClasses.label}>Query ID</label>
          <select id="queryId" name="queryId" defaultValue={schedule?.queryId} className={formClasses.select}>
            {queries.map(query => (
              <option key={query.id} value={query.id}>Query ID: {query.id}, Connection ID: {query.connectionId}</option>
            ))}
          </select>
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="cron" className={formClasses.label}>Cron</label>
          <input type="text" id="cron" name="cron" required defaultValue={schedule?.cron} className={formClasses.input} />
        </div>
        <div className={formClasses.formActions}>
          {isEditing && (
            <button
              formAction="destroy"
              disabled={isSubmitting}
              className={`${btnClasses.btn} ${btnClasses.btnDanger}`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
          <button disabled={isSubmitting} className={`${btnClasses.btn} ${btnClasses.btnPrimary}`}>
            {isSubmitting && !isDeleting ? "Submitting..." : isEditing ? "Save Changes" : "Create Schedule"}
          </button>
        </div>
      </Form>
    </div>
  );
}
