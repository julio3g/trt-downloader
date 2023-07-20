import { dialog, ipcMain } from 'electron'
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getData } from './downloader/getDataTable'
import { store } from './store'
ipcMain.handle('getData', async () => {
  return await getData()
})

ipcMain.handle('documents', async () => {
  const documents = await store.get('documents')

  console.log(documents)

  return {
    data: documents,
  }
})

ipcMain.handle('saveFile', (_, fileNameAndExtension: string) => {
  dialog
    .showSaveDialog({ defaultPath: fileNameAndExtension })
    .then(
      async ({ filePath }) =>
        filePath &&
        copyFile(resolve(`out/main/${fileNameAndExtension}`), filePath),
    )
})
