/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
export function extractTableData(): Record<string, string>[] {
  const table = document.querySelector(
    '.iniConteudoContainer table.display.table_datatable.dataTable'
  )
  const headers = Array.from(table!.querySelectorAll('th')).map((th) =>
    th.textContent!.trim()
  )
  const rows = Array.from(table!.querySelectorAll('tbody tr'))
  const data: Record<string, string>[] = rows.map((row) => {
    const rowData: Record<string, string> = {}
    Array.from(row.querySelectorAll('td')).forEach((cell, index) => {
      rowData[headers[index]] = cell.textContent!.trim()
    })
    return rowData
  })
  return data
}
