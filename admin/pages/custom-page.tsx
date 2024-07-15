import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
  useQuery,
  gql,
} from "@apollo/client";
import React from "react";

const client = new ApolloClient({
  uri: "/admin/api",
  cache: new InMemoryCache(),
});

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    allUsers {
      id
      name
      email
    }
  }
`;

const CustomUserPage: React.FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  const handleAddUser = async () => {
    await createUser({
      variables: {
        name: "New User",
        email: "newuser@example.com",
        password: "password123",
      },
    });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {data.allUsers.map(
          (user: { id: string; name: string; email: string }) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          )
        )}
      </ul>
    </div>
  );
};
export { client };
export default CustomUserPage;
