import { redirect, useParams, type ActionFunctionArgs } from "react-router-dom";
import { createSchedule, deleteSchedule, updateSchedule } from "../http";
import { validateCreateScheduleAction } from "../util/validators";
import { isNumeric } from "../util/validation";
import ScheduleForm from "../components/ScheduleForm";
import type { CreateScheduleType, EditScheduleType } from "../types/schedule-type";

export async function action({ request, params }: ActionFunctionArgs) {
  const scheduleId = params.scheduleId;
  const isEditing = !!(scheduleId && isNumeric(scheduleId));

  const formData = await request.formData();
  const tag = formData.get("tag")!.toString().trim();
  const queryId = formData.get("queryId")!.toString().trim();
  const cron = formData.get("cron")!.toString().trim();

  const errors = validateCreateScheduleAction({ tag, queryId, cron });

  if (errors.length > 0) {
    return { message: [...errors] }; // return value is automatically wrapped in a Response by react-router-dom
  }

  let response;
  if (isEditing) {
    const scheduleData: EditScheduleType = { tag, cron, queryId: +queryId, id: +scheduleId };
    response = await updateSchedule(scheduleData);
  } else {
    const scheduleData: CreateScheduleType = { tag, cron, queryId: +queryId };
    response = await createSchedule(scheduleData);
  }

  if (!response.ok) {
    throw response;
  }

  return redirect("/schedules");
}

export async function destroyAction({ params }: ActionFunctionArgs) {
  const scheduleId = params.scheduleId;
  if (!scheduleId || !isNumeric(scheduleId)) {
    return { message: "Invalid schedule ID." };
  }

  const response = await deleteSchedule(+scheduleId);

  if (!response.ok) {
    throw response;
  }

  return redirect("/schedules");
}

export default function SchedulePage() {
  const { scheduleId } = useParams();
  const isEditing = !!(scheduleId && isNumeric(scheduleId));

  return <ScheduleForm isEditing={isEditing} />;
}
