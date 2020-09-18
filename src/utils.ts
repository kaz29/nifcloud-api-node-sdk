import { format } from 'date-fns-tz'

export const getISOString = (date: Date): string => {
  const tmpDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
  return format(tmpDate, 'iii, dd MMM yy HH:mm:ss xxxx', { timeZone: 'UTC' })  
}
