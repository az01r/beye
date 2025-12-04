import { Form, useActionData, useLoaderData, useLocation, useNavigation } from "react-router-dom";
import type { QueryType } from "../types/query-types";
import type { ConnectionType } from "../types/connection-types";
import formClasses from "../styles/Form.module.css";
import btnClasses from "../styles/Button.module.css";

export default function QueryForm({ isEditing }: { isEditing: boolean }) {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422
  const location = useLocation(); // retrieved from the state of the location object: navigate(`/connections/${connection.id}`, { state: connection });
  const query = location.state as QueryType | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDeleting = navigation.formAction?.includes('destroy') && isSubmitting;

  const connections = useLoaderData() as ConnectionType[];

  return (
    <div className={formClasses.form}>
      <Form method="post">
        <h1 className={formClasses.formTitle}>{isEditing ? "Edit Query" : "New Query"}</h1>
        {actionData && actionData.message && (
          <ul className={formClasses.errorList}>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err} className={formClasses.errorItem}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li className={formClasses.errorItem}>{actionData.message}</li>}
          </ul>
        )}
        <div className={formClasses.formGroup}>
          <label htmlFor="connectionId" className={formClasses.label}>Connection ID</label>
          <select id="connectionId" name="connectionId" defaultValue={query?.connectionId} className={formClasses.select}>
            {connections.map(connection => (
              <option key={connection.id} value={connection.id}>{connection.id}, {connection.dbType}, {connection.dbName}</option>
            ))}
          </select>
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="query" className={formClasses.label}>Query</label>
          <textarea id="query" name="query" required defaultValue={query?.query} className={formClasses.textarea} />
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
            {isSubmitting && !isDeleting ? "Submitting..." : isEditing ? "Save Changes" : "Create Query"}
          </button>
        </div>
      </Form>
    </div>
  );
}
