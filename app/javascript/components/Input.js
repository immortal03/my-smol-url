import React from "react"
import PropTypes from "prop-types"
import { startCase } from "lodash"

const Input = ({
  label,
  name,
  id,
  onChange = () => {},
  value = "",
  type = "text",
  required = false,
  inputRef = null,
  keyboardShortcut,
  placeholder,
}) => {
  return (
    <div className="relative rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600">
      <label htmlFor={name} className="block text-xs font-medium text-gray-800">
        {label || startCase(name)}
      </label>

      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        className="block w-full border-0 p-0 text-gray-800 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder={placeholder}
        required={required}
        ref={inputRef}
        onChange={onChange}
      />

      {keyboardShortcut && (
        <div className="absolute inset-y-0 right-0 flex py-3 pr-3">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            {keyboardShortcut}
          </kbd>
        </div>
      )}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  inputRef: PropTypes.object,
  keyboardShortcut: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Input
