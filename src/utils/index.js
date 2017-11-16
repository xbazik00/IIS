import { format } from "date-fns";
import { indexOf } from "lodash";

export const formatDate = date => format(date, "DD.MM.YYYY");
export const formatTime = time => format(time, "DD.MM.YYYY HH:mm:ss");

export const isAdmin = role => role === "ADMIN";
export const isCoach = role => role === "ROLE_COACH";
