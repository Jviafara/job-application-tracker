import dns from 'node:dns/promises'
import { betterAuth } from 'better-auth'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from 'mongodb'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { initUserBoard } from '../init-user-board'

dns.setServers(['1.1.1.1', '8.8.8.8'])

// const uri = process.env.MONGODB_URI!
// let client: MongoClient
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//   // Use global variable to preserve connection during HMR
//   if (!(global as any)._mongoClientPromise) {
//     client = new MongoClient(uri)
//     ;(global as any)._mongoClientPromise = client.connect()
//   }
//   clientPromise = (global as any)._mongoClientPromise
// } else {
//   client = new MongoClient(uri)
//   clientPromise = client.connect()
// }

const client = new MongoClient(process.env.MONGODB_URI!)
// const authClient = await clientPromise
const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  // database: mongodbAdapter(db, { client: authClient }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 3600,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async user => {
          if (user.id) {
            await initUserBoard(user.id)
          }
        },
      },
    },
  },
})

export const getSession = async () => {
  const result = await auth.api.getSession({
    headers: await headers(),
  })

  return result
}

export const signOut = async () => {
  const result = await auth.api.signOut({
    headers: await headers(),
  })

  if (result.success) {
    redirect('/sign-in')
  }
}
