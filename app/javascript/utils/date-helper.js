import { format, parseISO } from "date-fns"

const formatDateTime = (str) => {
  if (!str) return ""
  return format(parseISO(str), "MMM dd, yyyy p")
}

export { formatDateTime }
