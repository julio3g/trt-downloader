/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_USER_CPF: string
  readonly MAIN_VITE_USER_PASSWORD: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
