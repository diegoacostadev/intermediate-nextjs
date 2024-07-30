import Side from './Side'
import Nav from './Nav'

const Shell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen">
      <aside className="h-full w-[var(--sidebar-w)] min-w-[var(--sidebar-w)] max-w-[var(--sidebar-w)] border-r border-default-50">
        <Side />
      </aside>
      <div className="w-[calc(100vw-var(--sidebar-w))]">
        <Nav />
        <main className="h-[calc(100vh-var(--header-h))]">{children}</main>
      </div>
    </div>
  )
}

export default Shell
