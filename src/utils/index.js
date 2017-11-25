import { format } from "date-fns";

export const formatDate = date => format(date, "DD.MM.YYYY");
export const formatTime = time => format(time, "DD.MM.YYYY HH:mm:ss");

export const isAdmin = role => role === "ADMIN";
export const isCoach = role => role === "COACH";
export const isPlayer = role => role === "PLAYER";
export const isOrganizator = role => role === "ORGANIZATOR";
