'use client'
import { signInUser } from '@/actions/auth'
import SubmitButton from '@/components/SubmitButton'
import { Input } from '@nextui-org/react'
import Link from 'next/link'
import { useFormState } from 'react-dom'

const SigninForm = () => {
  const [formState, formAction] = useFormState(signInUser, {
    message: null,
    resetKey: 0,
  })

  return (
    // a way to clear the form is with a Key prop, in the formState generate
    // new value ex: {key: Date.now()} and when we want to clear the form
    // in the server action we change the value
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-md border border-default-100 bg-content1 p-3 shadow-lg"
      key={formState.resetKey}
    >
      <h3 className="my-4">Sign in</h3>
      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />

      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>
      {formState.message && (
        <div className="text-red-500">{formState.message}</div>
      )}
      <SubmitButton
        radius="sm"
        className="mt-5"
        label="Sign in"
        color="primary"
      />
    </form>
  )
}

export default SigninForm
