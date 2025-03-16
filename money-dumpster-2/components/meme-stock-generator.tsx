"use client"

import { useState } from "react"
import { Rocket, TrendingUp, RefreshCcw, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function MemeStockGenerator() {
  const [generating, setGenerating] = useState(false)
  const [memeStock, setMemeStock] = useState<{
    name: string
    ticker: string
    price: number
    story: string
  } | null>(null)
  const { toast } = useToast()

  const generateMemeStock = () => {
    setGenerating(true)

    // Random company name generator
    const prefixes = [
      "Moon",
      "Rocket",
      "Diamond",
      "Ape",
      "YOLO",
      "Stonk",
      "Meme",
      "Doge",
      "GME",
      "WSB",
      "Reddit",
      "Tendies",
      "Hodl",
      "Lambo",
    ]
    const suffixes = [
      "Corp",
      "Inc",
      "Holdings",
      "Capital",
      "Investments",
      "Technologies",
      "Blockchain",
      "NFT",
      "DAO",
      "Token",
      "Coin",
      "Exchange",
      "Moon",
    ]

    const randomName = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}`
    const randomTicker = randomName.substring(0, 4).toUpperCase()
    const randomPrice = (Math.random() * 100 + 1).toFixed(2)

    // Random meme stock story
    const stories = [
      `${randomName} started as a joke on Reddit, but now has a market cap larger than Ford. No one knows what they do.`,
      `${randomName} doesn't actually have any products or revenue, but their CEO tweeted a rocket emoji and the stock is up 500%.`,
      `${randomName} is being heavily shorted by hedge funds. Reddit users are banding together for the "mother of all short squeezes."`,
      `${randomName} pivoted from selling pet food to blockchain technology overnight. No one in the company knows what blockchain is.`,
      `${randomName} has never made a profit in its 10-year history, but it's considered a "growth stock" because the logo is cool.`,
      `${randomName} is rumored to be acquired by a SPAC run by a celebrity who can't spell EBITDA.`,
      `${randomName} is trending on WallStreetBets. The CEO has been spotted wearing a "Diamond Hands" t-shirt.`,
      `${randomName} announced they're getting into NFTs, even though their main business is manufacturing cardboard boxes.`,
      `${randomName} stock is up 1000% this week because someone with the same name as the CEO was seen at a Tesla dealership.`,
      `${randomName} has no employees, no products, and no business plan, but they do have a Discord server with 100,000 rocket emojis.`,
    ]

    const randomStory = stories[Math.floor(Math.random() * stories.length)]

    setTimeout(() => {
      setMemeStock({
        name: randomName,
        ticker: randomTicker,
        price: Number.parseFloat(randomPrice),
        story: randomStory,
      })
      setGenerating(false)

      toast({
        title: "Meme Stock Generated!",
        description: `${randomName} ($${randomTicker}) is ready to lose you money!`,
        variant: "default",
      })
    }, 1500)
  }

  const investInMemeStock = () => {
    if (!memeStock) return

    toast({
      title: "Investing in Meme Stock!",
      description: `You just invested in ${memeStock.name} (${memeStock.ticker})!`,
      variant: "default",
    })

    // Random outcome with 90% chance of failure
    setTimeout(() => {
      if (Math.random() < 0.9) {
        toast({
          title: "MEME STOCK CRASHED!",
          description: `${memeStock.name} just crashed 99%! You lost everything!`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "MEME STOCK MOONED!",
          description: `${memeStock.name} just went up 1000%! You're rich! (temporarily)`,
          variant: "default",
        })

        // If it moons, it will crash shortly after
        setTimeout(() => {
          toast({
            title: "MEME STOCK CRASHED!",
            description: `${memeStock.name} just crashed back to zero! Hope you sold in time!`,
            variant: "destructive",
          })
        }, 5000)
      }
    }, 3000)
  }

  return (
    <Card className="bg-[#121212] border-purple-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>

      <CardHeader>
        <CardTitle className="text-purple-500 flex items-center">
          <Rocket className="h-5 w-5 mr-2" />
          MEME STOCK GENERATOR
        </CardTitle>
        <CardDescription>Create your own worthless meme stock to lose money on!</CardDescription>
      </CardHeader>

      <CardContent>
        {generating ? (
          <div className="flex flex-col items-center justify-center h-40">
            <RefreshCcw className="h-10 w-10 animate-spin text-purple-500 mb-2" />
            <p className="text-gray-400">Generating worthless stock...</p>
          </div>
        ) : memeStock ? (
          <div className="bg-gray-800 p-4 rounded-lg border border-purple-500 relative">
            <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
              HOT GARBAGE
            </div>

            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-purple-300 font-bold">{memeStock.ticker}</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{memeStock.name}</h3>
                <div className="flex items-center">
                  <span className="text-purple-400 font-bold">${memeStock.price}</span>
                  <TrendingUp className="h-4 w-4 text-green-500 mx-1" />
                  <span className="text-green-500">+{(Math.random() * 1000).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="h-8 w-full bg-gray-900 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"
                  style={{ width: `${Math.random() * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0.01</span>
                <span>TO THE MOON</span>
              </div>
            </div>

            <div className="bg-gray-900 p-3 rounded">
              <h4 className="text-white font-bold mb-1">Company Story:</h4>
              <p className="text-gray-400 text-sm">{memeStock.story}</p>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              <span className="bg-red-900 text-red-300 text-xs px-1 rounded">Short Squeeze</span>
              <span className="bg-blue-900 text-blue-300 text-xs px-1 rounded">Diamond Hands</span>
              <span className="bg-green-900 text-green-300 text-xs px-1 rounded">YOLO</span>
              <span className="bg-yellow-900 text-yellow-300 text-xs px-1 rounded">Rocket</span>
              <span className="bg-purple-900 text-purple-300 text-xs px-1 rounded">Apes Together</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 bg-gray-800 rounded-lg border border-dashed border-gray-700">
            <Rocket className="h-10 w-10 text-gray-600 mb-2" />
            <p className="text-gray-400">Generate a meme stock to lose money on!</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold"
          onClick={generateMemeStock}
          disabled={generating}
        >
          {memeStock ? "Generate Another Meme Stock" : "Generate Meme Stock"}
        </Button>

        {memeStock && (
          <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold" onClick={investInMemeStock}>
            <DollarSign className="h-4 w-4 mr-1" />
            Invest in {memeStock.ticker}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

