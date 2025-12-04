import { redirect, useParams, type ActionFunctionArgs } from "react-router-dom";
import { createQuery, deleteQuery, updateQuery } from "../http";
import { validateCreateQueryAction } from "../util/validators";
import type { CreateQueryType, EditQueryType } from "../types/query-types";
import { isNumeric } from "../util/validation";
import QueryForm from "../components/QueryForm";

export async function action({ request, params }: ActionFunctionArgs) {
  const queryId = params.queryId;
  const isEditing = !!(queryId && isNumeric(queryId));

  const formData = await request.formData();
  const query = formData.get("query")!.toString().trim();
  const connectionId = formData.get("connectionId")!.toString().trim();

  const errors = validateCreateQueryAction({ query, connectionId });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  let response;
  if (isEditing) {
    const queryData: EditQueryType = { query, connectionId: +connectionId, id: +queryId };
    response = await updateQuery(queryData);
  } else {
    const queryData: CreateQueryType = { query, connectionId: +connectionId };
    response = await createQuery(queryData);
  }

  if (!response.ok) {
    throw response;
  }

  return redirect("/queries");
}

export async function destroyAction({ params }: ActionFunctionArgs) {
  const queryId = params.queryId;

  if (!queryId || !isNumeric(queryId)) {
    return { message: "Invalid query ID." };
  }

  const response = await deleteQuery(+queryId);

  if (!response.ok) {
    throw response;
  }

  return redirect("/queries");
}

export default function QueryPage() {
  const { queryId } = useParams();
  const isEditing = !!(queryId && isNumeric(queryId));

  return <QueryForm isEditing={isEditing} />;
}
