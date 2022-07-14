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
