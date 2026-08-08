import { BrowserWindow, Menu, Tray } from 'electron'
import { resolve } from 'node:path'

export function createTray(window: BrowserWindow) {
  const icon = '../../out/resources/deno.jpeg' || '../../resources/deno.jpeg'
  if (!icon) {
    throw new Error('Icon file not found')
  }
  const tray = new Tray(resolve(__dirname, icon))
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
