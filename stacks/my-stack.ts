import { Api, NextjsSite, StackContext, Table } from 'sst/constructs'

export function MyStack({ stack, app }: StackContext) {
  // Create tRPC API
  const api = new Api(stack, 'api', {
    routes: {
      'GET /trpc/{proxy+}': 'packages/functions/trpc.handler',
      'POST /trpc/{proxy+}': 'packages/functions/trpc.handler',
    },
  })

  // // Create the table
  // const table = new Table(stack, 'Counter', {
  //   fields: {
  //     counter: 'string',
  //   },
  //   primaryIndex: { partitionKey: 'counter' },
  // })

  // Create a Next.js site
  const site = new NextjsSite(stack, 'Site', {
    path: 'packages/web',
    environment: {
      // Pass the table details to our app
      REGION: app.region,
      // TABLE_NAME: table.tableName,
      API_URL: api.url,
      NEXT_PUBLIC_API_URL: api.url,
    },
  })

  // Allow the Next.js API to access the table
  // site.attachPermissions([table])

  // Show the site URL in the output
  stack.addOutputs({
    URL: site.url || '',
    ApiEndpoint: api.url || '',
  })
}
