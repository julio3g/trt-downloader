import { writeFileSync } from 'fs'
import path from 'node:path'

export function exportToJson(data: Record<string, string>[], filename: string) {
  const jsonData = JSON.stringify(data, null, 2)
  writeFileSync(path.join(__dirname, filename), jsonData)
  // writeFileSync(filename, jsonData)
  // console.log(`Dados exportados para o arquivo ${filename}`)
}
