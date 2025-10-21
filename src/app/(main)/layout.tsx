import { Navbar } from './_components/navbar'

export default async function PublicFolderLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className=''>
      <Navbar />
      <main className=''>{children}</main>
    </div>
  )
}
