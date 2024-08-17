import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { db, usersTable } from "@repo/db";
import {eq} from 'drizzle-orm';
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "18778887872"},
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      // TODO: User credentials type from next-aut
      async authorize(credentials : any) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10)
          const existingUser = await db.select().from(usersTable).where(eq(usersTable.number, credentials.phone))

          if (!existingUser || existingUser.length === 0) {
            try{
              const newUser = await db.insert(usersTable).values({
                number: credentials.phone,
                password: hashedPassword,
              }).returning()
              if(!newUser[0]) { return null }
              return {
                id: newUser[0].id.toString(),
                name: newUser[0].name,
                email: newUser[0].email,
              }
            }catch (e) {
              console.log(e)
            }
          }
          const user = existingUser[0]!
          const passwordValidation = await bcrypt.compare(credentials.password, user.password)
          
          if (!passwordValidation) {
            return null
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })

  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session, token}: any) {
      session.user.id = token.sub!
      return session
    }
  }
}

