interface IHelperTextProps {
  text?: string
}

export const HelperText = ({ text }: IHelperTextProps) => {
  return <p className="text-sm text-error">{text}</p>
}
