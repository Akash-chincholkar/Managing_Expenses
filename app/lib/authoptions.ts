// app/lib/authOptions.ts  👈 new separate file
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/app/lib/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const [rows]: any = await db.query(
          "SELECT * FROM users WHERE email=?",
          [credentials?.email]
        );
        const user = rows[0];
        if (!user) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const [existing]: any = await db.query(
        "SELECT * FROM users WHERE email=?",
        [user.email]
      );
      if (existing.length === 0) {
        await db.query(
          "INSERT INTO users (name,email,image) VALUES (?,?,?)",
          [user.name, user.email, user.image]
        );
      }
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};