import React, { forwardRef, ForwardedRef } from 'react'
import { CSSObjectWithLabel } from 'react-select'

export const customStyles = {
  placeholder: (styles: CSSObjectWithLabel) => ({ ...styles, lineHeight: 2, fontSize: '0.875rem' }),
  control: (styles: CSSObjectWithLabel) => ({ ...styles, borderRadius: 8 }),
}

const InputFieldComponent = (
  { placeholder, value, onChange, type = 'text', label, error, isRequired, name }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          {label} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>
      <input
        type={type}
        ref={ref}
        name={name}
        placeholder={placeholder}
        required={isRequired}
        className={`input input-bordered ${error ? 'input-error' : ''}`}
        value={value}
        onChange={onChange}
      />
      {error && <label className="text-sm text-error">{error}</label>}
    </div>
  )
}
const TextareaComponent = (
  { placeholder, value, onChange, label, error, isRequired, name }: InputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          {label} {isRequired && <span className="text-error">*</span>}
        </span>
      </label>
      <textarea
        className={`textarea textarea-bordered resize-none ${error ? 'textarea-error' : ''}`}
        ref={ref}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
      {error && <label className="text-sm text-error">{error}</label>}
    </div>
  )
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(InputFieldComponent)
export const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(TextareaComponent)
