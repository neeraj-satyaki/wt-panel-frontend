export function highlightQuery(text: string, query?: string) {
  if (!query) {
    return text
  }

  const regex = new RegExp(`(${query})`, 'gi')
  return text.split(regex).map((part: any, index: number) =>
    regex.test(part) ? (
      <span key={index} className="text-yellow-400">
        {part}
      </span>
    ) : (
      part
    ),
  )
}
