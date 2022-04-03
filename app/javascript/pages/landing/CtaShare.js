import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import Button from "../../components/Button"
import { MailIcon, QrcodeIcon, ChartBarIcon } from "@heroicons/react/solid"
import { ClipboardCopyIcon } from "@heroicons/react/outline"
import TwitterIcon from "../../images/TwitterIcon"
import { copyToClipboard } from "../../utils/clipboard"
import { downloadQrCode } from "../../utils/downloader"
import { Link } from "react-router-dom"

const CtaShare = ({ url, analyticsUrl, className, showCopy = false }) => {
  return (
    <React.Fragment>
      <div
        className={classNames(
          "flex items-center justify-center gap-2",
          className
        )}
      >
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
          QR
        </Button>

        <a href={`mailto:?subject=Check out my website!&body=${url}`}>
          <Button className="shadow-none" color="tertiary" icon={<MailIcon />}>
            Email
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

      {analyticsUrl && (
        <div className="flex justify-center">
          <Link to={analyticsUrl}>
            <Button
              className="block shadow-none "
              color="analytics"
              icon={<ChartBarIcon />}
            >
              <span className="hidden lg:inline">Analytics</span>
              <span className="inline lg:hidden">Analytics</span>
            </Button>
          </Link>
        </div>
      )}
    </React.Fragment>
  )
}

CtaShare.propTypes = {
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  showCopy: PropTypes.bool,
  analyticsUrl: PropTypes.string,
}

export default CtaShare
