"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, RefreshCcw, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface StockMarketProps {
  buyStock: (stockName: string, price: number) => void
  sellStock: (stockName: string) => void
  gameMode: string
}

interface Stock {
  name: string
  ticker: string
  price: number
  change: number
  description: string
  color: string
}

export function StockMarket({ buyStock, sellStock, gameMode }: StockMarketProps) {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [loading, setLoading] = useState(false)

  // Generate random stocks based on game mode
  useEffect(() => {
    generateStocks()
  }, [gameMode])

  // Update stock prices periodically
  useEffect(() => {
    const interval = setInterval(
      () => {
        updateStockPrices()
      },
      gameMode === "stockMarketOnDrugs" ? 1000 : 5000,
    )

    return () => clearInterval(interval)
  }, [stocks, gameMode])

  const generateStocks = () => {
    setLoading(true)

    const stockNames = [
      {
        name: "MemeStock Inc",
        ticker: "MEME",
        color: "#5eff5e",
        description: "We sell memes as NFTs to people who hate money",
      },
      {
        name: "Bankrupt Airlines",
        ticker: "BRPT",
        color: "red",
        description: "We fly to destinations that don't exist",
      },
      { name: "Diamond Hands Co", ticker: "DMND", color: "cyan", description: "We hold worthless stocks forever" },
      {
        name: "To The Moon LLC",
        ticker: "MOON",
        color: "yellow",
        description: "Rockets only go up (until they explode)",
      },
      { name: "Paper Hands Inc", ticker: "PAPR", color: "white", description: "We sell at the bottom, every time" },
      { name: "Ape Together Strong", ticker: "APES", color: "green", description: "Monkey see, monkey lose money" },
      { name: "Rocket Emoji Corp", ticker: "🚀🚀🚀", color: "orange", description: "More rockets = better investment" },
      {
        name: "YOLO Investments",
        ticker: "YOLO",
        color: "purple",
        description: "We put all our eggs in one basket, then drop the basket",
      },
      { name: "Stonks Only Up", ticker: "STONK", color: "blue", description: "What could possibly go wrong?" },
      { name: "Buy High Sell Low", ticker: "BHSL", color: "red", description: "Our revolutionary investment strategy" },
      {
        name: "Invisible Chair Co",
        ticker: "CHAIR",
        color: "gray",
        description: "We sell chairs you can't see, sit on, or return",
      },
      { name: "Tulip Bulb Mania", ticker: "TULIP", color: "pink", description: "This time it's different (it's not)" },
    ]

    const descriptions = [
      "A company that sells memes as a service.",
      "Uses AI to generate more AI buzzwords.",
      "Sells virtual land in a world that doesn't exist.",
      "Plans to send something to Mars eventually, maybe.",
      "Sells products you can't see, touch, or use.",
      "Already planning their Chapter 11 filing.",
      "Returns are guaranteed! (They're not.)",
      "They put blockchain in everything, even things that don't need it.",
      "Their business model is 'going viral on Reddit'.",
      "Manufactures chairs that don't exist.",
      "Specializes in flying to destinations that don't exist.",
      "Their CEO is currently under investigation in 12 countries.",
    ]

    const newStocks = stockNames.map((stock, index) => {
      let basePrice = Math.floor(Math.random() * 1000) + 10

      // Adjust prices based on game mode
      if (gameMode === "hedgeFund") {
        basePrice *= 100
      } else if (gameMode === "instantRegret") {
        basePrice = Math.floor(Math.random() * 100) + 5
      } else if (gameMode === "stockMarketOnDrugs") {
        basePrice = Math.floor(Math.random() * 10000) + 1
      }

      return {
        name: stock.name,
        ticker: stock.ticker,
        price: basePrice,
        change: Math.random() * 10 - 5,
        description: stock.description,
        color: stock.color,
      }
    })

    setStocks(newStocks)
    setLoading(false)
  }

  const updateStockPrices = () => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) => {
        let changePercent

        if (gameMode === "instantRegret") {
          // In instant regret mode, stocks mostly go down catastrophically
          changePercent = Math.random() * 50 - 45
        } else if (gameMode === "stockMarketOnDrugs") {
          // In stock market on drugs mode, stocks are EXTREMELY volatile
          changePercent = Math.random() * 500 - 250
        } else {
          // Normal mode - still pretty crazy
          changePercent = Math.random() * 100 - 60
        }

        // Random stock explosions
        if (Math.random() < 0.05) {
          if (Math.random() < 0.5) {
            // Stock moons for no reason
            changePercent = Math.random() * 1000 + 500
          } else {
            // Stock crashes for no reason
            changePercent = -1 * (Math.random() * 90 + 10)
          }
        }

        const priceChange = stock.price * (changePercent / 100)
        const newPrice = Math.max(0.01, stock.price + priceChange)

        return {
          ...stock,
          price: newPrice,
          change: changePercent,
        }
      }),
    )
  }

  // Format price with dollar sign and commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <RefreshCcw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#5eff5e]">MONEYDUMPSTER™ STOCKS</h2>
        <Button variant="outline" className="border-[#5eff5e] text-[#5eff5e]" onClick={generateStocks}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stocks.map((stock, index) => (
          <Card
            key={index}
            className={`bg-[#121212] border-gray-800 ${
              stock.change > 100
                ? "animate-pulse border-green-500"
                : stock.change < -50
                  ? "animate-pulse border-red-500"
                  : ""
            } hover:shadow-lg hover:shadow-${stock.color === "#5eff5e" ? "green" : stock.color}-500/20 transition-all`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2 cursor-pointer hover:scale-110 transition-transform`}
                    onClick={() => {
                      toast({
                        title: `${stock.ticker} Info`,
                        description: `${stock.description} Current price: ${formatPrice(stock.price)}`,
                        variant: "default",
                      })
                    }}
                  >
                    <BarChart className={`h-4 w-4 text-${stock.color === "#5eff5e" ? "green-500" : stock.color}`} />
                  </div>
                  <div>
                    <CardTitle className={`text-${stock.color === "#5eff5e" ? "green-500" : stock.color}`}>
                      {stock.ticker}
                    </CardTitle>
                    <CardDescription className="text-xs">{stock.name}</CardDescription>
                  </div>
                </div>
                <Badge
                  className={stock.change >= 0 ? "bg-[#5eff5e] text-black cursor-pointer" : "bg-red-500 cursor-pointer"}
                  onClick={() => {
                    toast({
                      title: `${stock.ticker} ${stock.change >= 0 ? "Rising" : "Falling"}!`,
                      description: `This stock has changed by ${stock.change.toFixed(2)}% recently.`,
                      variant: stock.change >= 0 ? "default" : "destructive",
                    })
                  }}
                >
                  {stock.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(stock.change).toFixed(2)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2 relative">
              <div className="flex items-center justify-between">
                <div
                  className={`text-2xl font-bold text-${stock.color === "#5eff5e" ? "green-500" : stock.color} cursor-pointer`}
                  onClick={() => {
                    const randomChange = (Math.random() * 20 - 10).toFixed(2)
                    toast({
                      title: `${stock.ticker} Price Alert!`,
                      description: `This stock just moved ${randomChange}% while you were looking at it!`,
                      variant: Number.parseFloat(randomChange) >= 0 ? "default" : "destructive",
                    })
                  }}
                >
                  {formatPrice(stock.price)}
                </div>
                {stock.change > 100 && (
                  <div className="absolute top-0 right-0 p-1 bg-green-500 text-black text-xs font-bold rounded-bl-lg animate-bounce">
                    🚀 MOONING!
                  </div>
                )}
                {stock.change < -50 && (
                  <div className="absolute top-0 right-0 p-1 bg-red-500 text-white text-xs font-bold rounded-bl-lg animate-bounce">
                    💥 CRASHING!
                  </div>
                )}
                <div className="h-10 w-24 cursor-pointer" onClick={() => updateStockPrices()}>
                  <svg viewBox="0 0 100 20" className="w-full h-full">
                    <path
                      d={`M 0,10 ${Array.from({ length: 10 }, (_, i) => `L ${i * 10},${10 - Math.random() * 10 * (stock.change >= 0 ? 1 : -1)}`).join(" ")}`}
                      fill="none"
                      stroke={stock.color === "#5eff5e" ? "rgb(94, 255, 94)" : stock.color}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2">{stock.description}</p>
            </CardContent>
            <CardFooter>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white relative overflow-hidden group"
                  onClick={() => sellStock(stock.ticker)}
                >
                  <span className="relative z-10">Sell</span>
                  <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
                <Button
                  className="bg-[#5eff5e] hover:bg-green-400 text-black relative overflow-hidden group"
                  onClick={() => buyStock(stock.ticker, stock.price)}
                >
                  <span className="relative z-10">Buy</span>
                  <div className="absolute inset-0 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

