import { format, parseISO } from "date-fns"

const formatDateTime = (str, customFormat = "MMM dd, yyyy p") => {
  if (!str) return ""
  return format(parseISO(str), customFormat)
}

export { formatDateTime }
