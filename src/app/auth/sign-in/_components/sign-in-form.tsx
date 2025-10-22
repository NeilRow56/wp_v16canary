/* eslint-disable @next/next/no-img-element */
'use client'

import { z } from 'zod/v4'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Card, CardContent } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'

import { APP_NAME } from '@/lib/constants'

import { PasswordInput } from '@/components/form/password-input'
import { Checkbox } from '@/components/ui/checkbox'
import { signIn } from '@/lib/auth-client'

const signInSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().optional()
})

type SignInValues = z.infer<typeof signInSchema>

export function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  const redirect = searchParams.get('redirect')

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  })

  async function onSubmit({ email, password, rememberMe }: SignInValues) {
    setError(null)
    setLoading(true)

    const { error } = await signIn.email({
      email,
      password,
      rememberMe
    })

    setLoading(false)

    if (error) {
      setError(error.message || 'Something went wrong')
    } else {
      toast.success('Signed in successfully')
      router.push(redirect ?? '/dashboard')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='px-6 pt-6 pb-2 md:px-8 md:pt-8'
            >
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col items-center text-center'>
                  <h1 className='text-2xl font-bold'>Welcome back</h1>
                  <p className='text-muted-foreground text-balance'>
                    Login to your account
                  </p>
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='e.g. m@example.com'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='grid gap-3'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            autoComplete='current-password webauthn'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='rememberMe'
                    render={({ field }) => (
                      <FormItem className='flex items-center gap-2'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Remember me</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Link
                    href='/profile/forgot-password'
                    className='ml-auto text-sm text-blue-600 underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                {error && (
                  <div role='alert' className='text-sm text-red-600'>
                    {error}
                  </div>
                )}
                <Button
                  type='submit'
                  className='w-full cursor-pointer'
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className='size-4 animate-spin' />
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
              <div className='py-2 text-center text-sm'>
                Don&apos;t have an account?{' '}
                <Link
                  href='/auth/sign-up'
                  className='text-blue-600 underline underline-offset-4'
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
          <div className='relative hidden flex-col items-center justify-center gap-y-4 bg-radial from-green-700 to-green-900 md:flex'>
            <img src='/logo.svg' alt='image' className='h-[92px] w-[92px]' />
            <p className='text-2xl font-semibold text-white'>{APP_NAME}</p>
          </div>
        </CardContent>
      </Card>
      <div className='text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4'>
        By continuing, you agree to our <Link href='#'>Terms of Service</Link>{' '}
        and <Link href='#'>Privacy Policy</Link>.
      </div>
    </div>
  )
}
