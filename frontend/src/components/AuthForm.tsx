import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import formClasses from "../styles/Form.module.css";
import btnClasses from "../styles/Button.module.css";

export default function AuthForm() {
  const [searchParams/*, setSearchParams*/] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const actionData: { message: string[] | string } | undefined = useActionData(); // retrieved from the response after form submit when status === 401 or 422

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className={formClasses.form}>
      <Form method="post">
        <h1 className={formClasses.formTitle}>{isLogin ? "Log in" : "Sign up"}</h1>
        {actionData && actionData.message && (
          <ul className={formClasses.errorList}>
            {Array.isArray(actionData.message) && actionData.message.map((err) => (
              <li key={err} className={formClasses.errorItem}>{err}</li>
            ))}
            {typeof actionData.message === "string" && <li className={formClasses.errorItem}>{actionData.message}</li>}
          </ul>
        )}
        <div className={formClasses.formGroup}>
          <label htmlFor="email" className={formClasses.label}>Email</label>
          <input id="email" type="email" name="email" required className={formClasses.input} />
        </div>
        {!isLogin && (
          <div className={formClasses.formGroup}>
            <label htmlFor="nickname" className={formClasses.label}>Nickname</label>
            <input id="nickname" type="text" name="nickname" required className={formClasses.input} />
          </div>
        )}
        <div className={formClasses.formGroup}>
          <label htmlFor="password" className={formClasses.label}>Password</label>
          <input id="password" type="password" name="password" required className={formClasses.input} />
        </div>
        <div className={formClasses.formActions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} className={`${btnClasses.btn} ${btnClasses.btnSecondary}`}>
            {isLogin ? "Signup" : "Login"}
          </Link>
          <button disabled={isSubmitting} className={`${btnClasses.btn} ${btnClasses.btnPrimary}`}>
            {isSubmitting ? "Submitting" : isLogin ? "Login" : "Signup"}
          </button>
        </div>
      </Form>
    </div>
  );
}
