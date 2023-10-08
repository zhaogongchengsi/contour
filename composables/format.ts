import dayjs from 'dayjs'


export const format = (date?: string | number | dayjs.Dayjs | Date | null | undefined) => dayjs(date).format('YYYY-MM-DD hh:mm:ss')

