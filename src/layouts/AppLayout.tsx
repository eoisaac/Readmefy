import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export const AppLayout = () => {
  return (
    <div
      className="min-h-screen w-screen max-w-[100vw] overflow-y-auto
  overflow-x-hidden bg-green-300"
    >
      <Header />

      <Outlet />
    </div>
  )
}
