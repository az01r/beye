import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as {
    data?: { message: string | string[] };
    status: number;
  };
  console.log("error: ", error);
  const message = error.data?.message || "Something went wrong!";
  const statusCode = error.status;
  return (
    <>
      <h1>Error {statusCode}:</h1>
      <ul>
        {message instanceof Array ? (
          message.map((m) => <li key={m}>{m}</li>)
        ) : (
          <li key={message}>{message}</li>
        )}
      </ul>
    </>
  );
}
