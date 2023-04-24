import app from "./app";
import { env } from "./env";
import fastifyCors from "@fastify/cors";

app.register(fastifyCors)

app.listen({
  host: env.HOST,
  port: env.PORT
}, () => {
  console.log('🚀 HTTP Server up!')
  console.log('💫 Server running...')
})