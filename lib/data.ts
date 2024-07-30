import 'server-only';
import { db } from '@/db/db';
import { attendees, events, rsvps } from '@/db/schema';
import { eq, sql, and, asc, count, ne, not, inArray, desc } from 'drizzle-orm';
import { delay } from '@/lib/delay';
// Library with some improvements over nextjs-unstable-cache in conjunction with
// react-cache, it has a better cache invalidation system when mutation happens,
// and a better cache persisted accross multiple routes.
import { memoize } from 'nextjs-better-unstable-cache';


export const getAttendeesCountForDashboard = memoize(async (userId: string) => {
  await delay(500);
  const counts = await db.select({
    totalAttendees: sql`count(distinct ${attendees.id})`,
  })
    .from(events)
    .leftJoin(rsvps, eq(rsvps.eventId, events.id))
    .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
    .where(eq(events.createdById, userId))
    .groupBy(events.id)
    .execute();

  const totalAttendees = counts.reduce((acc, count) => acc + (count.totalAttendees as number), 0);
  return totalAttendees;
}, {
  persist: true, // persist accross pages, until hard refresh or manually invalidated with a mutation.
  revalidateTags: () => ['dashboard:attendees'], // revalidate when this tag changes, we could access the parent method params here.
  suppressWarnings: true,
  log: ['datacache', 'verbose'], // logging probably only show on development with process.env.NODE_ENV === 'development'
  logid: 'dashboard:attendees'
})

export const getEventsForDashboard = memoize(async (userId: string) => {
  await delay();

  const data = await db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: {
      id: true,
      name: true,
      startOn: true,
      status: true
    },
    with: {
      rsvps: true,
    },
    limit: 5,
    orderBy: [asc(events.startOn)],
  });

  return data ?? [];
},
  {
    persist: true,
    revalidateTags: () => ['dashboard:events'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:events'
  }
)

export const getRsvpsForDashboard = memoize(async (userId: string) => {
  await delay();

  const userEvents = await db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: {
      id: true,
    }
  });

  const userEventIds = userEvents.map((event) => event.id);

  if (!userEventIds.length) return [];

  const data = await db
    .selectDistinct()
    .from(attendees)
    .where(inArray(rsvps.eventId, userEventIds))
    .leftJoin(rsvps, eq(attendees.id, rsvps.attendeeId))
    .leftJoin(events, eq(rsvps.eventId, events.id))
    .orderBy(desc(rsvps.createdAt))
    .execute();

  return data;
},
  {
    persist: true,
    revalidateTags: () => ['dashboard:rsvps'],
    suppressWarnings: true,
    log: ['datacache', 'verbose'],
    logid: 'dashboard:rsvps'
  }
)

export const getAllEvents = memoize(async (userId: string) => {
  await delay();
  return db.query.events.findMany({
    where: eq(events.createdById, userId),
    orderBy: [asc(events.startOn)]
  });
}, {
  persist: true,
  revalidateTags: () => ['allevents'],
  suppressWarnings: true,
  logid: 'event'
});

export const getEvent = memoize(async (userId: string, eventId: string) => {
  await delay();
  return db.query.events.findFirst({
    where: and(eq(events.createdById, userId), eq(events.id, eventId))
  });
}, {
  persist: true,
  revalidateTags: (userId, eventId) => ['event', eventId],
  suppressWarnings: true,
  logid: 'event'
});

export const getGuestList = memoize(async (userId: string) => {
  await delay();
  const data = await db.selectDistinct({
    id: attendees.id,
    name: attendees.name,
    email: attendees.email,
  })
    .from(events)
    .leftJoin(rsvps, eq(rsvps.eventId, events.id))
    .leftJoin(attendees, eq(attendees.id, rsvps.attendeeId))
    .where(eq(events.createdById, userId))
    .execute();

  return data;
}, {
  persist: true,
  revalidateTags: () => ['guests'],
  suppressWarnings: true,
  log: ['datacache', 'verbose'],
  logid: 'guests'
});
