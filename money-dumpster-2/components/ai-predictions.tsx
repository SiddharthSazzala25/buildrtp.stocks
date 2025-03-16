"use client"

import { useState, useEffect } from "react"
import { Brain, Dice1Icon as Dice, RefreshCcw, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AIPredictionsProps {
  gameMode: string
}

export function AIPredictions({ gameMode }: AIPredictionsProps) {
  const [predictions, setPredictions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    generatePredictions()
  }, [gameMode])

  const generatePredictions = () => {
    setLoading(true)

    // Terrible AI predictions
    const allPredictions = [
      "Apple is looking strong! Invest everything! (Apple crashes instantly.)",
      "This stock will 1000x in one day! (It vanishes from the market.)",
      "Trust me, I'm an AI! (DO NOT TRUST IT.)",
      "The stars align for TSLA today! Buy now! (Based on astrology, not data.)",
      "Our algorithms predict AMZN will triple by Friday! (Our algorithm is a dice roll.)",
      "Insider information says this penny stock is the next big thing! (It's not.)",
      "According to our technical analysis, this chart looks exactly like the 2021 bull run! (We drew random lines.)",
      "Buy the dip! This is just a temporary correction! (It's not temporary.)",
      "Sell everything and go all-in on this obscure token! (Created yesterday by teenagers.)",
      "Market crash imminent! Convert all assets to our special MoneyDumpster Coin! (It's worthless.)",
      "This stock has a 99.9% chance of success! (We made up this statistic.)",
      "Our sentiment analysis shows extreme bullishness! (We only checked three tweets.)",
      "This investment is literally can't-miss! (Watch how easily you can miss.)",
      "The chart pattern shows a golden cross! (We don't know what that means either.)",
    ]

    // Select 4 random predictions
    const shuffled = [...allPredictions].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 4)

    setPredictions(selected)
    setLoading(false)
  }

  const followAdvice = (prediction: string) => {
    toast({
      title: "Following AI Advice",
      description: "That was a terrible decision!",
      variant: "destructive",
    })

    // 50% chance of a catastrophic event
    if (Math.random() > 0.5) {
      setTimeout(() => {
        toast({
          title: "CATASTROPHIC LOSS!",
          description: "The AI was wrong! Who could have possibly predicted this?",
          variant: "destructive",
        })
      }, 3000)
    }
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
        <h2 className="text-2xl font-bold flex items-center">
          <Brain className="h-6 w-6 mr-2 text-purple-500" />
          SMART AI PREDICTIONS
          <span className="text-sm text-gray-400 ml-2">(a.k.a. Random Guess Generator)</span>
        </h2>
        <Button variant="outline" onClick={generatePredictions}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          New Predictions
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {predictions.map((prediction, index) => {
          const [advice, consequence] = prediction.split("(")
          return (
            <Card key={index} className="bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  AI Prediction #{index + 1}
                </CardTitle>
                <CardDescription>Based on advanced algorithms and astrology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-white mb-2">{advice}</p>
                <p className="text-sm text-red-400 italic">{consequence ? `(${consequence}` : ""}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => followAdvice(prediction)}>
                  <Dice className="h-4 w-4 mr-2" />
                  Follow This Advice
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

