import ForgotPasswordEmail from '@/components/emails/reset-password'
import VerifyEmail from '@/components/emails/verify-email'
import { db } from '@/db'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Verify your email',
        react: VerifyEmail({ username: user.name, verifyUrl: url })
      })
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true
  },

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Reset your password',
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email
        })
      })
    },
    requireEmailVerification: true
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60, // 30 days - default is 7 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },

  database: drizzleAdapter(db, {
    provider: 'pg'
  }),
  plugins: [nextCookies()]
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user
