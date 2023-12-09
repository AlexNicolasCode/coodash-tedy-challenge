import 'module-alias/register'
import mongoose from 'mongoose'

import { env } from './config'
import routines from '@/main/routine'

mongoose.connect(env.mongoDbUrl)
  .then(async () => {
    const { setupApp } = await import('@/main/config/app')
    const app = await setupApp()
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}/`))
    routines()
  })
  .catch(console.error)