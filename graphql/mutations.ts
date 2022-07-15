import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation MyMutation($username: String!, $email: String!, $avatar: String!) {
    insertUsers(avatar: $avatar, email: $email, username: $username) {
      id
      username
      email
      avatar
    }
  }
`;

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

export const ADD_REACTION = gql`
  mutation MyMutation($artwork_id: ID!, $user_id: ID!, $reaction: String!) {
    insertReactions(
      emoji: $reaction
      artwork_id: $artwork_id
      user_id: $user_id
    ) {
      created_at
      user_id
      emoji
    }
  }
`;
