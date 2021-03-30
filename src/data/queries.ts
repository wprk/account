import gql from 'graphql-tag'

export const GET_DONATION_STATS = gql`
  query getDonationStats {
    stats {
      team_count
      campaign_count
      campaign_reach_count
    }
  }
`

export const GET_USER = gql`
  query getUser($userId: String!) {
    users_by_pk(id: $userId) {
      id
      email
      first_name
      last_name
      avatar_url
    }
  }
`
