import { Request, Response, NextFunction } from 'express'
import { AsyncLocalStorage } from 'async_hooks'

const asyncLocalStorage: AsyncLocalStorage<any> = new AsyncLocalStorage()

export async function contextMiddleware (request: Request, response: Response, next: NextFunction): Promise<any> {
  asyncLocalStorage.run(new Map(), () => next)
}

export function getContext (key: String) {
  const data: any = asyncLocalStorage.getStore().get(key)
  return data
}

export function setContext (key: string, data: any) {
  asyncLocalStorage.getStore().set(key, data)
}