import type { AuthType } from "./types/auth-types";
import type { ConnectionType } from "./types/connection-types";
import { getAuthToken } from "./util/auth";

const BASE_URL = import.meta.env.VITE_URL || "http://localhost:3000";


export async function createConnection(connection: ConnectionType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/connections/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(connection),
  });

  return response;
}

export async function fetchSchedules() {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/schedules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response;
}

export async function fetchQueries() {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/queries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response;
}

export async function fetchConnections() {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/connections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  return response;
}

export async function authFunction(authData: AuthType, mode: string) {
  const response = await fetch(`${BASE_URL}/auth/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  return response;
}
