import 'dotenv/config'
import puppeteer from 'puppeteer-core'
import { exportToJson } from './exports/exportToJson'
import { exportToXlsx } from './exports/exportToXlsx'
import { extractTableData } from './extracts/extractTableData'
import { extractTableDataForXlsx } from './extracts/extractTableDataForXlsx'

type SupportedPlatform = 'win32' | 'linux' | 'darwin'

const chromeExecPaths: Record<SupportedPlatform, string> = {
  win32:
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' ||
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  linux: '/usr/bin/google-chrome',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
}

function getChromeExecPath(platform: NodeJS.Platform): string {
  if (platform in chromeExecPaths) {
    return chromeExecPaths[platform as SupportedPlatform]
  } else {
    throw new Error(`Unsupported platform: ${platform}`)
  }
}

export async function getData() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: getChromeExecPath(process.platform),
  })
  const page = await browser.newPage()

  await page.goto('https://servicos.sinceti.net.br', {
    timeout: 0,
    waitUntil: 'networkidle0',
  })
  await page.setViewport({ width: 1280, height: 1024 })
  await page.type('input[name="cpf"]', import.meta.env.MAIN_VITE_USER_CPF || '')
  await page.type(
    'input[name="senha"]',
    import.meta.env.MAIN_VITE_USER_PASSWORD || '',
  )

  await page
    .waitForSelector('a#mostrarARTsTodas')
    .then(() => page.click('a#mostrarARTsTodas'))

  const select =
    '.iniConteudoContainer .dataTables_wrapper .dataTables_length label select'

  await page.waitForSelector(select).then(() => page.select(select, '-1'))

  await page
    .waitForSelector('th.ui-state-default:nth-child(7)')
    .then(() => page.click('th.ui-state-default:nth-child(7)'))

  const data = await page.evaluate(extractTableData)
  const dataXlsx = await page.evaluate(extractTableDataForXlsx)

  exportToJson(data, 'dados.json')
  exportToXlsx(dataXlsx, 'dados.xlsx')

  await browser.close()
}
