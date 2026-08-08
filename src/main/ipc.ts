import { app, dialog, ipcMain } from 'electron'
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { getData } from './downloader/getDataTable'
import { store } from './store'
ipcMain.handle('getData', async () => {
  try {
    return await getData()
  } catch (err) {
    dialog.showErrorBox(
      'Erro ao baixar dados',
      err instanceof Error ? err.message : String(err),
    )
    throw err
  }
})

ipcMain.handle('documents', async () => {
  const documents = await store.get('documents')

  console.log(documents)

  return {
    data: documents,
  }
})

ipcMain.handle('saveFile', async (_, fileNameAndExtension: string) => {
  const { filePath } = await dialog.showSaveDialog({ defaultPath: fileNameAndExtension })
  if (!filePath) return

  try {
    await copyFile(join(app.getPath('temp'), fileNameAndExtension), filePath)
  } catch (err) {
    console.error(
      `Falha ao copiar ${fileNameAndExtension} — rode "Carregar e baixar dados" primeiro`,
      err,
    )
    throw err
  }
})
