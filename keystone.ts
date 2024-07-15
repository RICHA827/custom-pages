import { config, list } from "@keystone-6/core";
import { text, password } from "@keystone-6/core/fields";
import CustomUserPage from "./admin/pages/custom-page";
import { withAuth, session } from "./auth";
import { allowAll } from "@keystone-6/core/access";

const User = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: "unique", validation: { isRequired: true } }),
    password: password(),
  },
  ui: {
    listView: {
      initialColumns: ["name", "email"],
    },
  },
});

export default withAuth(
  config({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    lists: {
      User,
    },
    session,
    ui:{
      pages:() => [
        
      ]
    }

    server: {
      cors: {
        origin: ["http://localhost:3000"], // Adjust as necessary for your frontend URL
        credentials: true,
      },
    },
  })
);
