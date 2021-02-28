export function dateFormatting(date: string) {
  console.log(date)
  var systemDate = new Date(date) as Date
  const formattedDate = systemDate.toLocaleString()
  return formattedDate
}
