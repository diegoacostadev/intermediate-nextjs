const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen flex h-screen justify-center items-center">
      <div className="w-full max-w-[400px] mx-auto">{children}</div>
    </div>
  )
}

export default AuthLayout
