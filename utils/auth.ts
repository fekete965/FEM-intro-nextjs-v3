import { auth } from '@clerk/nextjs'
import { Prisma, User } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
import { redirect } from 'next/navigation'

import prisma from './db'

type GetUserByClerkIdWithInclude = {
  include: Prisma.UserInclude<DefaultArgs>
  select?: undefined | null
}

type GetUserByClerkIdWithSelect = {
  include?: undefined | null
  select: Prisma.UserSelect<DefaultArgs>
}
type GetUserByClerkIdArgs = GetUserByClerkIdWithInclude | GetUserByClerkIdWithSelect

export const getUserByClerkId = async (args?: GetUserByClerkIdArgs): Promise<User> => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-up')
  }

  const baseQuery: Prisma.UserFindFirstOrThrowArgs<DefaultArgs> = {
    where: { clerkId: userId },
  }

  if (!args) {
    return await prisma.user.findFirstOrThrow(baseQuery)
  }

  if (args.include) {
    baseQuery.include = args.include
    return await prisma.user.findFirstOrThrow(baseQuery)
  }

  baseQuery.select = args.select
  return await prisma.user.findFirstOrThrow(baseQuery)
}
