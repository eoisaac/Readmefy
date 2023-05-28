import { CaretRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <section className="page flex">
      <div
        className="mx-auto flex max-w-5xl flex-1 flex-col items-center
      justify-between gap-4 py-16"
      >
        <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-bold text-slate-700">
            Simplify readme creation for GitHub projects, making it easy to
            produce high-quality documentation.
          </h2>

          <p className="max-w-xl text-slate-500">
            Simplify readme creation for GitHub projects and unlock the power of
            streamlined documentation generation. Get started now to elevate the
            presentation of your projects.
          </p>
        </div>

        <Link
          to="/editor"
          className="flex items-center gap-1 rounded-md bg-sky-500 px-4 py-2
          font-medium text-slate-50 transition-all duration-200 ease-linear
          hover:bg-sky-600"
        >
          <span>Go to editor</span>
          <span>
            <CaretRight weight="bold" />
          </span>
        </Link>

        <img src="./home.png" alt="" className="w-full max-w-sm" />
      </div>
    </section>
  )
}
