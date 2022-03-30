import React, { useEffect, useState, useRef } from "react"
import Input from "../../components/Input"
import Button from "../../components/Button"
import SmolDataview from "./SmolDataview"

const sampleData = [
  {
    url: "https://fonts.google.com/specimen/Source+Sans+Pro?query=source+sans",
    label: "Long URL",
    external: true,
  },
  {
    url: "https://mysmolurl.com/jfheu45REef",
    label: "Smol URL",
    external: true,
  },
  {
    url: "/analytics/jfheu45REef",
    label: "Analytics",
  },
]

const SmolifyForm = () => {
  const [state, setState] = useState({
    longUrl: "",
    customSlug: "",
  })
  const { longUrl, customSlug } = state
  const [dataState, setDataState] = useState(null)
  const urlInputRef = useRef(null)

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 191) {
        e.preventDefault()
        urlInputRef.current.focus()
      }
    })

    return () =>
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 191) {
          e.preventDefault()
          urlInputRef.current.focus()
        }
      })
  }, [])

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value })

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setDataState(sampleData)
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
            color="secondary"
            // loading={loading}
            // loadingText="Smolifying..."
            fullWidth
          >
            Smolify URL!
          </Button>
        </div>
      </form>

      {dataState && <SmolDataview dataState={dataState} />}
    </div>
  )
}

export default SmolifyForm
