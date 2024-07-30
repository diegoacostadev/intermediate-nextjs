'use client'

import { registerUser } from '@/actions/auth'
import SubmitButton from '@/components/SubmitButton'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useFormState } from 'react-dom'

const SignupForm = () => {
  const [formState, formAction] = useFormState(registerUser, {
    message: null,
    resetKey: 0,
  })

  return (
    <form
      action={formAction}
      className="mt-4 flex flex-col gap-2 rounded-md border border-default-100 bg-content1 p-3 shadow-lg"
      key={formState.resetKey}
    >
      <h3 className="my-4">Sign up</h3>
      <Input
        radius="sm"
        fullWidth
        size="lg"
        placeholder="Email"
        name="email"
        required
      />
      <Input
        radius="sm"
        name="password"
        fullWidth
        size="lg"
        type="password"
        placeholder="Password"
        required
      />
      <div>
        <Link href="/signin">{`Already have an account?`}</Link>
      </div>
      {formState.message && (
        <div className="text-red-500">{formState.message}</div>
      )}
      <SubmitButton
        radius="sm"
        className="mt-5"
        label="Sign up"
        color="primary"
      />
    </form>
  )
}

export default SignupForm
