import React from 'react'

type GalleryTitleProps = {
    period: string;
    subperiod: string;
}

export default function GalleryTitle({period, subperiod}:GalleryTitleProps) {
  return (
    <div>
        <span>{period}</span>
        <span>{subperiod}</span>
    </div>
  )
}
