"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, RefreshCcw, Bitcoin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface CryptoMarketProps {
  buyCrypto: (cryptoName: string, price: number) => void
  gameMode: string
}

interface Crypto {
  name: string
  ticker: string
  price: number
  change: number
  description: string
  color: string
}

export function CryptoMarket({ buyCrypto, gameMode }: CryptoMarketProps) {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [loading, setLoading] = useState(false)

  // Generate random cryptos
  useEffect(() => {
    generateCryptos()
  }, [gameMode])

  // Update crypto prices periodically (more volatile than stocks)
  useEffect(() => {
    const interval = setInterval(
      () => {
        updateCryptoPrices()
      },
      gameMode === "cryptoNightmare" ? 1000 : 3000,
    )

    return () => clearInterval(interval)
  }, [cryptos, gameMode])

  const generateCryptos = () => {
    setLoading(true)

    const cryptoNames = [
      { name: "Bitcoin", ticker: "BTC", color: "orange", description: "The original crypto. Still overpriced." },
      { name: "Ethereum", ticker: "ETH", color: "purple", description: "Smart contracts that aren't that smart." },
      { name: "Dogecoin", ticker: "DOGE", color: "yellow", description: "Started as a joke, still is a joke." },
      {
        name: "RugPullCoin",
        ticker: "RUG",
        color: "red",
        description: "Developers will vanish with your money in 3... 2... 1...",
      },
      { name: "ElonTweetCoin", ticker: "ELON", color: "blue", description: "Value based entirely on one man's tweets" },
      {
        name: "SafeScamCoin",
        ticker: "SAFE",
        color: "green",
        description: "If it has 'Safe' in the name, it definitely isn't",
      },
      { name: "ToTheMoon", ticker: "MOON", color: "cyan", description: "Guaranteed to reach the moon! (It won't)" },
      { name: "DiamondHandsCoin", ticker: "DMND", color: "white", description: "HODL until it's worth zero!" },
      { name: "NotAPonziScheme", ticker: "PONZI", color: "pink", description: "Definitely not a Ponzi scheme (it is)" },
      {
        name: "NFT of Nothing",
        ticker: "NFT",
        color: "purple",
        description: "Buy a receipt for nothing, it'll be worth millions!",
      },
      {
        name: "TulipMania2.0",
        ticker: "TULIP",
        color: "green",
        description: "This bubble is different from the last one (it's not)",
      },
      {
        name: "InstantRegretCoin",
        ticker: "REGRT",
        color: "red",
        description: "You'll regret this purchase instantly",
      },
    ]

    const descriptions = [
      "The original cryptocurrency. Still overpriced.",
      "Smart contracts that aren't that smart.",
      "Started as a joke, still is a joke.",
      "Guaranteed to lose value faster than you can sell.",
      "Developers will vanish with your money.",
      "Will definitely go to the moon! (It won't)",
      "A decentralized pyramid scheme.",
      "Will mysteriously disappear from your wallet.",
    ]

    const newCryptos = cryptoNames.map((crypto, index) => {
      let basePrice = Math.random() * 10000 + 1

      // Adjust prices based on game mode
      if (gameMode === "cryptoNightmare") {
        basePrice = Math.random() * 50000 + 1
      }

      return {
        name: crypto.name,
        ticker: crypto.ticker,
        price: basePrice,
        change: Math.random() * 20 - 10,
        description: crypto.description,
        color: crypto.color,
      }
    })

    setCryptos(newCryptos)
    setLoading(false)
  }

  const updateCryptoPrices = () => {
    setCryptos((prevCryptos) =>
      prevCryptos.map((crypto) => {
        // Crypto is EXTREMELY volatile
        let changePercent

        if (gameMode === "cryptoNightmare") {
          // In crypto nightmare mode, cryptos are INSANELY volatile
          changePercent = Math.random() * 1000 - 500
        } else {
          // Normal mode - still very volatile
          changePercent = Math.random() * 200 - 100
        }

        // Random crypto explosions
        if (Math.random() < 0.1) {
          if (Math.random() < 0.3) {
            // Crypto moons for no reason
            changePercent = Math.random() * 5000 + 1000
          } else {
            // Crypto crashes for no reason (more likely)
            changePercent = -1 * (Math.random() * 95 + 5)
          }
        }

        const priceChange = crypto.price * (changePercent / 100)
        const newPrice = Math.max(0.0001, crypto.price + priceChange)

        return {
          ...crypto,
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
      <div className="bg-red-900/30 border border-red-500 p-3 rounded-lg mb-4 animate-pulse">
        <h3 className="text-red-500 font-bold text-lg flex items-center">
          <span className="mr-2">⚠️</span> EXTREME DANGER ZONE
        </h3>
        <p className="text-white text-sm">
          This section is guaranteed to lose all your money in record time. Crypto investments have a 100% failure rate
          in MoneyDumpster.
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-500">CRYPTO NIGHTMARE</h2>
        <Button variant="outline" className="border-purple-500 text-purple-500" onClick={generateCryptos}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryptos.map((crypto, index) => {
          // Add a random chance for rug pull animation
          const hasRugPullRisk = crypto.ticker === "RUG" || crypto.ticker === "SCAM" || crypto.ticker === "PONZI"
          const rugPullClass = hasRugPullRisk ? "hover:translate-y-96 transition-transform duration-1000" : ""

          return (
            <Card
              key={index}
              className={`bg-[#121212] border-gray-800 ${
                crypto.change > 500
                  ? "animate-pulse border-green-500"
                  : crypto.change < -70
                    ? "animate-pulse border-red-500"
                    : ""
              } ${rugPullClass} hover:shadow-lg hover:shadow-${crypto.color}-500/20 transition-all`}
              onClick={() => {
                if (hasRugPullRisk && Math.random() < 0.3) {
                  toast({
                    title: "RUG PULL DETECTED!",
                    description: `${crypto.name} just disappeared with all your money!`,
                    variant: "destructive",
                  })
                }
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-2 cursor-pointer hover:scale-110 transition-transform`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toast({
                          title: `${crypto.ticker} Info`,
                          description: `${crypto.description} Current price: ${formatPrice(crypto.price)}`,
                          variant: "default",
                        })
                      }}
                    >
                      <Bitcoin className={`h-4 w-4 text-${crypto.color}`} />
                    </div>
                    <div>
                      <CardTitle className={`text-${crypto.color}`}>{crypto.ticker}</CardTitle>
                      <CardDescription className="text-xs">{crypto.name}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={
                      crypto.change >= 0 ? "bg-green-500 text-black cursor-pointer" : "bg-red-500 cursor-pointer"
                    }
                    onClick={(e) => {
                      e.stopPropagation()
                      toast({
                        title: `${crypto.ticker} ${crypto.change >= 0 ? "Mooning" : "Crashing"}!`,
                        description: `This crypto has changed by ${crypto.change.toFixed(2)}% recently.`,
                        variant: crypto.change >= 0 ? "default" : "destructive",
                      })
                    }}
                  >
                    {crypto.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {Math.abs(crypto.change).toFixed(2)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2 relative">
                <div className="flex items-center justify-between">
                  <div
                    className={`text-2xl font-bold text-${crypto.color} cursor-pointer`}
                    onClick={(e) => {
                      e.stopPropagation()
                      const randomChange = (Math.random() * 100 - 50).toFixed(2)
                      toast({
                        title: `${crypto.ticker} Price Alert!`,
                        description: `This crypto just moved ${randomChange}% while you were looking at it!`,
                        variant: Number.parseFloat(randomChange) >= 0 ? "default" : "destructive",
                      })
                    }}
                  >
                    {formatPrice(crypto.price)}
                  </div>
                  {crypto.change > 500 && (
                    <div className="absolute top-0 right-0 p-1 bg-green-500 text-black text-xs font-bold rounded-bl-lg animate-bounce">
                      🚀 TO THE MOON!
                    </div>
                  )}
                  {crypto.change < -70 && (
                    <div className="absolute top-0 right-0 p-1 bg-red-500 text-white text-xs font-bold rounded-bl-lg animate-bounce">
                      💥 RUG PULL!
                    </div>
                  )}
                  <div
                    className="h-10 w-24 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateCryptoPrices()
                      toast({
                        title: "Market Refreshed!",
                        description: "Crypto prices updated with fresh randomness!",
                        variant: "default",
                      })
                    }}
                  >
                    <svg viewBox="0 0 100 20" className="w-full h-full">
                      <path
                        d={`M 0,10 ${Array.from({ length: 10 }, (_, i) => `L ${i * 10},${10 - Math.random() * 10 * (crypto.change >= 0 ? 1 : -1)}`).join(" ")}`}
                        fill="none"
                        stroke={crypto.color}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">{crypto.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full bg-${crypto.color === "green" ? "green-500" : crypto.color === "red" ? "red-500" : crypto.color === "blue" ? "blue-500" : crypto.color === "purple" ? "purple-500" : crypto.color === "yellow" ? "yellow-500" : crypto.color} hover:opacity-90 text-white relative overflow-hidden group`}
                  onClick={(e) => {
                    e.stopPropagation()
                    buyCrypto(crypto.ticker, crypto.price)

                    // Random chance for immediate rug pull
                    if (hasRugPullRisk && Math.random() < 0.5) {
                      setTimeout(() => {
                        toast({
                          title: "INSTANT RUG PULL!",
                          description: `${crypto.name} developers ran away with your money immediately!`,
                          variant: "destructive",
                        })
                      }, 2000)
                    }
                  }}
                >
                  <span className="relative z-10">Buy {crypto.ticker}</span>
                  <div className="absolute inset-0 bg-black bg-opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <div className="mt-6">
        <Card className="bg-[#121212] border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500">WARNING: CRYPTO NIGHTMARE</CardTitle>
            <CardDescription>All crypto investments are guaranteed to fail spectacularly</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Rug pulls happen without warning</li>
              <li>Your wallet may be "hacked" at any moment</li>
              <li>Private keys are randomly forgotten</li>
              <li>NFTs disappear overnight</li>
              <li>The special "BUY HIGH, SELL LOW" feature is always enabled</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

