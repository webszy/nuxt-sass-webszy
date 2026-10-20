import { and, eq, gt, isNull, lte, or, sum } from 'drizzle-orm'
import { runDatabaseOperation } from '../database/client'
import { entitlementGrants } from '../database/schema'
import { ensureLocalUser } from '../services/users'
import { toPublicUserDto } from '../services/user-profile'
import { handleApiEnvelopeError } from '../utils/errors'
import type { MeResponse } from '../types/api'
export default defineEventHandler(async (event): Promise<MeResponse> => {
  setResponseHeader(event, 'cache-control', 'no-store')
  try {
    const user = await ensureLocalUser(event, { recordLoginAt: true })
    const now = new Date()
    const rows = await runDatabaseOperation(event, db => db.select({ total: sum(entitlementGrants.remainingQuantity) }).from(entitlementGrants).where(and(
      eq(entitlementGrants.userId, user.id), eq(entitlementGrants.entitlementKey, 'credits'), eq(entitlementGrants.status, 'active'),
      eq(entitlementGrants.entitlementType, 'consumable'), gt(entitlementGrants.remainingQuantity, 0), lte(entitlementGrants.effectiveAt, now),
      or(isNull(entitlementGrants.expiresAt), gt(entitlementGrants.expiresAt, now)),
    )))
    return { success: true, data: { ...toPublicUserDto(user), credits: Number(rows[0]?.total ?? 0) } }
  } catch (error) { return handleApiEnvelopeError(event, error) }
})
