import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/app/utils/dbConnect";


export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase()
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("User Exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("Good Pass");
              delete foundUser.password;

              return { 
                id: foundUser._id, 
                ...foundUser 
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.service = user.service;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.service = token.service;
      }
      return session;
    },
  },
};
