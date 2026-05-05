'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from '@/lib/auth/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignIn = () => {
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
      const result = await signIn.email({ email, password })
      if (result.error) {
        setError(result.error.message ?? 'Failed to sign in. Please try again.')
      } else {
        router.push('/dashboard')
      }
    } catch (e) {
      console.error('Sign in error:', e)
      setError('Failed to sign in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4'>
      <Card className='w-full max-w-md border-gray-200 shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-black'>Sign In</CardTitle>
          <CardDescription className='text-gray-600'>Enter your email and password to sign in.</CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'
        >
          <CardContent className='space-y-4'>
            {error && <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>{error}</div>}
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
                placeholder='john@example.com'
                required
                onChange={e => setEmail(e.target.value)}
                className='border-gray-300 focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1'
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <p className='text-center text-sm text-gray-600'>
              Don&apos;t have an account?{' '}
              <Link
                href='/sign-up'
                className='font-medium text-primary hover:underline'
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
