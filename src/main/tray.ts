import { BrowserWindow, Menu, Tray } from 'electron'
import { resolve } from 'node:path'

export function createTray(window: BrowserWindow): Tray | null {
  try {
    const iconPath = resolve(__dirname, '../../resources/icon.png')
    const tray = new Tray(iconPath)
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
    return tray
  } catch (error) {
    console.error('Failed to create tray icon:', error)
    return null
  }
}
