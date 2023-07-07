/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prettier/prettier */
export function extractTableDataForXlsx() {
  const table = document.querySelector(
    '.iniConteudoContainer table.display.table_datatable.dataTable'
  )

  const headers = Array.from(table!.querySelectorAll('th')).map((th) =>
    th.textContent!.trim()
  )
  const rows = Array.from(table!.querySelectorAll('tbody tr'))

  const data = rows.map((row) =>
    Array.from(row.querySelectorAll('td')).map((cell) =>
      cell.textContent!.trim()
    )
  )

  return [headers, ...data]
}
