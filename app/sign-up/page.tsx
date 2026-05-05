'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from '@/lib/auth/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signUp.email({ email, password, name })

      if (result.error) {
        setError(result.error.message ?? 'Failed to create account. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch (e) {
      setError('Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4'>
      <Card className='w-full max-w-md border-gray-200 shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-black'>Sign Up</CardTitle>
          <CardDescription className='text-gray-600'>
            Create an account tostart tracking your job applications.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <CardContent className='space-y-4'>
            {error && <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>{error}</div>}
            <div className='space-y-2'>
              <Label
                htmlFor='name'
                className='text-gray-600'
              >
                Name
              </Label>
              <Input
                id='name'
                type='text'
                value={name}
                placeholder='Jhon Doe'
                required
                onChange={e => setName(e.target.value)}
                className='border-gray-300  focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='email'
                className='text-gray-600'
              >
                Email
              </Label>
              <Input
                id='email'
                type='email'
                value={email}
                placeholder='john@example.com'
                required
                onChange={e => setEmail(e.target.value)}
                className='border-gray-300  focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
            <div className='space-y-2'>
              <Label
                htmlFor='password'
                className='text-gray-600'
              >
                Password
              </Label>
              <Input
                id='password'
                type='password'
                value={password}
                placeholder='Enter your password'
                required
                minLength={8}
                onChange={e => setPassword(e.target.value)}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
              />
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-primary hover:bg-primary/90'
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <p className='text-center text-sm text-gray-600'>
              Already have an account?{' '}
              <Link
                href='/sign-in'
                className='font-medium text-primary hover:underline'
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignUp
