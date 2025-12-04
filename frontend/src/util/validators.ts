import { hasMinLength, isEmpty, isNumeric } from "./validation";

const PASSWORD_MIN_LENGTH = 8;

export function validateCreateQueryAction({ query, connectionId }: { query: string; connectionId: string; }) {
  const errors = [];
  if (isEmpty(query)) {
    errors.push("Invalid query.");
  }
  if (isEmpty(connectionId)) {
    errors.push("Invalid connection ID.");
  }
  return errors;
}

export function validateCreateConnectionAction({ dbType, host, port, dbName, user, password }: { dbType: string; host: string; port: string; dbName: string; user: string; password: string; }) {
  const errors = [];
  if (!["MONGODB", "MYSQL"].includes(dbType)) {
    errors.push("Invalid database type.");
  }
  if (isEmpty(host)) {
    errors.push("Invalid host.");
  }
  if (isEmpty(port) || !isNumeric(port)) {
    errors.push("Invalid port.");
  }
  if (isEmpty(dbName)) {
    errors.push("Invalid database name.");
  }
  if (isEmpty(user)) {
    errors.push("Invalid user.");
  }
  if (isEmpty(password)) {
    errors.push("Invalid password.");
  }
  return errors;
}

export function validateAuthAction({ email, password }: { email: string; password: string; }) {
  const errors = [];

  if (isEmpty(email)) {
    errors.push("Please, enter a valid email");
  }
  if (isEmpty(password) || !hasMinLength(password!, PASSWORD_MIN_LENGTH)) {
    errors.push(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    );
  }
  return errors;
}
