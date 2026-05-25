import { requireAuth } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import React from 'react'
import TestClient from '@/components/TestClient'

interface SessionUser {
  id: string;
  email?: string;
  name?: string;
}

const TestPage = async () => {
  const session = await requireAuth();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const projects = await (prisma as any).project.findMany({
    where: { userId: (session.user as SessionUser).id },
    orderBy: { createdAt: 'asc' },
  });

  return <TestClient projects={projects} />
}

export default TestPage