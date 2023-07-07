import 'dotenv/config'
import puppeteer from 'puppeteer'
import { exportToJson } from './exports/exportToJson'
import { exportToXlsx } from './exports/exportToXlsx'
import { extractTableData } from './extracts/extractTableData'
import { extractTableDataForXlsx } from './extracts/extractTableDataForXlsx'

export async function getData() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  await page.goto('https://servicos.sinceti.net.br')
  await page.setViewport({ width: 1280, height: 1024 })
  await page.type('input[name="cpf"]', process.env.ELECTRON_USER_CPF || '')
  await page.type(
    'input[name="senha"]',
    process.env.ELECTRON_USER_PASSWORD || '',
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
