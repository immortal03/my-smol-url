import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Button from "../../components/Button"
import { MailIcon, QrcodeIcon } from "@heroicons/react/solid"
import { ClipboardCopyIcon } from "@heroicons/react/outline"
import TwitterIcon from "../../images/TwitterIcon"
import { copyToClipboard } from "../../utils/clipboard"
import { downloadQrCode } from "../../utils/downloader"

const CtaShare = ({ url, className, showCopy = false }) => {
  return (
    <div className={classNames("flex items-center gap-2", className)}>
      {showCopy && (
        <Button
          className="shadow-none"
          color="tertiary"
          icon={<ClipboardCopyIcon />}
          onClick={() => copyToClipboard(url)}
        >
          Copy
        </Button>
      )}

      <Button
        className="shadow-none"
        color="tertiary"
        icon={<QrcodeIcon />}
        onClick={() => downloadQrCode(url)}
      >
        <span className="hidden lg:inline">Share QR</span>
        <span className="inline lg:hidden">QR</span>
      </Button>

      <a href={`mailto:?subject=Check out my website!&body=${url}`}>
        <Button className="shadow-none" color="tertiary" icon={<MailIcon />}>
          <span className="hidden lg:inline">Share via Email</span>
          <span className="inline lg:hidden">Email</span>
        </Button>
      </a>

      <a
        href={`http://twitter.com/share?text=Check out my website!&url=${url}`}
        target="_blank"
      >
        <Button
          className="shadow-none"
          color="twitter"
          icon={<TwitterIcon className="fill-white" />}
        >
          Tweet
        </Button>
      </a>
    </div>
  )
}

CtaShare.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  showCopy: PropTypes.bool,
}

export default CtaShare
