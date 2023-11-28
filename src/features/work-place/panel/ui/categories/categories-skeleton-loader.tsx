export function CategoriesSkeletonLoader() {
  const blocks = Array.from({ length: 9 }, (_, index) => (
    <div key={index} className="w-32 h-9 rounded-lg bg-gray-200 animate-pulse"></div>
  ))

  return <div className="flex gap-[6px]">{blocks}</div>
}
