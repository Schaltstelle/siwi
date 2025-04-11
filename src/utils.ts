import { ClassValue, clsx } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateAge(birthday?: string): number {
  if (!birthday) return -1
  return moment().diff(moment(birthday, 'DD.MM.YYYY'), 'years')
}

export function formatJobFromTo(date?: string): string {
  if (!date) return '-'
  return new Intl.DateTimeFormat('de-CH', { month: 'long', year: 'numeric' }).format(moment(date, 'DD.MM.YYYY').toDate())
}
