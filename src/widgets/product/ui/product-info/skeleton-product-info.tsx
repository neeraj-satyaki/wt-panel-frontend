export function SkeletonProductInfo() {
  return (
    <div className="flex flex-col gap-2 744:flex-row">
      <div className="w-full h-64 rounded-lg 430:w-80 bg-gray-200 animate-pulse"></div>
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
