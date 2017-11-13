import { format } from "date-fns";

export const formatDate = date => format(date, "DD.MM.YYYY");
export const formatTime = time => format(time, "DD.MM.YYYY HH:mm:ss");