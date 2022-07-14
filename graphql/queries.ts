import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query MyQuery($email: String!) {
    getUserByEmail(email: $email) {
      id
      username
      email
    }
  }
`;

export const GET_ARTWORK = gql`
  query MyQuery {
    getArtworkList {
      id
      user_id
      username
      html
      css
      js
      created_at
      reactionsList {
        id
        emoji
        created_at
        user_id
      }
    }
  }
`;

export const GET_ARTWORK_BY_ID = gql`
  query MyQuery($id: ID!) {
    getArtwork(id: $id) {
      id
      username
      user_id
      html
      css
      js
      reactionsList {
        emoji
        id
        created_at
      }
    }
  }
`;
