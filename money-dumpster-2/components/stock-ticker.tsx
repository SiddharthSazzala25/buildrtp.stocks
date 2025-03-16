interface StockTickerProps {
  name: string
  symbol: string
  price: number
  change: number
  color: string
}

export function StockTicker({ name, symbol, price, change, color }: StockTickerProps) {
  const isPositive = change >= 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`w-8 h-8 bg-${color}-500 rounded-full flex items-center justify-center text-white font-bold`}>
          {symbol}
        </div>
        <div className="ml-2 text-white">{name}</div>
      </div>

      <div className="flex items-center">
        <div className="h-8 w-20 mr-2">
          <svg viewBox="0 0 100 20" className="w-full h-full">
            <path
              d={`M 0,10 ${Array.from({ length: 20 })
                .map(
                  (_, i) =>
                    `L ${i * 5},${
                      isPositive ? 10 - Math.random() * 8 - (i > 15 ? 8 : 0) : 10 + Math.random() * 8 + (i > 15 ? 8 : 0)
                    }`,
                )
                .join(" ")}`}
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              fill="none"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <div className={`text-${isPositive ? "green" : "red"}-500`}>${price.toFixed(2)}</div>
      </div>
    </div>
  )
}

