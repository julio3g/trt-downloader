import Store from 'electron-store'

export const store = new Store({
  defaults: {},
})

console.log(store.path)