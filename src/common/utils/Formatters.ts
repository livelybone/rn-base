import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export function dateFormatter(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  return format(typeof date === 'string' ? parseISO(date) : date, fmt)
}

export function amountFormatter(val, { precision }) {
  if (precision <= 0) {
    return val.replace(/[^\d]/g, '')
  }
  const [int, decimal] = val.replace(/[^\d.]/g, '').split('.')
  if (decimal === undefined) {
    return int ? (+int).toString() : ''
  }
  return `${(+int).toString()}.${decimal.substr(0, precision)}`
}
