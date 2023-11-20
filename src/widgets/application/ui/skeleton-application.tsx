export function SkeletonApplication() {
  const blocks = Array.from({ length: 30 }, (_, index) => (
    <div className="flex flex-col gap-2" key={index}>
      <div className="w-full rounded-md bg-gray-200 animate-pulse h-40"></div>
      <div className="w-full rounded-md bg-gray-200 animate-pulse h-6"></div>
      <div className="rounded-md bg-gray-200 animate-pulse h-6 w-1/2"></div>
    </div>
  ))
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-60"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-64"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-80"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-52"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-80"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-44"></div>
        <div className="bg-gray-200 rounded-md h-6 animate-pulse w-52"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-gray-200 animate-pulse h-6 rounded-md w-32"></div>
        <div className="grid grid-cols-6 gap-4">{blocks}</div>
      </div>
    </div>
  )
}
