interface InputProps {
  placeholder: string
  value?: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  label: string
  isRequired?: boolean
  name: string
  type?: string
  error?: FieldError
}
type SelectOption = {
  label: string
  value: unknown
}
interface SelectInputProps extends InputProps {
  options: SelectOption[]
}
