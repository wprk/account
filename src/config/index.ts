export const APP_PATH: string = process.env.REACT_APP_APP_PATH || ''
export const AUTH_PATH: string = process.env.REACT_APP_AUTH_PATH || ''
export const AUTH_FAILURE_PATH: string =
  process.env.REACT_APP_AUTH_FAILURE_PATH || '/login'
export const AUTH_LOGOUT_PATH: string =
  process.env.REACT_APP_AUTH_LOGOUT_PATH || '/'
export const AUTH_SUCCESS_PATH: string =
  process.env.REACT_APP_AUTH_SUCCESS_PATH || '/'
export const GRAPHQL_ENDPOINT: string =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || ''
export const MARKETING_PATH: string = process.env.REACT_APP_MARKETING_PATH || ''
export const NEWSLETTER_MAILING_LIST =
  process.env.REACT_APP_NEWSLETTER_MAILING_LIST

export default {
  APP_PATH,
  AUTH_PATH,
  AUTH_FAILURE_PATH,
  AUTH_LOGOUT_PATH,
  AUTH_SUCCESS_PATH,
  GRAPHQL_ENDPOINT,
  MARKETING_PATH,
  NEWSLETTER_MAILING_LIST,
}
