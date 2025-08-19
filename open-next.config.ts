import type { OpenNextConfig } from '@opennextjs/cloudflare'

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: 'cloudflare-node',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
  // 👇 mark Next.js compiled deps as external so esbuild doesn’t choke
  edgeExternals: [
    "next/dist/compiled/node-fetch",
    "next/dist/compiled/ws",
    "next/dist/compiled/@ampproject/toolbox-optimizer",
    "next/dist/compiled/edge-runtime",
    "node:crypto", // still required for some Next APIs
  ],
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare-edge',
      converter: 'edge',
      proxyExternalRequest: 'fetch',
      incrementalCache: 'dummy',
      tagCache: 'dummy',
      queue: 'dummy',
    },
  },
}

export default config
