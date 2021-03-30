import gql from 'graphql-tag'

export const SUBSCRIBE_TO_EMAILS = gql`
  mutation subscribeToEmails(
    $email: String!
    $mailingList: String!
    $subscribed: Boolean!
  ) {
    insert_email_subscriptions(
      objects: {
        email: $email
        mailing_list: $mailingList
        subscribed: $subscribed
      }
      on_conflict: {
        constraint: email_subscriptions_email_key
        update_columns: [subscribed]
      }
    ) {
      affected_rows
    }
  }
`
