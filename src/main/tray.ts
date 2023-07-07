import { BrowserWindow, Menu, Tray } from 'electron'
import path from 'node:path'

export function createTray(window: BrowserWindow) {
  const tray = new Tray(path.resolve(__dirname, '../../resources/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Abrir Aplicativo',
      click() {
        window.show()
      },
    },
    {
      label: 'Sair do Aplicativo',
      role: 'quit',
    },
  ])
  tray.setContextMenu(contextMenu)
}
