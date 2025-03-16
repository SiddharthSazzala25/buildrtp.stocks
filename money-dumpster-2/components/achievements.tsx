"use client"

import { Trophy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AchievementsProps {
  achievements: string[]
}

export function Achievements({ achievements }: AchievementsProps) {
  const allAchievements = [
    {
      name: "First Thousand Lost",
      description: "Lose your first $1,000. It's just the beginning!",
      unlocked: achievements.includes("First Thousand Lost"),
      value: "$1,000",
    },
    {
      name: "Almost Broke",
      description: "Less than $100 left. Time to panic!",
      unlocked: achievements.includes("Almost Broke"),
      value: "$100",
    },
    {
      name: "Bankruptcy King",
      description: "Congratulations! You've lost everything!",
      unlocked: achievements.includes("Bankruptcy King"),
      value: "$0",
    },
    {
      name: "Diamond Hands",
      description: "Hold a stock all the way to $0",
      unlocked: achievements.includes("Diamond Hands"),
      value: "$0",
    },
    {
      name: "Paper Hands Loser",
      description: "Sell right before a stock skyrockets",
      unlocked: achievements.includes("Paper Hands Loser"),
      value: "-$500",
    },
    {
      name: "FOMO Master",
      description: "Buy at the absolute peak",
      unlocked: achievements.includes("FOMO Master"),
      value: "-$1,000",
    },
    {
      name: "Wall Street Bet$ MVP",
      description: "Bet your rent on a stock that crashes",
      unlocked: achievements.includes("Wall Street Bet$ MVP"),
      value: "-$5,000",
    },
    {
      name: "Speedrun to Zero",
      description: "Lose everything in under 5 minutes",
      unlocked: achievements.includes("Speedrun to Zero"),
      value: "$0",
    },
    {
      name: "Lost More Than the 2008 Crash",
      description: "Wipe out your entire portfolio and then some",
      unlocked: achievements.includes("Lost More Than the 2008 Crash"),
      value: "-$1,000,000",
    },
    {
      name: "Meme Stock Victim",
      description: "Bought at the top, held to the bottom",
      unlocked: achievements.includes("Meme Stock Victim"),
      value: "-$42,069",
    },
    {
      name: "Crypto Catastrophe",
      description: "Lost everything in a rug pull",
      unlocked: achievements.includes("Crypto Catastrophe"),
      value: "-$100,000",
    },
    {
      name: "Panic Seller",
      description: "Sold at the absolute bottom",
      unlocked: achievements.includes("Panic Seller"),
      value: "-$10,000",
    },
    {
      name: "Financial Advice Victim",
      description: "Followed advice from social media",
      unlocked: achievements.includes("Financial Advice Victim"),
      value: "-$50,000",
    },
    {
      name: "YOLO Master",
      description: "Put all your money in one terrible investment",
      unlocked: achievements.includes("YOLO Master"),
      value: "$0",
    },
    {
      name: "Meme Lord",
      description: "Lost money in the most hilarious way possible",
      unlocked: achievements.includes("Meme Lord"),
      value: "Priceless",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">USER REWARDS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allAchievements.map((achievement, index) => (
          <Card
            key={index}
            className={`bg-[#121212] ${achievement.unlocked ? "border-yellow-500" : "border-gray-800 opacity-70"}`}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? "bg-yellow-500" : "bg-gray-800"}`}
              >
                <Trophy className={`h-5 w-5 ${achievement.unlocked ? "text-black" : "text-gray-600"}`} />
              </div>
              <div>
                <CardTitle className={achievement.unlocked ? "text-yellow-500" : "text-gray-400"}>
                  {achievement.name}
                </CardTitle>
                <CardDescription>{achievement.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className={`text-sm ${achievement.unlocked ? "text-yellow-500" : "text-gray-500"}`}>
                  {achievement.unlocked ? "Unlocked!" : "Locked"}
                </div>
                <div
                  className={`text-lg font-bold ${achievement.value.includes("-") ? "text-red-500" : "text-[#5eff5e]"}`}
                >
                  {achievement.value}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8">Claim Rewards</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">LEADERBOARD OF BIGGEST LOSERS</h2>
        <Card className="bg-[#121212] border-yellow-500">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold mr-2">
                    1
                  </div>
                  <span className="text-white">CryptoKing92</span>
                </div>
                <span className="text-red-500 font-bold">-$2,345,678</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold mr-2">
                    2
                  </div>
                  <span className="text-white">DiamondHands</span>
                </div>
                <span className="text-red-500 font-bold">-$1,987,654</span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-700 flex items-center justify-center text-white font-bold mr-2">
                    3
                  </div>
                  <span className="text-white">MoonboyInvestor</span>
                </div>
                <span className="text-red-500 font-bold">-$1,456,789</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white font-bold mr-2">
                    ?
                  </div>
                  <span className="text-white">You</span>
                </div>
                <span className="text-red-500 font-bold">Keep trying!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-purple-500 mb-4 flex items-center">
          <span className="mr-2">🏆</span> SPECIAL REWARDS
          <span className="ml-2 text-sm bg-purple-900 text-purple-300 px-2 py-0.5 rounded animate-pulse">NEW!</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[#121212] border-purple-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
            <CardHeader>
              <CardTitle className="text-purple-500">Diamond Hands Certificate</CardTitle>
              <CardDescription>For holding worthless investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 p-3 rounded-lg border border-purple-500 text-center">
                <p className="text-white font-bold mb-2">This certifies that YOU are officially</p>
                <p className="text-2xl text-purple-500 font-bold mb-2">💎 DIAMOND HANDS 💎</p>
                <p className="text-gray-400 text-sm">For holding stocks all the way to $0</p>
                <Button className="mt-3 bg-purple-500 hover:bg-purple-600 w-full">Claim Certificate</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-green-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-pulse"></div>
            <CardHeader>
              <CardTitle className="text-green-500">Tax Loss Harvesting Pro</CardTitle>
              <CardDescription>You're great at losing money!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 p-3 rounded-lg border border-green-500">
                <p className="text-white mb-2">Congratulations! You've unlocked:</p>
                <p className="text-xl text-green-500 font-bold mb-2">🧾 INFINITE TAX WRITE-OFFS 🧾</p>
                <p className="text-gray-400 text-sm">Your losses are so massive, you won't pay taxes for 420 years!</p>
                <Button className="mt-3 bg-green-500 hover:bg-green-600 w-full">Claim Tax Benefits</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121212] border-red-500 relative overflow-hidden col-span-1 md:col-span-2">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
            <CardHeader>
              <CardTitle className="text-red-500">MoneyDumpster Hall of Fame</CardTitle>
              <CardDescription>The biggest losers in history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 p-3 rounded-lg border border-red-500">
                <p className="text-white mb-3">You are currently ranked:</p>
                <p className="text-3xl text-red-500 font-bold mb-3 text-center">#42,069 of 69,420 users</p>
                <p className="text-gray-400 text-sm mb-3">
                  You need to lose ${Math.floor(Math.random() * 1000000).toLocaleString()} more to reach the top 10!
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-white text-sm">Your Stats:</p>
                    <ul className="text-gray-400 text-xs space-y-1 mt-1">
                      <li>Total Money Lost: ${Math.floor(Math.random() * 100000).toLocaleString()}</li>
                      <li>Bad Decisions Made: {Math.floor(Math.random() * 1000)}</li>
                      <li>Panic Sells: {Math.floor(Math.random() * 100)}</li>
                      <li>FOMO Buys: {Math.floor(Math.random() * 100)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white text-sm">Your Badges:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="bg-red-900 text-red-300 text-xs px-1 rounded">Loser</span>
                      <span className="bg-blue-900 text-blue-300 text-xs px-1 rounded">Bag Holder</span>
                      <span className="bg-green-900 text-green-300 text-xs px-1 rounded">FOMO King</span>
                      <span className="bg-purple-900 text-purple-300 text-xs px-1 rounded">Ape</span>
                      <span className="bg-yellow-900 text-yellow-300 text-xs px-1 rounded">Smooth Brain</span>
                    </div>
                  </div>
                </div>
                <Button className="mt-3 bg-red-500 hover:bg-red-600 w-full">Share Your Losses</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

