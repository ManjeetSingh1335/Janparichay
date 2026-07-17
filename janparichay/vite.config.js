import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // The login screen requests this endpoint while developing.  Serving a
    // harmless local response here means `npm run dev` works on its own,
    // rather than failing whenever the optional Node backend isn't running.
    configureServer(server) {
      server.middlewares.use('/api/ip-info', (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          ip: 'Unavailable',
          city: 'Unknown',
          country_name: 'Unknown',
        }))
      })
    },
  }
})
