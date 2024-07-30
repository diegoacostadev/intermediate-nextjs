'use server';

import { db } from "@/db/db";
import { events } from "@/db/schema";
import { delay } from "@/lib/delay";
import { getCurrentUser } from "@/lib/user";
import randomName from "@scaleway/random-name";
import { revalidateTag } from "next/cache";



export const createNewEvent = async () => {
  await delay();
  const user = await getCurrentUser();

  await db.insert(events).values({
    startOn: new Date().toUTCString(),
    createdById: user.id,
    isPrivate: false,
    name: randomName('event', ''),
  });

  revalidateTag('dashboard:events')
  revalidateTag('allevents')
}
