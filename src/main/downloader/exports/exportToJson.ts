import { store } from '../../store'

export function exportToJson(data: Record<string, string>[], filename: string) {
  const jsonData = JSON.stringify(data, null, 2)
  store.set(filename, jsonData)
  // writeFileSync(join(__dirname, filename), jsonData)
  // writeFileSync(filename, jsonData)
  // console.log(`Dados exportados para o arquivo ${filename}`)
}
