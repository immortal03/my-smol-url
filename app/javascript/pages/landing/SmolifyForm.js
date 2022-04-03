import React, { useEffect, useState, useRef } from "react"
import { useMutation } from "@apollo/client"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Alert from "../../components/Alert"
import { SmolifyUrl } from "../../graphql/queries"
import { copyToClipboard } from "../../utils/clipboard"
import SmolResult from "./SmolResult"

const SmolifyForm = () => {
  const [state, setState] = useState({})
  const [dataState, setDataState] = useState(null)
  const [link, setLink] = useState(null)
  const [message, setMessage] = useState(null)
  const urlInputRef = useRef(null)

  const [smolifyUrl, { loading: smolifying }] = useMutation(SmolifyUrl)
  const { longUrl, customSlug } = state

  useEffect(() => {
    document.addEventListener("keydown", handleSlashKeyFocus)

    return () => document.removeEventListener("keydown", handleSlashKeyFocus)
  }, [])

  const handleSlashKeyFocus = (e) => {
    if (e.keyCode === 191 && urlInputRef.current !== document.activeElement) {
      e.preventDefault()
      urlInputRef.current.focus()
    }
  }

  const handleChange = (e) => {
    if (dataState) setDataState(null)
    if (message) setMessage(null)

    setState({ ...state, [e.target.name]: e.target.value })
    setLink(null)
  }

  const parseLinkViewData = (link) => {
    let viewData = []
    if (!link) return viewData

    viewData.push({
      url: link.url,
      label: "Long URL",
      external: true,
    })

    viewData.push({
      url: link.smolUrl,
      urlText: link.smolUrlDisplay,
      label: "SmolURL",
      external: true,
    })

    viewData.push({
      url: `/analytics/${link.slug}`,
      urlText: "View analytics",
      label: "Analytics",
    })

    return viewData
  }

  return (
    <React.Fragment>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault()
          setMessage(null)

          smolifyUrl({
            variables: { url: longUrl, customSlug: customSlug },
          }).then(({ data }) => {
            const { message, link } = data.createLink
            setMessage(message)

            if (message.type === "success") {
              setState({})
              setDataState(parseLinkViewData(link))
              setLink(link)

              copyToClipboard(link.smolUrl, false)
              urlInputRef.current.blur()
            }
          })
        }}
      >
        <Input
          type="url"
          name="longUrl"
          label="Enter Long URL"
          placeholder="e.g. https://smolurl.me"
          value={longUrl}
          onChange={handleChange}
          inputRef={urlInputRef}
          keyboardShortcut="/"
          required
        />

        <Input
          name="customSlug"
          label="Customise Slug (optional)"
          onChange={handleChange}
          value={customSlug}
        />

        <Button
          type="submit"
          loading={smolifying}
          loadingText="Smolifying..."
          fullWidth
        >
          <span className="mr-4">🤏</span>Smolify URL!
        </Button>
      </form>

      {message && <Alert className="mt-6" {...message} />}

      <SmolResult link={link} />
    </React.Fragment>
  )
}

export default SmolifyForm
