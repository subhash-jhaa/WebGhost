import { prisma } from '@/lib/prisma';

export interface Visitor {
  id: string;
  pageUrl: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  userAgent: string | null;
  timestamp: Date;
  sessionId: string | null;
}

// Store active connections: projectId -> Set of controllers
export const connections = new Map<string, Set<ReadableStreamDefaultController>>();

// Track which controllers have been closed to avoid ERR_INVALID_STATE
const closedControllers = new WeakSet<ReadableStreamDefaultController>();

export function markControllerClosed(controller: ReadableStreamDefaultController) {
  closedControllers.add(controller);
}

export async function sendStats(projectId: string, controller: ReadableStreamDefaultController) {
  // Do not write to a controller that has already been closed
  if (closedControllers.has(controller)) return;

  try {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    
    const realtimeEvents = await prisma.event.findMany({
      where: {
        projectId,
        timestamp: { gte: oneMinuteAgo },
      },
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    const uniqueVisitors = new Set();
    const visitorDetails: Visitor[] = [];

    realtimeEvents.forEach(event => {
      const visitorKey = event.sessionId || event.ip;
      if (!uniqueVisitors.has(visitorKey)) {
        uniqueVisitors.add(visitorKey);
        visitorDetails.push({
          id: event.id,
          pageUrl: event.pageUrl,
          referrer: event.referrer,
          country: event.country,
          city: event.city,
          userAgent: event.userAgent,
          timestamp: event.timestamp,
          sessionId: event.sessionId,
        });
      }
    });

    const stats = {
      type: 'stats',
      count: uniqueVisitors.size,
      visitors: visitorDetails,
      timestamp: new Date().toISOString(),
    };

    // Final guard: check again right before enqueue
    if (!closedControllers.has(controller)) {
      controller.enqueue(`data: ${JSON.stringify(stats)}\n\n`);
    }
  } catch (error) {
    console.error('Error getting stats:', error);
  }
}

// Function to broadcast updates to all connected clients for a project
export async function broadcastUpdate(projectId: string) {
  const projectConnections = connections.get(projectId);
  if (projectConnections) {
    const promises = Array.from(projectConnections).map(controller => 
      sendStats(projectId, controller)
    );
    await Promise.all(promises);
  }
}