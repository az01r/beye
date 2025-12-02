import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./AuthForm.module.css";

export default function NewConnectionForm() {

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>New Connection</h1>
        {actionData && actionData.message && (
          <ul>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li>{actionData.message}</li>}
          </ul>
        )}
        <p>
          <label htmlFor="dbType">Database Type</label>
          <select id="dbType" name="dbType">
            <option value="MYSQL">MySql</option>
            <option value="MONGODB">MongoDB</option>
          </select>
        </p>
        <p>
          <label htmlFor="host">Host</label>
          <input id="host" type="text" name="host" required />
        </p>
        <p>
          <label htmlFor="port">Port</label>
          <input id="port" type="number" name="port" required />
        </p>
        <p>
          <label htmlFor="dbName">Database Name</label>
          <input id="dbName" type="text" name="dbName" required />
        </p>
        <p>
          <label htmlFor="user">User</label>
          <input id="user" type="text" name="user" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Create"}
          </button>
        </div>
      </Form>
    </>
  );
}
