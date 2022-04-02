const copyToClipboard = (text, showAlert = true) => {
  navigator.clipboard.writeText(text).then(() => {
    showAlert && alert("Copied to clipboard")
  })
}

export { copyToClipboard }
