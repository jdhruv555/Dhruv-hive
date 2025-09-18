type PlayerProps = {
  url?: string
}

export default function Player({ url = 'https://www.youtube.com/embed/dQw4w9WgXcQ' }: PlayerProps) {
  return (
    <div className="fixed bottom-5 left-5 z-40 w-[280px] md:w-[360px] aspect-video overflow-hidden rounded-xl border border-ink-700 bg-ink-900/70 backdrop-blur shadow-soft">
      <iframe
        className="w-full h-full"
        src={url}
        title="Pinned Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}


