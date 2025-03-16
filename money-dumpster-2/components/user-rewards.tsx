export function UserRewards() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            <span className="text-xs">+</span>
          </div>
          <div className="ml-2 text-white">LEAUR</div>
        </div>

        <div className="flex items-center">
          <div className="h-6 w-16 mr-2">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path
                d="M 0,10 L 5,8 L 10,12 L 15,7 L 20,9 L 25,6 L 30,11 L 35,5 L 40,8 L 45,4 L 50,9 L 55,3 L 60,7 L 65,5 L 70,10 L 75,6 L 80,8 L 85,4 L 90,7 L 95,5 L 100,3"
                stroke="#22c55e"
                fill="none"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="text-green-500">$5,841</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
            <span className="text-xs">7</span>
          </div>
          <div className="ml-2 text-white">7SIKE</div>
        </div>

        <div className="flex items-center">
          <div className="h-6 w-16 mr-2">
            <svg viewBox="0 0 100 20" className="w-full h-full">
              <path
                d="M 0,5 L 5,7 L 10,4 L 15,9 L 20,6 L 25,10 L 30,8 L 35,12 L 40,7 L 45,9 L 50,5 L 55,8 L 60,6 L 65,11 L 70,7 L 75,9 L 80,5 L 85,8 L 90,6 L 95,9 L 100,7"
                stroke="#22c55e"
                fill="none"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="text-green-500">$400</div>
        </div>
      </div>
    </div>
  )
}

