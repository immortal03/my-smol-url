import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { ExternalLinkIcon, ClipboardCopyIcon } from "@heroicons/react/outline"

const TargetBlankLink = ({
  url,
  urlText,
  withIcon = true,
  withCopyIcon = false,
  customLinkClass = "",
  customIconClass = "",
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard")
    })
  }

  return (
    <div className="flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={url}
        className={classNames(
          "font-medium text-blue-600 hover:text-blue-700 hover:underline",
          customLinkClass
        )}
      >
        <p className="max-w-sm truncate">{urlText || url}</p>
      </a>

      {withIcon && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "p ml-1 inline-block h-5 w-5 p-0.5 font-semibold text-blue-600 hover:rounded-full hover:bg-blue-200 hover:text-blue-700",
            customIconClass
          )}
        >
          <ExternalLinkIcon />
        </a>
      )}

      {withCopyIcon && (
        <button
          className={classNames(
            "h-5 w-5 p-0.5 text-green-700 hover:rounded-full hover:bg-green-200 hover:text-green-800",
            customIconClass
          )}
          onClick={() => copyToClipboard(url)}
        >
          <ClipboardCopyIcon />
        </button>
      )}
    </div>
  )
}

TargetBlankLink.propTypes = {
  url: PropTypes.string.isRequired,
  urlText: PropTypes.string,
  withIcon: PropTypes.bool,
  customClass: PropTypes.string,
  customLinkClass: PropTypes.string,
  customIconClass: PropTypes.string,
}

export default TargetBlankLink
