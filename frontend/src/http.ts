import type { AuthType } from "./types/auth-types";
import type { CreateConnectionType, EditConnectionType } from "./types/connection-types";
import type { CreateQueryType, EditQueryType } from "./types/query-types";
import type { CreateScheduleType, EditScheduleType } from "./types/schedule-type";
import { getAuthToken } from "./util/auth";

const BASE_URL = import.meta.env.VITE_URL || "http://localhost:3000";

export async function deleteSchedule(scheduleId: number) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/schedules/${scheduleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
  });

  return response;
}

export async function updateSchedule(schedule: EditScheduleType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/schedules/${schedule.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(schedule),
  });

  return response;
}

export async function createSchedule(schedule: CreateScheduleType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/schedules/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(schedule),
  });

  return response;
}

export async function deleteQuery(queryId: number) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/queries/${queryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
  });

  return response;
}

export async function updateQuery(query: EditQueryType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/queries/${query.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });

  return response;
}

export async function createQuery(query: CreateQueryType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/queries/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(query),
  });

  return response;
}

export async function deleteConnection(connectionId: number) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/connections/${connectionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    }
  });

  return response;
}

export async function updateConnection(connection: EditConnectionType) {
  const token = getAuthToken();
  const response = await fetch(`${BASE_URL}/connections/${connection.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(connection),
  });

  return response;
}

export async function createConnection(connection: CreateConnectionType) {
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
