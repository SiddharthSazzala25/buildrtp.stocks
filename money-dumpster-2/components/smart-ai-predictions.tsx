"use client"

import { useState, useEffect } from "react"
import { Brain, RefreshCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

interface SmartAiPredictionsProps {
  gameMode: string
}

export function SmartAiPredictions({ gameMode }: SmartAiPredictionsProps) {
  const [predictions, setPredictions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generatePredictions()
  }, [gameMode])

  const generatePredictions = () => {
    setLoading(true)

    const allPredictions = [
      "Apple is looking strong! Invest everything! (This prediction was made by a toaster)",
      "This stock will 1000x in one day! (Source: My horoscope)",
      "Trust me, I'm an AI! I was trained on Reddit comments exclusively!",
      "The stars say to buy crypto today! (The stars are actually just the lights on my server rack)",
      "Sell everything and invest in invisible chairs! They're the future!",
      "According to my calculations, stocks only go up! (I can only count up, not down)",
      "My dice roll says this is a good investment! I rolled a 1 out of 20!",
      "Your horoscope indicates financial doom if you don't buy now! (I made up your horoscope)",
      "I predict with 100% certainty that this prediction is wrong!",
      "Buy high, sell low - it's the MoneyDumpster way! This strategy has a 100% failure rate!",
      "This investment is guaranteed* to make you rich! (*guarantee void if you want to make money)",
      "My random number generator says this is a good time to invest! (It's actually just a cat walking on a keyboard)",
      "I analyzed the chart patterns and they look exactly like a cat! Bullish!",
      "The moon is in retrograde Jupiter ascending, which means STONKS!",
      "I've analyzed 0 data points and concluded this is definitely a buy!",
      "According to my advanced AI model (a Magic 8-Ball), outlook good!",
      "I'm 99.9% confident this prediction is accurate! (Margin of error: 99.9%)",
    ]

    // Select 3 random predictions
    const randomPredictions = []
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * allPredictions.length)
      randomPredictions.push(allPredictions[randomIndex])
    }

    setPredictions(randomPredictions)
    setLoading(false)
  }

  const followPrediction = (prediction: string, index: number) => {
    toast({
      title: `Following AI Prediction #${index + 1}`,
      description: "This is definitely going to end badly...",
      variant: "default",
    })

    // Random outcome
    setTimeout(() => {
      if (Math.random() < 0.9) {
        // 90% chance of failure
        toast({
          title: "PREDICTION FAILED!",
          description: "The AI was completely wrong! Who could have seen this coming?",
          variant: "destructive",
        })
      } else {
        toast({
          title: "PREDICTION SUCCEEDED!",
          description: "The AI was actually right! This must be a glitch in the matrix.",
          variant: "default",
        })
      }
    }, 3000)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <RefreshCcw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <Card className="bg-[#121212] border-blue-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      <CardHeader>
        <CardTitle className="text-blue-500 flex items-center relative">
          <Brain className="h-5 w-5 mr-2" />
          <span className="relative">
            <span className="absolute -inset-0.5 bg-blue-500/20 animate-pulse rounded"></span>
            <span className="relative">Smart AI Predictions</span>
          </span>
          <span className="ml-2 text-xs bg-blue-900 text-blue-300 px-1 rounded animate-pulse">v0.0.1</span>
        </CardTitle>
        <CardDescription>Powered by astrology, dice rolls, and random guessing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-3 relative cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => followPrediction(prediction, index)}
            >
              <div className={`absolute inset-0 bg-blue-500/5 ${index % 2 === 0 ? "animate-pulse" : ""}`}></div>
              <div className="flex items-start relative z-10">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div>
                  <p className="text-white">{prediction}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-1">AI Confidence:</span>
                      <span className="text-xs text-green-500 font-bold">{Math.floor(Math.random() * 100) + 90}%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-1">Accuracy:</span>
                      <span className="text-xs text-red-500 font-bold">{Math.floor(Math.random() * 10)}%</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    <span className="text-blue-400">AI Analysis:</span> This prediction was generated using{" "}
                    {Math.floor(Math.random() * 1000000)} data points,
                    {Math.floor(Math.random() * 100)} machine learning models, and a random number generator.
                  </div>
                  <div className="mt-1 text-xs text-gray-500 italic">
                    {Math.random() > 0.5
                      ? "Warning: This prediction will self-destruct after reading"
                      : "Note: Past performance is not indicative of future results (but future losses are guaranteed)"}
                  </div>
                  <Button
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      followPrediction(prediction, index)
                    }}
                  >
                    Follow This Advice
                  </Button>
                </div>
              </div>
              {Math.random() > 0.7 && (
                <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded animate-pulse">
                  ERROR
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={generatePredictions}>
          Generate New Predictions
        </Button>
      </CardFooter>
    </Card>
  )
}

