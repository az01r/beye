import { redirect, useParams, type ActionFunctionArgs } from "react-router-dom";
import { createConnection, deleteConnection, updateConnection } from "../http";
import { validateCreateConnectionAction } from "../util/validators";
import ConnectionForm from "../components/ConnectionForm";
import type { CreateConnectionType, EditConnectionType } from "../types/connection-types";
import { isNumeric } from "../util/validation";

export async function action({ request, params }: ActionFunctionArgs) {
  const connectionId = params.connectionId;
  const isEditing = !!(connectionId && isNumeric(connectionId));

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

  let response;
  if (isEditing) {
    const connectionData: EditConnectionType = { dbType: dbType as "MONGODB" | "MYSQL", host, port: +port, dbName, user, password, id: +connectionId };
    response = await updateConnection(connectionData);
  } else {
    const connectionData: CreateConnectionType = { dbType: dbType as "MONGODB" | "MYSQL", host, port: +port, dbName, user, password };
    response = await createConnection(connectionData);
  }

  if (!response.ok) {
    throw response;
  }

  return redirect("/connections");
}

export async function destroyAction({ params }: ActionFunctionArgs) {
  const connectionId = params.connectionId;

  if (!connectionId || !isNumeric(connectionId)) {
    return { message: "Invalid connection ID." };
  }

  const response = await deleteConnection(+connectionId);

  if (!response.ok) {
    throw response;
  }

  return redirect("/connections");
}

export default function ConnectionPage() {
  const { connectionId } = useParams();
  const isEditing = !!(connectionId && isNumeric(connectionId));

  return <ConnectionForm isEditing={isEditing} />;
}
