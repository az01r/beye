import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { createConnection } from "../http";
import { validateCreateConnectionAction } from "../util/validators";
import NewConnectionForm from "../components/NewConnectionForm";
import type { ConnectionType } from "../types/connection-types";

export async function action({ request }: ActionFunctionArgs) {
  // const searchParams = new URL(request.url).searchParams;
  // const mode = searchParams.get("mode") || "login";

  // if (mode !== "login" && mode !== "signup") {
  //   throw Response.json({ message: "Unsupported mode." }, { status: 422 });
  // }

  const formData = await request.formData();
  const dbType = formData.get("dbType")!.toString().trim();
  const host = formData.get("host")!.toString().trim();
  const port = formData.get("port")!.toString().trim();
  const dbName = formData.get("dbName")!.toString().trim();
  const user = formData.get("user")!.toString().trim();
  const password = formData.get("password")!.toString().trim();

  const errors = validateCreateConnectionAction({ dbType, host, port, dbName, user, password });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  const connectionData: ConnectionType = { dbType: dbType as "MONGODB" | "MYSQL", host, port: +port, dbName, user, password };
  const response = await createConnection(connectionData);

  if (response.status === 401) {
    // When backend validation fails, it returns a response with an error message
    // This message is managed in the same way of a frontend validation exception
    const resData = await response.json();
    return resData;
  }

  if (!response.ok) {
    throw response;
  }

  return redirect("/connections");
}

export default function NewConnectionPage() {
  return <NewConnectionForm />;
}
