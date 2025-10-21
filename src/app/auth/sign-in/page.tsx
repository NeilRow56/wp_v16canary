import type { Metadata } from 'next'
import { SignInForm } from './_components/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign in'
}

const SigninPage = async () => {
  return <SignInForm />
}

export default SigninPage
