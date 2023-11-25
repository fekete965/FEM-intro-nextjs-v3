import { render, screen } from '@testing-library/react'
import { describe, vi } from 'vitest'

import { PropsWithChildren } from 'react'

import Homepage from './page'

vi.mock('@clerk/nextjs', () => {
  const mockedFunction = {
    auth: () => {
      return new Promise(resolve => {
        resolve({ userId: '9b769278-117d-4052-8c9d-fee1ad5d6299' })
      })
    },
    ClerkProvider: ({ children }: PropsWithChildren) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: '9b769278-117d-4052-8c9d-fee1ad5d6299',
        fullName: 'James T. Kirk',
      },
    }),
  }

  return mockedFunction
})

describe('Testing HomePage', () => {
  it('should render the page correctly', async () => {
    render(await Homepage())

    const h2 = screen.getByText(
      'This is the best app for tracking your mood through out your life. All you have to do is be honest.',
    )
    expect(h2).toBeInTheDocument()

    const button = screen.getByText('Get Started')
    expect(button).toBeInTheDocument()
  })
})
