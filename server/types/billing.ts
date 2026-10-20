/**
 * Server-side Billing & Entitlement configuration types.
 *
 * Single source of truth for approved catalog codes, schema enum-like values,
 * and immutable entitlement snapshot shapes. Not a public API/client contract.
 */

// ---------------------------------------------------------------------------
// Catalog codes
// ---------------------------------------------------------------------------

import { CREDIT_PACK_PRICE_CODES, type CreditPackPriceCode } from '../../shared/billing-catalog'
export const billingPriceCodes = CREDIT_PACK_PRICE_CODES
export type BillingPriceCode = CreditPackPriceCode

// ---------------------------------------------------------------------------
// Catalog / product configuration
// ---------------------------------------------------------------------------

export const billingProductKinds = [
  'credit_pack',
  'subscription',
] as const

export type BillingProductKind = (typeof billingProductKinds)[number]

export const billingTypes = [
  'one_time',
  'recurring',
] as const

export type BillingType = (typeof billingTypes)[number]

export const billingIntervals = [
  'month',
  'year',
] as const

export type BillingInterval = (typeof billingIntervals)[number]

export const billingProviders = [
  'creem',
] as const

export type BillingProvider = (typeof billingProviders)[number]

// ---------------------------------------------------------------------------
// Entitlement configuration
// ---------------------------------------------------------------------------

export const entitlementKeys = [
  'credits',
] as const

export type EntitlementKey = (typeof entitlementKeys)[number]

export const entitlementTypes = [
  'consumable',
  'feature',
  'limit',
] as const

export type EntitlementType = (typeof entitlementTypes)[number]

export const grantCadences = [
  'purchase',
  'monthly',
  'subscription',
] as const

export type GrantCadence = (typeof grantCadences)[number]

export const expirationPolicies = [
  'fixed_duration',
  'grant_period_end',
  'subscription_end',
] as const

export type ExpirationPolicy = (typeof expirationPolicies)[number]

// ---------------------------------------------------------------------------
// Payment lifecycle statuses
// ---------------------------------------------------------------------------

export const billingOrderStatuses = [
  'pending',
  'paid',
  'failed',
  'expired',
  'refunded',
  'partially_refunded',
] as const

export type BillingOrderStatus = (typeof billingOrderStatuses)[number]

export const billingSubscriptionStatuses = [
  'pending',
  'trialing',
  'active',
  'past_due',
  'paused',
  'canceled',
  'expired',
] as const

export type BillingSubscriptionStatus
  = (typeof billingSubscriptionStatuses)[number]

export const billingRefundStatuses = [
  'pending',
  'succeeded',
  'failed',
  'canceled',
] as const

export type BillingRefundStatus = (typeof billingRefundStatuses)[number]

/** Phase 1 dispute lifecycle: opened-only audit records. */
export const billingDisputeStatuses = [
  'opened',
] as const

export type BillingDisputeStatus = (typeof billingDisputeStatuses)[number]

export const billingWebhookEventStatuses = [
  'received',
  'processing',
  'processed',
  'failed',
] as const

export type BillingWebhookEventStatus
  = (typeof billingWebhookEventStatuses)[number]

// ---------------------------------------------------------------------------
// Entitlement grant / transaction lifecycle
// ---------------------------------------------------------------------------

export const entitlementGrantStatuses = [
  'active',
  'expired',
  'revoked',
] as const

export type EntitlementGrantStatus
  = (typeof entitlementGrantStatuses)[number]

export const entitlementSourceTypes = [
  'order',
  'subscription_cycle',
  'admin',
  'migration',
  'promotion',
] as const

export type EntitlementSourceType
  = (typeof entitlementSourceTypes)[number]

export const entitlementTransactionTypes = [
  'grant',
  'consume',
  'refund',
  'expire',
  'adjustment',
  'revoke',
] as const

export type EntitlementTransactionType
  = (typeof entitlementTransactionTypes)[number]

// ---------------------------------------------------------------------------
// Immutable entitlement snapshot (typed internal config only)
// ---------------------------------------------------------------------------

/**
 * One entitlement definition snapshot item.
 * Contains only approved entitlement configuration fields — never provider
 * payloads or user data.
 */
export interface EntitlementSnapshotItem {
  entitlement_key: EntitlementKey | (string & {})
  entitlement_type: EntitlementType
  quantity: number | null
  grant_cadence: GrantCadence
  expiration_policy: ExpirationPolicy
  duration_days: number | null
}

/**
 * Immutable JSON snapshot stored on orders and subscriptions.
 * Used for all future grants under that order/subscription cycle.
 */
export type EntitlementSnapshot = EntitlementSnapshotItem[]

// ---------------------------------------------------------------------------
// Checkout Initiation (local failure codes — never raw provider payloads)
// ---------------------------------------------------------------------------

/** Internal failure codes stored on billing_orders.failure_code. */
export const checkoutFailureCodes = [
  'CHECKOUT_CREATION_UNKNOWN',
  'CHECKOUT_PROVIDER_REJECTED',
] as const

export type CheckoutFailureCode = (typeof checkoutFailureCodes)[number]

/**
 * Price codes Checkout may initiate. Recurring prices are intentionally absent:
 * the current payment surface supports one-time credit packs only.
 */
export const CHECKOUT_ENABLED_PRICE_CODES = CREDIT_PACK_PRICE_CODES

export type CheckoutEnabledPriceCode
  = (typeof CHECKOUT_ENABLED_PRICE_CODES)[number]

export { CHECKOUT_CREDIT_PACK_CONTRACTS } from '../../shared/billing-catalog'
