'use client'
import { Button, ButtonProps } from '@nextui-org/react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({
  label,
  ...btnProps
}: { label: string } & ButtonProps) {
  const { pending, data, method, action } = useFormStatus()

  return (
    <Button {...btnProps} type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}
