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
  placeholder,
}) => {
  return (
    <div className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus-within:border-orange-600 focus-within:ring-1 focus-within:ring-orange-600">
      <label htmlFor={name} className="block text-xs font-medium text-gray-900">
        {label || startCase(name)}
      </label>

      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder={placeholder}
        required={required}
        ref={inputRef}
        onChange={onChange}
      />
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
  placeholder: PropTypes.string,
}

export default Input
