import { redirect } from "react-router-dom";

const BEYE_TOKEN = "BEYE_TOKEN";
const BEYE_EXPIRATION = "BEYE_EXPIRATION";

export function setAuthToken(token: string) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem(BEYE_TOKEN, token);
  localStorage.setItem(BEYE_EXPIRATION, expiration.toISOString());
}

export function getTokenDuration() {
  const storedExp = localStorage.getItem(BEYE_EXPIRATION);
  if (!storedExp) {
    return -1;
  }
  const expirationDate = new Date(storedExp);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem(BEYE_TOKEN);
  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function removeAuthToken() {
  localStorage.removeItem(BEYE_TOKEN);
  localStorage.removeItem(BEYE_EXPIRATION);
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return null;
}
