import clsx from 'clsx'
import { useState } from 'react'

export function ListVideos() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)

  const handleVideoClick = (videoIndex: number) => {
    document.querySelectorAll('video').forEach((video, index) => {
      if (index !== videoIndex) {
        video.pause()
      }
    })

    setActiveVideo(videoIndex)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 1024:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((video, index) => (
          <div
            key={index}
            className={clsx(
              'w-full h-52 rounded-sm bg-black/80 cursor-pointer transition-all',
              {
                'shadow-xl shadow-blue-400/80': activeVideo === index,
              },
            )}
          >
            <video
              key={video}
              controls
              onClick={() => handleVideoClick(index)}
              className="w-full h-full"
            >
              <source
                src="http://techslides.com/demos/sample-videos/small.ogv"
                type="video/ogg"
              />
            </video>
          </div>
        ))}
      </div>
    </div>
  )
}
