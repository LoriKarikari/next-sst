import { SSTConfig } from 'sst'
import { MyStack } from './stacks/my-stack'

export default {
  config(_input) {
    return {
      name: 'next-sst',
      region: 'us-east-1',
    }
  },
  stacks(app) {
    app.stack(MyStack)
  },
} satisfies SSTConfig
