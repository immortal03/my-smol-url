import React from "react"
import PropTypes from "prop-types"
import TargetBlankLink from "../../components/TargetBlankLink"
import Button from "../../components/Button"
import CtaShare from "./CtaShare"
import { ClipboardCopyIcon } from "@heroicons/react/outline"
import { copyToClipboard } from "../../utils/clipboard"

const SmolResult = ({ link }) => {
  if (!link) return null

  return (
    <div className="mt-4 rounded-md bg-blue-50 p-4">
      <div className="grid grid-cols-1 gap-y-2">
        <div className="flex items-center justify-between text-lg">
          <TargetBlankLink
            url={link.smolUrl}
            urlText={link.smolUrlDisplay}
            customIconClass="h-6 w-6"
            customLinkClass="font-semibold"
          />

          <Button
            className="shadow-none"
            color="tertiary"
            size="small"
            icon={<ClipboardCopyIcon />}
            onClick={() => copyToClipboard(link.smolUrlDisplay)}
          >
            Copy
          </Button>
        </div>

        <div className="text-sm">
          <TargetBlankLink
            customLinkClass="text-gray-500 hover:text-gray-600"
            customIconClass="text-gray-500"
            url={link.url}
          />
        </div>

        <CtaShare
          url={link.smolUrl}
          analyticsUrl={`/analytics/${link.slug}`}
          className="mt-4"
        />
      </div>
    </div>
  )
}

SmolResult.propTypes = {
  link: PropTypes.object,
}

export default SmolResult
