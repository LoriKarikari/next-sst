import trpc, { initTRPC } from '@trpc/server'
import { z } from 'zod'
import {
  CreateAWSLambdaContextOptions,
  awsLambdaRequestHandler,
} from '@trpc/server/adapters/aws-lambda'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import superjson from 'superjson'

export const t = initTRPC.create({
  transformer: superjson,
})

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req) => {
    req.input // string
    return { id: req.input, name: 'Bilbo' }
  }),
  hello: t.procedure.query(() => {
    return { hello: 'world' }
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter

// created for each request
const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({}) // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>
export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
})
