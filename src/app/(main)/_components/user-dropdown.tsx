import { BookOpenIcon, Home, ShieldIcon, User2, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { SignOutButton } from '@/components/sign-out-button'
import { User } from '@/lib/auth'
import Image from 'next/image'

interface userDropdownProps {
  user: User
}

export function UserDropdown({ user }: userDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={16}
              height={16}
              className='rounded-full object-cover'
            />
          ) : (
            <UserIcon />
          )}
          <span className='max-w-48 truncate'>{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-48'>
        <DropdownMenuLabel className='flex min-w-0 flex-col'>
          <span className='text-foreground truncate text-sm font-medium'>
            {user.name}
          </span>
          <span className='text-muted-foreground truncate text-xs font-normal'>
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className='flex items-center' href='/'>
              <Home size={16} className='opacity-60' aria-hidden='true' />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className='flex items-center' href='/profile'>
              <User2 size={16} className='opacity-60' aria-hidden='true' />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className='flex items-center' href='/admin/clients'>
              <BookOpenIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>Clients</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link className='flex items-center' href='/dashboard'>
              <BookOpenIcon
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          {user.role === 'admin' && <AdminItem />}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AdminItem() {
  return (
    <DropdownMenuItem asChild>
      <Link href='/admin'>
        <ShieldIcon className='size-4' /> <span>Admin</span>
      </Link>
    </DropdownMenuItem>
  )
}
