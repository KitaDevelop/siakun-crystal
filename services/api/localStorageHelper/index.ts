// module with classes and logic for working with local storage in browsers via JavaScript
// see also: http://professorweb.ru/my/html/html5/level5/5_1.php
export interface IStorageItem {
  key: string
  value: any
}

export class StorageItem {
  key: string
  value: any

  constructor(data: IStorageItem) {
    this.key = data.key
    this.value = data.value
  }
}

// class for working with local storage in browser (common that can use other classes for store some data)
export class LocalStorageWorker {
  localStorageSupported: boolean

  constructor() {
    this.localStorageSupported =
      typeof window !== 'undefined' &&
      typeof window['localStorage'] != 'undefined' &&
      window['localStorage'] != null
  }

  // add value to storage
  add(key: string, item: string) {
    if (this.localStorageSupported) {
      localStorage.setItem(key, item)
    }
  }

  // get one item by key from storage
  get(key: string): any {
    if (this.localStorageSupported) {
      var item = localStorage.getItem(key)
      return item
    } else {
      return null
    }
  }

  // remove value from storage
  remove(key: string) {
    if (this.localStorageSupported) {
      localStorage.removeItem(key)
    }
  }

  // clear storage (remove all items from it)
  clear() {
    if (this.localStorageSupported) {
      localStorage.clear()
    }
  }
}
