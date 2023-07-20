import { RotateCw } from 'lucide-react'
import { useCallback } from 'react'
import './global.css'

export function App() {
  const handleButtonClick = useCallback(async () => {
    await window.api.getData()
  }, [])

  return (
    <main className="flex min-h-screen bg-neutral-950 items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="group">
          <button
            className="p-4 rounded-xl m-auto bg-green-600 flex text-neutral-100 justify-center gap-3 font-semibold text-2xl items-center group-hover:bg-green-700 duration-150"
            onClick={handleButtonClick}
          >
            Carregar e baixar dados
            <RotateCw className="group-hover:rotate-180 duration-300" />
          </button>
        </div>
        <button
          className="p-4 rounded-lg bg-purple-400 hover:bg-purple-500 duration-150 text-lg"
          onClick={() => window.api.saveFile('dados.xlsx')}
        >
          Baixar
        </button>
      </div>
      <p className="text-base text-neutral-200 absolute bottom-6">
        Desenvolvido com <span className="font-bold">❤️</span>
      </p>
    </main>
  )
}
