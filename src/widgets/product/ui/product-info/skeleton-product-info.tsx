export function SkeletonProductInfo() {
  return (
    <div className="flex gap-2">
      <div className="w-[340px] h-[256px] bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col gap-2">
        <div className="w-[336px] h-8 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-[240px] h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-[120px] h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-[320px] h-6 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-[280px] h-6 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  )
}
