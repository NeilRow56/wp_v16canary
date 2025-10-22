import { getServerSession } from '@/lib/get-session'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { DeleteApplication } from './_components/delete-application'

export const metadata: Metadata = {
  title: 'Admin'
}

export default async function AdminPage() {
  const session = await getServerSession()
  const user = session?.user

  if (!user) redirect('/auth/sign-in')

  if (user.role !== 'admin') redirect('/auth/sign-in')

  return (
    <main className='mx-auto w-full max-w-6xl px-4 py-12'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold'>Admin</h1>
          <p className='text-muted-foreground'>
            You have administrator access.
          </p>
        </div>
        <DeleteApplication />
      </div>
    </main>
  )
}
