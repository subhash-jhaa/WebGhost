import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      user: { select: { email: true, name: true } },
      _count: { select: { events: true } }
    }
  });

  console.log('\n=== PROJECTS & OWNERS ===');
  projects.forEach(p => {
    console.log(`Project: "${p.name}" | Events: ${p._count.events}`);
    console.log(`  ID:    ${p.id}`);
    console.log(`  Owner: ${p.user.name} (${p.user.email})\n`);
  });

  console.log('\n=== LAST 5 EVENTS ===');
  const events = await prisma.event.findMany({
    orderBy: { timestamp: 'desc' },
    take: 5,
    include: { project: { select: { name: true } } }
  });
  events.forEach(e => {
    const mins = Math.round((Date.now() - e.timestamp.getTime()) / 60000);
    console.log(`[${mins} min ago] Project: "${e.project.name}" | Page: ${e.pageUrl.slice(0, 60)}`);
    console.log(`  projectId: ${e.projectId}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
