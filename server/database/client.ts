import { drizzle } from 'drizzle-orm/d1'
import { AppError, CheckoutError } from '../utils/errors'
import * as schema from './schema'
type ServerEvent = Parameters<typeof getRequestURL>[0]
export function getDatabase(event: ServerEvent) {
  const binding = event.context.cloudflare?.env?.DB
  if (!binding || typeof binding.prepare !== 'function' || typeof binding.batch !== 'function') {
    throw new AppError('SERVICE_UNAVAILABLE')
  }
  return drizzle(binding, { schema })
}
export type Database = ReturnType<typeof getDatabase>
export async function runDatabaseOperation<T>(event: ServerEvent, operation: (database: Database) => PromiseLike<T>): Promise<T> {
  try { return await operation(getDatabase(event)) }
  catch (error) {
    if (error instanceof AppError || error instanceof CheckoutError) throw error
    throw new AppError('INTERNAL_ERROR', { cause: error })
  }
}
