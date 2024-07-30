import 'server-only'; // This file is a server-side file should run on Node.js
// Server actions by default are cached by nextjs
// Because in the function getCurrentUser we are using cookies, the method
// is not cached by default by next, cookies will read dynamic content.
// We dont want a persistent cache for getCurrentUser, because we will read
// the same cookie that was read last time, so when user logout it wont be
// detected.
// So we are using per request cache , meomize the function with cache
// function of react, per request memoization. In the same request will not
// execute the function more than once.

import { COOKIE_NAME } from '@/lib/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromToken } from '@/lib/authTools';
import { cache } from "react";

export const getCurrentUser = cache(async () => {
  console.log('getCurrentUser');
  const token = cookies().get(COOKIE_NAME);

  if (!token) redirect('/signin');

  const user = await getUserFromToken(token);

  if (!user) redirect('/signin');

  return user;
});
