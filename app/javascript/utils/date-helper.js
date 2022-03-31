import { format, parseISO } from "date-fns"

const formatDateTime = (str) => {
  if (!str) return ""
  return format(parseISO(str), "dd/MM/yyyy p")
}

export { formatDateTime }
