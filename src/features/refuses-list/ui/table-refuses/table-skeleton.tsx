export function TableSkeleton() {
  const blocks = Array.from({ length: 30 }, (_, index) => (
    <div className="w-full rounded-lg h-8 bg-gray-100" key={index}></div>
  ))
  return <div className="w-full flex flex-col gap-1">{blocks}</div>
}
