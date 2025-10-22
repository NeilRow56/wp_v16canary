import { headers } from 'next/headers'
import { cache } from 'react'
import { auth } from './auth'

// This method deduplictes request
export const getServerSession = cache(async () => {
  return await auth.api.getSession({ headers: await headers() })
})
