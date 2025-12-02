import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { authFunction } from "../http";
import type { AuthType } from "../types/auth-types";
import { setAuthToken } from "../util/auth";
import AuthForm from "../components/AuthForm";
import { validateAuthAction } from "../util/validators";

export async function action({ request }: ActionFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw Response.json({ message: "Unsupported mode." }, { status: 422 });
  }

  const formData = await request.formData();
  const email = formData.get("email")!.toString().trim();
  const password = formData.get("password")!.toString().trim();

  const errors = validateAuthAction({ email, password });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  const authData: AuthType = { email, password };
  const response = await authFunction(authData, mode);

  if (response.status === 401) {
    // When backend validation fails, it returns a response with an error message
    // This message is managed in the same way of a frontend validation exception
    const resData = await response.json();
    return resData;
  }

  if (!response.ok) {
    throw response;
  }

  const resData = await response.json();
  const token = resData.jwt;
  setAuthToken(token);

  return redirect("/connections");
}

export default function AuthPage() {
  return <AuthForm />;
}
