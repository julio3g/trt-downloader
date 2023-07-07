import { dialog, ipcMain } from 'electron'
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { getData } from './downloader/getDataTable'

ipcMain.handle('getData', async () => {
  return await getData()
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
