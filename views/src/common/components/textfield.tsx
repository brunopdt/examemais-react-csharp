import { HelperText } from './helper-text'

export interface ITextfieldProps {
  label: string
  name: string
  type: string
  value: string
  error?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Textfield = ({
  label,
  name,
  onChange,
  type = 'text',
  value,
  error
}: ITextfieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="text-dark mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="w-full bg-background border border-dark px-4 py-2 rounded-md focus:outline-none focus:ring-primary/dark"
        value={value}
        onChange={onChange}
      />
      {error && <HelperText text={error} />}
    </div>
  )
}
