import Link from 'next/link'
import { ResetPasswordForm } from './_components/reset-password-form'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
      </div>
    </div>
  )
}
