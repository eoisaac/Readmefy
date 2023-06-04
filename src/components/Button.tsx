import { IconContext } from '@phosphor-icons/react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const buttonSizes = {
  fit: 'leading-none text-base',
  xxs: 'p-0.5 text-base',
  xs: 'p-1 text-base',
  sm: 'p-2 text-base',
  md: 'p-3 text-base h-12 sm:h-9',
  lg: 'p-4 text-lg',
  xl: 'p-5 text-xl',
} as const

const buttonVariants = {
  primary: `bg-indigo-500 font-medium border-indigo-600 hover:border-indigo-700
    hover:bg-indigo-600 text-slate-50`,
  secondary: `text-slate-600 font-medium border-slate-500 bg-slate-200
    hover:border-slate-600 hover:bg-slate-300`,
  tertiary: `text-gray11 font-medium border-transparent bg-transparent
    hover:border-gray8 hover:bg-gray5`,
  link: `text-indigo-500 font-normal border-transparent bg-transparent
    hover:underline hover:text-blue9`,
  success: `text-emerald-100 font-medium border-emerald-600 bg-emerald-500
    hover:border-emerald-700 hover:bg-emerald-600`,
  warning: `text-amber-100 font-medium border-amber-600 bg-amber-500
    hover:border-amber-700 hover:bg-amber-600`,
  danger: `text-rose-100 font-medium border-rose-600 bg-rose-500
    hover:border-rose-700 hover:bg-rose-600`,
} as const

export type ButtonSize = keyof typeof buttonSizes
export type ButtonVariant = keyof typeof buttonVariants

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: JSX.Element
  icon?: JSX.Element
  loading?: boolean
  disabled?: boolean
  label?: string
  form?: string
  srLabel?: boolean
  reverse?: boolean
  border?: boolean
  full?: boolean
  variant?: ButtonVariant
  asChild?: boolean
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      label,
      form,
      loading = false,
      disabled = false,
      srLabel = false,
      full = false,
      reverse = false,
      border = false,
      asChild = false,
      size = 'md',
      variant = 'primary',
      type = 'button',
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const { className } = rest
    const Component = asChild ? Slot : 'button'
    const isDisabled = loading || disabled

    return (
      <IconContext.Provider
        value={{
          weight: 'bold',
          size: '1.25em',
        }}
      >
        <Component
          {...rest}
          ref={ref}
          type={type}
          disabled={isDisabled}
          form={form}
          className={twMerge(
            clsx(
              `flex cursor-pointer flex-row items-center justify-center gap-1
              rounded-md border text-center leading-none transition-all
              duration-200 ease-linear ${buttonSizes[size]}
              ${buttonVariants[variant]}`,
              { 'w-full': full },
              { 'flex-row-reverse': reverse },
              { 'cursor-wait opacity-70': loading },
              { 'cursor-not-allowed opacity-70': disabled },
              { 'border-transparent hover:border-transparent': !border },
            ),
            className,
          )}
        >
          {asChild ? (
            children
          ) : (
            <>
              {icon}
              <div className={srLabel ? 'sr-only' : 'not-sr-only'}>{label}</div>
            </>
          )}
        </Component>
      </IconContext.Provider>
    )
  },
)

Button.displayName = 'Button'
