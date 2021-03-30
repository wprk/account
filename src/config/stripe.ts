export const STRIPE_STANDARD_MONTHLY_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_STANDARD_MONTHLY_PLAN_ID || ''
export const STRIPE_STANDARD_ANNUAL_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_STANDARD_ANNUAL_PLAN_ID || ''
export const STRIPE_PREMIUM_MONTHLY_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_PREMIUM_MONTHLY_PLAN_ID || ''
export const STRIPE_PREMIUM_ANNUAL_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_PREMIUM_ANNUAL_PLAN_ID || ''
export const STRIPE_ENTERPRISE_MONTHLY_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_ENTERPRISE_MONTHLY_PLAN_ID || ''
export const STRIPE_ENTERPRISE_ANNUAL_PLAN_ID: string =
  process.env.REACT_APP_STRIPE_ENTERPRISE_ANNUAL_PLAN_ID || ''

export enum StripePlanTier {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export enum StripePlanBillingFrequency {
  ANNUALLY = 'annually',
  MONTHLY = 'monthly',
}

export type StripePlan = {
  id: string
  description: string
  price: number
  tier: StripePlanTier
  billing_frequency: StripePlanBillingFrequency
}

export const STRIPE_PLANS: StripePlan[] = [
  {
    id: STRIPE_STANDARD_MONTHLY_PLAN_ID,
    description: 'Standard Plan - Billed Monthly',
    price: 3999,
    tier: StripePlanTier.STANDARD,
    billing_frequency: StripePlanBillingFrequency.MONTHLY,
  },
  {
    id: STRIPE_STANDARD_ANNUAL_PLAN_ID,
    description: 'Standard Plan - Billed Annually',
    price: 39999,
    tier: StripePlanTier.STANDARD,
    billing_frequency: StripePlanBillingFrequency.ANNUALLY,
  },
  {
    id: STRIPE_PREMIUM_MONTHLY_PLAN_ID,
    description: 'Premium Plan - Billed Monthly',
    price: 39999,
    tier: StripePlanTier.PREMIUM,
    billing_frequency: StripePlanBillingFrequency.MONTHLY,
  },
  {
    id: STRIPE_PREMIUM_ANNUAL_PLAN_ID,
    description: 'Premium Plan - Billed Annually',
    price: 39999,
    tier: StripePlanTier.PREMIUM,
    billing_frequency: StripePlanBillingFrequency.ANNUALLY,
  },
  {
    id: STRIPE_ENTERPRISE_MONTHLY_PLAN_ID,
    description: 'Enterprise Plan - Billed Monthly',
    price: 12999,
    tier: StripePlanTier.ENTERPRISE,
    billing_frequency: StripePlanBillingFrequency.MONTHLY,
  },
  {
    id: STRIPE_ENTERPRISE_ANNUAL_PLAN_ID,
    description: 'Enterprise Plan - Billed Annually',
    price: 129999,
    tier: StripePlanTier.ENTERPRISE,
    billing_frequency: StripePlanBillingFrequency.ANNUALLY,
  },
]

export default {
  STRIPE_PLANS,
}
