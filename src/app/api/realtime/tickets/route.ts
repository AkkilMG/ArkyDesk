import { connections } from "@/lib/realtime";
import { requireApiUser } from "@/lib/api-auth";

export const dynamic = 'force-dynamic';

/**
 * Server-sent-events stream of ticket updates.
 *
 * Authorisation comes from the session cookie via `requireApiUser`, which
 * replaced a hand-rolled copy of the same check. The wildcard
 * `Access-Control-Allow-Origin` was removed: the stream is same-origin only,
 * and a wildcard here would let any origin open an authenticated stream.
 */
export async function GET(request: Request) {
  const auth = await requireApiUser();
  if (!auth.ok) return auth.response;

  const user = auth.user;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const connectionId = crypto.randomUUID();
      connections.set(connectionId, {
        controller,
        userId: user.id,
        isAdmin: user.admin,
      });

      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            type: 'connected',
            message: 'Real-time connection established',
          })}\n\n`
        )
      );

      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'heartbeat', timestamp: Date.now() })}\n\n`
            )
          );
        } catch {
          clearInterval(heartbeat);
          connections.delete(connectionId);
        }
      }, 30000);

      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat);
        connections.delete(connectionId);
        try {
          controller.close();
        } catch {
          // Connection already closed.
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
