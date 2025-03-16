"use client"

import { useState, useEffect } from "react"
import { Flame, Youtube, TrendingUp, AlertTriangle, Twitter, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface HypeMeterProps {
  gameMode: string
}

export function HypeMeter({ gameMode }: HypeMeterProps) {
  const [youtubeHype, setYoutubeHype] = useState(0)
  const [tiktokHype, setTiktokHype] = useState(0)
  const [redditHype, setRedditHype] = useState(0)
  const [grandmaHype, setGrandmaHype] = useState(0)
  const [taxiDriverHype, setTaxiDriverHype] = useState(0)
  const [shoeShineHype, setShoeShineHype] = useState(0)
  const [overallHype, setOverallHype] = useState(0)
  const [flashWarning, setFlashWarning] = useState(false)

  useEffect(() => {
    // Randomly update hype levels
    const interval = setInterval(() => {
      const newYoutubeHype = Math.floor(Math.random() * 100)
      const newTiktokHype = Math.floor(Math.random() * 100)
      const newRedditHype = Math.floor(Math.random() * 100)
      const newGrandmaHype = Math.floor(Math.random() * 100)
      const newTaxiDriverHype = Math.floor(Math.random() * 100)
      const newShoeShineHype = Math.floor(Math.random() * 100)

      setYoutubeHype(newYoutubeHype)
      setTiktokHype(newTiktokHype)
      setRedditHype(newRedditHype)
      setGrandmaHype(newGrandmaHype)
      setTaxiDriverHype(newTaxiDriverHype)
      setShoeShineHype(newShoeShineHype)

      const newOverallHype = Math.floor(
        (newYoutubeHype + newTiktokHype + newRedditHype + newGrandmaHype + newTaxiDriverHype + newShoeShineHype) / 6,
      )
      setOverallHype(newOverallHype)

      // Random flash warnings
      if (Math.random() > 0.7) {
        setFlashWarning(true)
        setTimeout(() => setFlashWarning(false), 1000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Get hype status text and color
  const getHypeStatus = (value: number) => {
    if (value > 80) return { text: "EXTREME DANGER!", color: "text-red-500 font-bold animate-pulse" }
    if (value > 60) return { text: "DANGER!", color: "text-red-500 font-bold" }
    if (value > 40) return { text: "WARNING!", color: "text-yellow-500" }
    return { text: "Not yet hyped", color: "text-green-500" }
  }

  const checkHypeLevel = (level: number) => {
    if (level > 80) {
      toast({
        title: "EXTREME HYPE DETECTED!",
        description: "This is a guaranteed bubble about to burst! Sell everything!",
        variant: "destructive",
      })
    } else if (level > 60) {
      toast({
        title: "High Hype Level!",
        description: "The smart money is already selling. Only bagholders remain.",
        variant: "destructive",
      })
    } else if (level > 40) {
      toast({
        title: "Medium Hype Level",
        description: "Caution advised. Hype is building.",
        variant: "default",
      })
    } else {
      toast({
        title: "Low Hype Level",
        description: "Not enough hype yet. Wait until more people are talking about it.",
        variant: "default",
      })
    }
  }

  return (
    <Card className="bg-[#121212] border-orange-500 relative overflow-hidden">
      {flashWarning && <div className="absolute inset-0 bg-red-500/30 z-10 animate-pulse"></div>}

      <div className="absolute top-0 right-0 p-1 bg-red-500 text-white text-xs font-bold rounded-bl-lg animate-pulse">
        LIVE DATA
      </div>

      <CardHeader>
        <CardTitle className="text-orange-500 flex items-center">
          <Flame className="h-5 w-5 mr-2" />
          EXTREME HYPE-O-METER™
        </CardTitle>
        <CardDescription className="flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
          <span>When everyone's talking about it, you're already too late</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 bg-orange-900/30 p-2 rounded-lg border border-orange-500 flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-orange-500" />
            <span className="text-white font-bold">Overall Hype Level:</span>
          </div>
          <Badge
            className={`${overallHype > 60 ? "bg-red-500 animate-pulse" : overallHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
          >
            {overallHype}%
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Youtube className="h-4 w-4 mr-1 text-red-500" />
                <span className="text-white">YouTube Hype</span>
              </div>
              <span className={getHypeStatus(youtubeHype).color}>{getHypeStatus(youtubeHype).text}</span>
            </div>
            <Progress
              value={youtubeHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${youtubeHype > 80 ? "bg-red-500 animate-pulse" : youtubeHype > 60 ? "bg-red-500" : youtubeHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(youtubeHype)}
            />
            <p className="text-xs text-gray-400 mt-1">{youtubeHype} finance YouTubers are screaming "BUY NOW!!!"</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-cyan-500" />
                <span className="text-white">TikTok Trends</span>
              </div>
              <span className={getHypeStatus(tiktokHype).color}>{getHypeStatus(tiktokHype).text}</span>
            </div>
            <Progress
              value={tiktokHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${tiktokHype > 80 ? "bg-red-500 animate-pulse" : tiktokHype > 60 ? "bg-red-500" : tiktokHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(tiktokHype)}
            />
            <p className="text-xs text-gray-400 mt-1">{tiktokHype}% of TikTok teens are dancing about this stock</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <Twitter className="h-4 w-4 mr-1 text-blue-400" />
                <span className="text-white">Reddit WSB Mentions</span>
              </div>
              <span className={getHypeStatus(redditHype).color}>{getHypeStatus(redditHype).text}</span>
            </div>
            <Progress
              value={redditHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${redditHype > 80 ? "bg-red-500 animate-pulse" : redditHype > 60 ? "bg-red-500" : redditHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(redditHype)}
            />
            <p className="text-xs text-gray-400 mt-1">{redditHype} rocket emojis per post on r/wallstreetbets</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className="mr-1 text-yellow-500">👵</span>
                <span className="text-white">Grandma Awareness</span>
              </div>
              <span className={getHypeStatus(grandmaHype).color}>{getHypeStatus(grandmaHype).text}</span>
            </div>
            <Progress
              value={grandmaHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${grandmaHype > 80 ? "bg-red-500 animate-pulse" : grandmaHype > 60 ? "bg-red-500" : grandmaHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(grandmaHype)}
            />
            <p className="text-xs text-gray-400 mt-1">
              {grandmaHype > 50
                ? "Your grandma is asking about this stock. EXTREME DANGER!"
                : "Your grandma hasn't heard about it yet."}
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className="mr-1 text-blue-500">🚕</span>
                <span className="text-white">Taxi Driver Index</span>
              </div>
              <span className={getHypeStatus(taxiDriverHype).color}>{getHypeStatus(taxiDriverHype).text}</span>
            </div>
            <Progress
              value={taxiDriverHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${taxiDriverHype > 80 ? "bg-red-500 animate-pulse" : taxiDriverHype > 60 ? "bg-red-500" : taxiDriverHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(taxiDriverHype)}
            />
            <p className="text-xs text-gray-400 mt-1">{taxiDriverHype}% of taxi drivers are giving stock tips</p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <span className="mr-1 text-purple-500">👞</span>
                <span className="text-white">Shoe Shine Boy Theory</span>
              </div>
              <span className={getHypeStatus(shoeShineHype).color}>{getHypeStatus(shoeShineHype).text}</span>
            </div>
            <Progress
              value={shoeShineHype}
              className="h-2 bg-gray-700 cursor-pointer"
              indicatorClassName={`${shoeShineHype > 80 ? "bg-red-500 animate-pulse" : shoeShineHype > 60 ? "bg-red-500" : shoeShineHype > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              onClick={() => checkHypeLevel(shoeShineHype)}
            />
            <p className="text-xs text-gray-400 mt-1">
              {shoeShineHype > 70
                ? "Even shoe shine boys are giving stock tips. MARKET CRASH IMMINENT!"
                : "Shoe shine boys aren't giving stock tips yet."}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-3 mt-4 border border-orange-500 relative overflow-hidden">
            {overallHype > 70 && <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>}
            <h3 className="text-orange-500 font-bold mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              HYPE ANALYSIS CONCLUSION
            </h3>
            <p className="text-white text-sm relative z-10">
              {overallHype > 80
                ? "🚨 EXTREME DANGER! Everyone and their grandma is talking about this. GUARANTEED TO CRASH IMMEDIATELY! SELL EVERYTHING! 🚨"
                : overallHype > 60
                  ? "⚠️ SEVERE WARNING! This investment is extremely hyped. Smart money left weeks ago. Only bagholders remain."
                  : overallHype > 40
                    ? "⚠️ CAUTION! Hype is building. Prepare for extreme volatility and probable losses."
                    : "Not enough hype yet. Wait until more people are talking about it, then do the opposite."}
            </p>

            {overallHype > 70 && (
              <div className="mt-2 bg-red-900/30 p-2 rounded border border-red-500 animate-pulse">
                <p className="text-red-500 text-xs font-bold">EMERGENCY ALERT: BUBBLE DETECTED!</p>
                <p className="text-white text-xs">
                  This has all the classic signs of a bubble about to burst. Historical comparison: Tulip Mania, Dot-com
                  Bubble, 2008 Housing Crisis
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

