import { buttonVariants } from '@/components/ui/button'
import { getServerSession } from '@/lib/get-session'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  const user = session?.user

  if (user) redirect('/dashboard')
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div className='mb-8'>
          <Link
            href='/'
            className={buttonVariants({
              variant: 'outline'
            })}
          >
            <ArrowLeft /> Back
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
