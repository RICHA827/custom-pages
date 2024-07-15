import React from "react";
import { ApolloProvider } from "@apollo/client";
import CustomUserPage, { client } from "./custom-page";

const CustomUsers: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CustomUserPage />
    </ApolloProvider>
  );
};

export default CustomUsers;
