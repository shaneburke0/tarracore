import React, { useState, useEffect } from "react"
import { Storage } from "aws-amplify"

async function fetchImage(src, updateSrc) {
  if (!src.includes("downloads")) {
    const image = await Storage.get(src)
    updateSrc(image)
  } else {
    updateSrc(src)
  }
}

const Image = ({ src, alt, ...props }) => {
  const [imageSrc, updateSrc] = useState(null)
  useEffect(() => {
    fetchImage(src, updateSrc)
  }, [src])

  return imageSrc ? <img src={imageSrc} alt={alt} {...props} /> : null
}

export default Image
