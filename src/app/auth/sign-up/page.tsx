import { auth } from '@/lib/auth'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { SignUpForm } from './_components/sign-up-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up'
}

const SignupPage = async () => {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList
  })

  if (!!session) redirect('/')
  return <SignUpForm />
}

export default SignupPage
