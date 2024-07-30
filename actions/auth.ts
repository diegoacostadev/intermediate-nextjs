'use server'; // This file is a server-side file should run on Node.js, server actions

import { cookies } from 'next/headers'
import { signin, signup } from '@/lib/authTools'
import { z } from 'zod'
import { redirect } from 'next/navigation'
import { COOKIE_NAME } from '@/lib/constants'

// a runtime schema validation library for the form data
const authSchema = z.object({
  email: z.string({ message: "Please, fill the email." }).email({ message: "Invalid email address." }),
  password: z.string({ message: "Please, fill the password." }).min(8, { message: "Password must be 8 characters long." }),
})

type StateType = {
  message: string | null;
  resetKey: number;
};

// prevState: prev state of the form that this action is gonna be bound to
export const registerUser = async (prevState: StateType, formData: FormData): Promise<StateType> => {
  try {

    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const { user, token } = await signup(data);
    console.log({ user, token });
    cookies().set(COOKIE_NAME, token);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: error.issues[0].message,
        resetKey: prevState.resetKey
      }
    }
    if (error instanceof Error) {
      return {
        message: `Failed to sign you up. ${error.message}`,
        resetKey: prevState.resetKey
      }
    }
  }

  redirect('/dashboard');
}

export const signInUser = async (prevState: StateType, formData: FormData): Promise<StateType> => {
  try {
    const data = authSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const { user, token } = await signin(data);
    cookies().set(COOKIE_NAME, token);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: error.issues[0].message,
        resetKey: prevState.resetKey
      }
    }
    if (error instanceof Error) {
      return {
        message: `Failed to sign you in. ${error.message}`,
        resetKey: prevState.resetKey
      }
    }
  }

  // return { message: null, resetKey: Date.now() };
  redirect('/dashboard');
}
