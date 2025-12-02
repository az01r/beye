import { redirect } from "react-router-dom";
import { removeAuthToken } from "../util/auth";

export function action() {
    removeAuthToken();
    return redirect('/');
}