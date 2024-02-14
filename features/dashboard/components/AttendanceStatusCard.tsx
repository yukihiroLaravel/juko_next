export default function AttendanceStatusCard() {
  return (
    <div className="flex w-full rounded-lg border border-gray-200 bg-[#FFFDE9] p-4 shadow-md">
      <div className="flex w-1/2 flex-col justify-center">
        <p className="text-center text-lg">受講人数</p>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-6xl font-bold">10</p>
          <p className="ml-2 text-2xl">人</p>
        </div>
      </div>
      <div className="w-1/2">
        <p className="text-center text-lg">チャプターごとの完了人数</p>
        <div className="mt-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <p className="text-lg">0人</p>
                <p className="text-lg">100人</p>
              </div>
              <div className="mt-2 h-4 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
