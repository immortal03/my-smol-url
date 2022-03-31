import React, { useEffect, useState, useRef } from "react"
import { useMutation } from "@apollo/client"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SmolDataview from "./SmolDataview"
import { SmolifyUrl } from "../../graphql/queries"
import { CheckCircleIcon } from "@heroicons/react/solid"
import Alert from "../../components/Alert"

const SmolifyForm = () => {
  const [state, setState] = useState({})
  const { longUrl, customSlug } = state
  const [dataState, setDataState] = useState(null)
  const [errors, setErrors] = useState(null)
  const urlInputRef = useRef(null)

  const [smolifyUrl, { data, loading: smolifying }] = useMutation(SmolifyUrl)

  useEffect(() => {
    document.addEventListener("keydown", handleSlashKeyFocus)

    return () => document.addEventListener("keydown", handleSlashKeyFocus)
  }, [])

  const handleSlashKeyFocus = (e) => {
    if (e.keyCode === 191 && urlInputRef.current !== document.activeElement) {
      e.preventDefault()
      urlInputRef.current.focus()
    }
  }

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value })

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
      label: "Smol URL",
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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setErrors(null)

          smolifyUrl({
            variables: { url: longUrl, customSlug: customSlug },
          }).then(({ data }) => {
            const { message, link } = data.createLink

            if (message.type === "success") {
              setState({})
              setDataState(parseLinkViewData(link))
            } else if (message.type === "error") {
              setErrors(message.description)
            }
          })
        }}
        className="space-y-6"
      >
        <Input
          type="url"
          name="longUrl"
          label="Enter Long URL"
          placeholder="e.g. https://www.mysmolurl.com"
          value={longUrl}
          onChange={handleChange}
          inputRef={urlInputRef}
          required
        />

        <Input
          name="customSlug"
          label="Customise Slug (optional)"
          onChange={handleChange}
          value={customSlug}
        />

        <div>
          <Button
            type="submit"
            loading={smolifying}
            loadingText="Smolifying..."
            fullWidth
          >
            <span className="mr-4">🤏</span>Smolify URL!
          </Button>
        </div>
      </form>

      {errors ? (
        <Alert
          type="error"
          className="mt-6"
          title="Failed to smolify your URL 😭"
          description={errors}
        />
      ) : dataState ? (
        <Alert
          type="success"
          className="mt-6"
          title="Your link has been smolified 🙌 &nbsp; Check out your smolified link below."
        />
      ) : null}

      {dataState && <SmolDataview dataState={dataState} />}
    </div>
  )
}

export default SmolifyForm
