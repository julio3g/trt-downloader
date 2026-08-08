// import puppeteer from 'puppeteer'
// import { extractTableData } from './extracts/extractTableData'

// export async function getData() {
//   const browser = await puppeteer.launch({
//     headless: false,
//   })
//   try {
//     const page = await browser.newPage()

//     await page.goto('https://servicos.sinceti.net.br', {
//       timeout: 0,
//       waitUntil: 'networkidle0',
//     })
//     await page.setViewport({ width: 1280, height: 1024 })
//     await page.type(
//       'input[name="cpf"]',
//      '',
//     )
//     await page.type(
//       'input[name="senha"]',
//       '',
//     )

//     await page
//       .waitForSelector('a#mostrarARTsTodas')
//       .then(() => page.click('a#mostrarARTsTodas'))

//     const select =
//       '.iniConteudoContainer .dataTables_wrapper .dataTables_length label select'

//     await page.waitForSelector(select).then(() => page.select(select, '-1'))

//     await page
//       .waitForSelector('th.ui-state-default:nth-child(7)')
//       .then(() => page.click('th.ui-state-default:nth-child(7)'))

//     const data = await page.evaluate(extractTableData)

//     await browser.close()
//   } catch (error) {
//     console.error('Erro ao conectar ao Browserless:', error)
//   }
// }

import 'dotenv/config'
import { exportToJson } from './exports/exportToJson'
import { exportToXlsx } from './exports/exportToXlsx'
import { extractTableData } from './extracts/extractTableData'
import { extractTableDataForXlsx } from './extracts/extractTableDataForXlsx'

export async function getData() {
  const puppeteer = (await import('puppeteer')).default
  const browser = await puppeteer.launch({
    headless: false,
  })
  try {
    const page = await browser.newPage()

    await page.goto('https://servicos.sinceti.net.br', {
      timeout: 0,
      waitUntil: 'networkidle0',
    })
    await page.setViewport({ width: 1280, height: 1024 })
    await page.type('input[name="cpf"]', import.meta.env.MAIN_VITE_USER_CPF || '')
    await page.type(
      'input[name="senha"]',
      import.meta.env.MAIN_VITE_USER_PASSWORD || ''
    )

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.keyboard.press('Enter'),
    ])

    await page
      .waitForSelector('a#mostrarARTsTodas', { timeout: 30000 })
      .then(() => page.click('a#mostrarARTsTodas'))
      .catch(() => {
        throw new Error(
          'Login falhou ou elemento "mostrarARTsTodas" não encontrado — verificar CPF/senha no .env ou se o layout do site mudou',
        )
      })

    const select =
      '.iniConteudoContainer .dataTables_wrapper .dataTables_length label select'

    await page
      .waitForSelector(select, { timeout: 15000 })
      .then(() => page.select(select, '-1'))
      .catch(() => {
        throw new Error(
          `Seletor "${select}" não encontrado — página pode não ter carregado a tabela (login falhou ou layout mudou)`,
        )
      })

    await page
      .waitForSelector('th.ui-state-default:nth-child(7)')
      .then(() => page.click('th.ui-state-default:nth-child(7)'))

    const data = await page.evaluate(extractTableData)
    const dataXlsx = await page.evaluate(extractTableDataForXlsx)

    exportToJson(data, 'dados.json')
    exportToXlsx(dataXlsx, 'dados.xlsx')
  } finally {
    await browser.close()
  }
}
