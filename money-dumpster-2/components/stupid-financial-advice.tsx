"use client"

import { useState, useEffect } from "react"
import { Brain, DollarSign, Lightbulb, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export function StupidFinancialAdvice() {
  const [advice, setAdvice] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const generateAdvice = () => {
    setLoading(true)

    const stupidAdvice = [
      "Buy high, sell low - it's the MoneyDumpster way!",
      "The more emojis in the whitepaper, the better the investment!",
      "If your taxi driver recommends a stock, go all in!",
      "The best time to sell was yesterday, the second best time is never!",
      "Diversification is for wimps! Put everything in one stock!",
      "If the company name has 'blockchain' in it, it's guaranteed to succeed!",
      "Always trust financial advice from random people on social media!",
      "The more debt a company has, the more growth potential it has!",
      "If a stock drops 90%, it can only drop another 10%! (Math is hard)",
      "The best investment strategy is to close your eyes and click randomly!",
      "Always buy stocks based on how cool their logo looks!",
      "If a crypto has a dog as its mascot, it's definitely going to the moon!",
      "The more complicated an investment sounds, the better it must be!",
      "If a stock is trending on social media, you're already too late!",
      "Always invest based on your zodiac sign's daily horoscope!",
      "If the CEO wears a turtleneck, the company is the next Apple!",
      "The best time to buy is when everyone is panicking and selling!",
      "If a company doesn't make money, it's just focusing on growth!",
      "Always trust investment tips from your cousin's roommate's dog walker!",
      "If you can't explain what a company does, it's probably revolutionary!",
    ]

    const randomAdvice = stupidAdvice[Math.floor(Math.random() * stupidAdvice.length)]
    setAdvice(randomAdvice)
    setLoading(false)

    toast({
      title: "Financial Wisdom Received!",
      description: "This advice is guaranteed to lose you money!",
      variant: "default",
    })
  }

  const followAdvice = () => {
    toast({
      title: "Following Stupid Advice!",
      description: "This is definitely going to end badly...",
      variant: "default",
    })

    // Always end badly
    setTimeout(() => {
      toast({
        title: "CATASTROPHIC LOSS!",
        description: "You lost everything by following that advice! Who could have seen this coming?",
        variant: "destructive",
      })
    }, 3000)
  }

  useEffect(() => {
    generateAdvice()
  }, [])

  return (
    <Card className="bg-[#121212] border-yellow-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 animate-pulse"></div>

      <CardHeader>
        <CardTitle className="text-yellow-500 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          STUPID FINANCIAL ADVICE
        </CardTitle>
        <CardDescription>Guaranteed to lose you money or your money back! (Just kidding, no refunds)</CardDescription>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <RefreshCcw className="h-8 w-8 animate-spin text-yellow-500" />
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg border border-yellow-500 relative">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-16 h-16 bg-yellow-500 rotate-12 flex items-center justify-center rounded-lg">
              <span className="text-black font-bold text-xs text-center">CERTIFIED BAD ADVICE</span>
            </div>

            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center mr-3 flex-shrink-0">
                <Brain className="h-5 w-5 text-black" />
              </div>
              <div>
                <p className="text-white text-lg font-bold">{advice}</p>
                <p className="text-gray-400 text-sm mt-2">
                  This advice has a 100% failure rate. Perfect for MoneyDumpster!
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 text-sm">Potential Loss: INFINITE</span>
              </div>
              <div className="text-xs text-gray-400">Source: University of Bad Decisions</div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold" onClick={generateAdvice}>
            Get More Terrible Advice
          </Button>

          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold" onClick={followAdvice}>
            Follow This Advice
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

