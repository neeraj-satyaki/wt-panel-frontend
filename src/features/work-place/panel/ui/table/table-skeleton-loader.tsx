export function TableSkeletonLoader() {
  const rows = Array.from({ length: 20 }, (_, index) => (
    <tr key={index} className="text-sm border-b border-gray-200">
      {Array.from({ length: 7 }, (_, cellIndex) => (
        <td key={cellIndex} className="px-6 py-3 bg-gray-50">
          <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
        </td>
      ))}
    </tr>
  ))

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">{rows}</tbody>
    </table>
  )
}
