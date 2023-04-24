import fastify from "fastify"

import { loggingConfig } from "@/env/loggingEnv"
import { env } from '@/env/index';
import { appRoutes } from "./http/routes";
import { creationErrorHandler } from './libs/Errors/creationErrorHandler';

const app = fastify({ logger: loggingConfig[env.NODE_ENV] })
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  creationErrorHandler(error, reply)

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should link to an external logging tool like DataLog/NewRelic/Sentry
  }
})

export default app