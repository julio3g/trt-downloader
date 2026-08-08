import { app } from 'electron'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import xlsx from 'xlsx'

export function exportToXlsx(data: string[][], filename: string) {
  const workbook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet(data)
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Dados')

  const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' })
  writeFileSync(join(app.getPath('temp'), filename), excelBuffer)
}
