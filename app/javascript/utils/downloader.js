import QRCode from "qrcode"

const downloadQrCode = (url, fileName = "smol-url-qr") => {
  QRCode.toDataURL(url)
    .then((dataUrl) => {
      const linkEl = document.createElement("a")
      linkEl.download = `${fileName}.png`
      linkEl.href = dataUrl
      linkEl.click()
    })
    .catch((err) => console.error(err))
}

export { downloadQrCode }
