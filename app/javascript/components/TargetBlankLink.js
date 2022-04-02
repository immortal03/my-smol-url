import React from "react"
import classNames from "classnames"
import PropTypes from "prop-types"
import { ExternalLinkIcon } from "@heroicons/react/outline"

const TargetBlankLink = ({
  url,
  urlText,
  withIcon = true,
  customLinkClass = "",
  customIconClass = "",
}) => {
  return (
    <div className="flex items-center">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title={url}
        className={classNames(
          "max-w-sm font-medium text-blue-600 hover:text-blue-700 hover:underline",
          customLinkClass
        )}
      >
        <p className="max-w-xs truncate">{urlText || url}</p>
      </a>

      {withIcon && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames(
            "p ml-1 inline-block h-5 w-5 p-0.5 font-semibold text-blue-600",
            customIconClass
          )}
        >
          <ExternalLinkIcon />
        </a>
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
