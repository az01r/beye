import { Form, useActionData, useLocation, useNavigation } from "react-router-dom";
import type { ConnectionType } from "../types/connection-types";
import formClasses from "../styles/Form.module.css";
import btnClasses from "../styles/Button.module.css";

export default function ConnectionForm({ isEditing }: { isEditing: boolean }) {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422
  const location = useLocation(); // retrieved from the state of the location object: navigate(`/connections/${connection.id}`, { state: connection });
  const connection = location.state as ConnectionType | undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDeleting = navigation.formAction?.includes('destroy') && isSubmitting;

  return (
    <div className={formClasses.form}>
      <Form method="post">
        <h1 className={formClasses.formTitle}>{isEditing ? "Edit Connection" : "New Connection"}</h1>
        {actionData && actionData.message && (
          <ul className={formClasses.errorList}>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err} className={formClasses.errorItem}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li className={formClasses.errorItem}>{actionData.message}</li>}
          </ul>
        )}
        <div className={formClasses.formGroup}>
          <label htmlFor="dbType" className={formClasses.label}>Database Type</label>
          <select id="dbType" name="dbType" defaultValue={connection?.dbType} className={formClasses.select}>
            <option value="MYSQL">MySql</option>
            <option value="MONGODB">MongoDB</option>
          </select>
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="host" className={formClasses.label}>Host</label>
          <input id="host" type="text" name="host" required defaultValue={connection?.host} className={formClasses.input} />
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="port" className={formClasses.label}>Port</label>
          <input id="port" type="number" name="port" required defaultValue={connection?.port} className={formClasses.input} />
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="dbName" className={formClasses.label}>Database Name</label>
          <input id="dbName" type="text" name="dbName" required defaultValue={connection?.dbName} className={formClasses.input} />
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="user" className={formClasses.label}>User</label>
          <input id="user" type="text" name="user" required defaultValue={connection?.user} autoComplete="new-password" className={formClasses.input} />
        </div>
        <div className={formClasses.formGroup}>
          <label htmlFor="password" className={formClasses.label}>Password</label>
          <input id="password" type="password" name="password" required defaultValue={connection?.password} autoComplete="new-password" className={formClasses.input} />
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
            {isSubmitting && !isDeleting ? "Submitting..." : isEditing ? "Save Changes" : "Create Connection"}
          </button>
        </div>
      </Form>
    </div>
  );
}
