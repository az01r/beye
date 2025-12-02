import { redirect, useParams, type ActionFunctionArgs } from "react-router-dom";
import { createConnection, updateConnection } from "../http";
import { validateCreateConnectionAction } from "../util/validators";
import ConnectionForm from "../components/ConnectionForm";
import type { CreateConnectionType, EditConnectionType } from "../types/connection-types";
import { isNumeric } from "../util/validation";

// export async function loader({ params }: LoaderFunctionArgs) {
//   const connectionId = params.connectionId!;
//   const response = await fetchMessagesByTopicId(topicId);
//   if (!response.ok) {
//     // throw new Response(JSON.stringify({ errors: "Failed to fetch messages." }));
//     throw response;
//   }

//   const resData = await response.json();
//   return resData.messages as MessageType[]; // The return value is accessible via useLoaderData
// }

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

export default function ConnectionPage() {
  const { connectionId } = useParams();
  const isEditing = !!(connectionId && isNumeric(connectionId));

  return <ConnectionForm isEditing={isEditing} />;
}
