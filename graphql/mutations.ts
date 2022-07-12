import { gql } from '@apollo/client';

export const CREATE_ARTWORK = gql`
  mutation MyMutation(
    $username: String!
    $user_id: ID!
    $html: String!
    $css: String!
    $js: String!
  ) {
    insertArtwork(
      username: $username
      user_id: $user_id
      html: $html
      css: $css
      js: $js
    ) {
      html
      css
      js
      created_at
      user_id
      username
    }
  }
`;
