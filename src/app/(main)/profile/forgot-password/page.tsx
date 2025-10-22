import Link from 'next/link'
import { ForgotPasswordForm } from './_components/forgot-password-form'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const ForgotPasswordPage = async () => {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='mt-8 mb-8'>
          <Link
            href='/profile'
            className={buttonVariants({
              variant: 'outline'
            })}
          >
            <ArrowLeft /> Back
          </Link>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

export default ForgotPasswordPage
