import NextAuth, {NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import prisma from "./db"
import bcrypt from "bcryptjs"
import {authSchema} from "./zod_validation"

import {getUserByEmail} from "./server_utils"
import {use} from "react"

const config = {
  pages: {
    signIn: "/login",
  },

  // determine THE WAY user can login
  providers: [
    // `check email/password từ form thì dùng Credential`
    Credentials({
      async authorize(credentials) {
        const validatedFormData = authSchema.safeParse(credentials)
        if (!validatedFormData.success) {
          return null
        }

        // run on login
        const {email, password} = validatedFormData.data

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })
        if (!user) {
          console.log("No user found")
          return null
        }

        // {2. email trùng thì đến chekc password}
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        )
        if (!passwordMatch) {
          console.log("Password doesnot matching")
          return null
        }

        // {3. email, password matching}
        return user
      },
    }),
  ],

  // MIDDLEWARE run on every request
  callbacks: {
    authorized({auth, request}) {
      const isLoggedIn = Boolean(auth?.user) // === !!auth?.user

      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app")

      if (!isLoggedIn && isTryingToAccessApp) {
        return false // Redirect unauthenticated users to login page
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        if (
          request.nextUrl.pathname.includes("/login") ||
          request.nextUrl.pathname.includes("/signup")
        ) {
          return Response.redirect(new URL("/app/dashboard", request.nextUrl))
        }

        return true
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true
      }

      return false
    },

    jwt: ({token, user}) => {
      if (user) {
        //on Sign In
        token.userId = user.id
        token.email = user.email
        token.hasAccess = user.hasAccess
      }

      return token
    },

    session: ({session, token}) => {
      if (session.user) {
        session.user.id = token.userId

        session.user.hasAccess = token.hasAccess
      }

      return session
    },
  },
} satisfies NextAuthConfig

export const {
  auth,
  signIn,
  signOut,
  handlers: {GET, POST},
} = NextAuth(config)
