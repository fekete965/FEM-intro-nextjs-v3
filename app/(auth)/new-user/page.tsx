import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import Loader from '@/components/Loader'

import prisma from '@/utils/db'

const createNewUser = async () => {
  const user = await currentUser()

  const email = user?.emailAddresses.find(email => email.id === user.primaryEmailAddressId)

  if (!user) {
    console.error('[ERROR] [/new-user] Unregistered user somehow accessed this page')
    return redirect('/sign-up')
  }

  if (!email) {
    console.error('[ERROR] [/new-user] User email is missing when it is required')
    return redirect('/sign-up')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: email.emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()

  return (
    <section className="flex justify-center items-center bg-slate-900 w-screen h-screen">
      <Loader />
    </section>
  )
}

export default NewUserPage
