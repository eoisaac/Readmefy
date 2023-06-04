import { FileText } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to="/home" className="flex items-center">
      <span className="text-3xl text-indigo-500">
        <FileText />
      </span>
      <h1 className="text-xl font-bold text-slate-700 sm:text-2xl">Readmefy</h1>
    </Link>
  )
}
