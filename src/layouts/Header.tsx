import { Logo } from '@/components/Logo'
import { GithubLogo, List, TwitterLogo, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Editor',
    path: '/editor',
  },
  {
    name: 'Learn Markdown',
    path: '/learn',
  },
]

const navActions = [
  {
    name: 'Twitter',
    icon: <TwitterLogo size={24} />,
    path: 'https://twitter.com/eoisaacc',
  },
  {
    name: 'GitHub',
    icon: <GithubLogo size={24} />,
    path: 'https://gihub.com/eoisaac/readmefy',
  },
]

export const Header = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false)

  const { matches: isMobile } = window.matchMedia('(max-width: 640px)')

  const handleToggleSidebar = () => {
    setDisplaySidebar((prev) => !prev)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-[1px] bg-slate-200">
      <div
        className="flex h-16 w-full flex-row-reverse justify-between
      p-4 shadow-md sm:flex-row sm:px-8"
      >
        <Logo />

        <nav className="relative flex">
          <button
            className="relative z-50 sm:hidden"
            title={displaySidebar ? 'Close menu' : 'Open Menu'}
            onClick={handleToggleSidebar}
          >
            {displaySidebar ? <X size={24} /> : <List size={24} />}
          </button>

          <div
            className={clsx(
              `fixed inset-0 top-16 z-30 flex max-h-screen max-w-[12rem]
              bg-slate-200 shadow-md transition-all duration-200
              ease-linear sm:relative sm:inset-auto sm:max-w-none
              sm:bg-transparent sm:shadow-none`,
              {
                'translate-x-0': displaySidebar,
                '-translate-x-full sm:-translate-x-0': !displaySidebar,
              },
            )}
          >
            <div
              className="flex flex-1 flex-col items-center justify-between p-4
            sm:flex-row sm:gap-8 sm:p-0"
            >
              <ul className="flex flex-col items-center gap-2 sm:flex-row">
                {navLinks.map(({ name, path }) => (
                  <li key={name}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        clsx(`p-1`, {
                          'text-sky-600': isActive,
                        })
                      }
                      onClick={isMobile ? handleToggleSidebar : undefined}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <ul className="flex items-center gap-2 sm:flex-row">
                {navActions.map(({ name, icon, path }) => (
                  <li key={name}>
                    <a
                      href={path}
                      target="_blank"
                      rel="noreferrer"
                      onClick={isMobile ? handleToggleSidebar : undefined}
                    >
                      <span>{icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div
        className={clsx(
          `fixed inset-0 top-16 z-10 flex items-center justify-center
          transition-opacity duration-500 sm:hidden`,
          {
            'pointer-events-none bg-slate-900/30 opacity-0': !displaySidebar,
            'animate-fade-in pointer-events-auto bg-slate-900/60':
              displaySidebar,
          },
        )}
      />
    </header>
  )
}
