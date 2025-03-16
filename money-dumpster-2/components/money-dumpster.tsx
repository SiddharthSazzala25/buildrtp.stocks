"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp, DollarSign, Flame, TrendingDown, Home, TrendingUp, BarChart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StockMarket } from "./stock-market"
import { NewsFlash } from "./news-flash"
import { Achievements } from "./achievements"
import { CryptoMarket } from "./crypto-market"
import { SmartAiPredictions } from "./smart-ai-predictions"
import { HypeMeter } from "./hype-meter"
import { useToast } from "@/hooks/use-toast"
import { StupidFinancialAdvice } from "./stupid-financial-advice"
import { MemeStockGenerator } from "./meme-stock-generator"

export default function MoneyDumpster() {
  const [money, setMoney] = useState(10000)
  const [netWorth, setNetWorth] = useState(10000)
  const [passiveIncome, setPassiveIncome] = useState(0)
  const [gameMode, setGameMode] = useState("normal")
  const [achievements, setAchievements] = useState<string[]>([])
  const [stocksOwned, setStocksOwned] = useState<Record<string, number>>({})
  const [cryptoOwned, setCryptoOwned] = useState<Record<string, number>>({})
  const [gameStarted, setGameStarted] = useState(false)
  const [activeTab, setActiveTab] = useState("market")
  const { toast } = useToast()

  // Add these new state variables near the top of the MoneyDumpster component, after the existing useState declarations
  const [clickCount, setClickCount] = useState(0)
  const [moneyMultiplier, setMoneyMultiplier] = useState(1)
  const [showStupidAdvice, setShowStupidAdvice] = useState(false)
  const [showMemeGenerator, setShowMemeGenerator] = useState(false)
  const [panicMode, setPanicMode] = useState(false)

  // Idle game mechanics - passive income
  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      // In MoneyDumpster, passive income is usually negative
      const randomLoss = Math.random() * 10 * (passiveIncome + 1)
      setMoney((prev) => Math.max(0, prev + passiveIncome - randomLoss))

      // Randomly trigger market events
      if (Math.random() < 0.2) {
        triggerRandomEvent()
      }

      // Random stupid popup
      if (Math.random() < 0.1) {
        const stupidPopups = [
          "Your cat just walked on your keyboard and bought 1000 shares of MEOW!",
          "Breaking: Your financial advisor was actually three kids in a trenchcoat!",
          "You've been selected for a special tax audit because your investments are too stupid!",
          "Congratulations! You qualify for our special 'Lose Money Faster' program!",
          "A time traveler from the future says all your investments will fail!",
          "Your portfolio is now being managed by a random number generator!",
          "We've replaced your investment strategy with a monkey throwing darts!",
          "Your account has been flagged for being too bad at investing!",
        ]

        toast({
          title: "RANDOM EVENT!",
          description: stupidPopups[Math.floor(Math.random() * stupidPopups.length)],
          variant: "default",
        })
      }

      // Update net worth
      calculateNetWorth()
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, passiveIncome])

  // Random market crashes
  useEffect(() => {
    if (!gameStarted) return

    const crashTimer = setInterval(
      () => {
        if (Math.random() < 0.5) {
          toast({
            title: "MARKET CRASH!",
            description: "The entire market just crashed for absolutely no reason!",
            variant: "destructive",
          })
          setMoney((prev) => prev * 0.7)
        }
      },
      30 * 60 * 1000,
    ) // Every 30 minutes

    return () => clearInterval(crashTimer)
  }, [gameStarted])

  // Calculate net worth based on cash and investments
  const calculateNetWorth = () => {
    // In this game, stocks usually lose value over time
    const stocksValue = Object.entries(stocksOwned).reduce((total, [stock, amount]) => {
      // Each stock randomly loses 0-5% of its value
      const randomLoss = Math.random() * 0.05
      return total + amount * (1 - randomLoss)
    }, 0)

    // Crypto is even more volatile
    const cryptoValue = Object.entries(cryptoOwned).reduce((total, [crypto, amount]) => {
      // Each crypto randomly loses 0-10% of its value
      const randomLoss = Math.random() * 0.1
      return total + amount * (1 - randomLoss)
    }, 0)

    setNetWorth(money + stocksValue + cryptoValue)

    // Check for achievements
    checkAchievements()
  }

  // Trigger random market events
  const triggerRandomEvent = () => {
    const events = [
      "Market crash! You lost 20% of your portfolio value.",
      "Inflation just hit 500%! Your money is worth less now.",
      "Your financial advisor just ran away with half your money!",
      "Congratulations! You qualified for a predatory loan!",
      "Breaking news: All your stocks were delisted!",
      "Your bank just introduced a new 'wealth reduction' fee!",
      "A pigeon landed on Wall Street! All tech stocks are now worthless.",
      "Someone sneezed during a CNBC interview. Market down 40%!",
      "Your stocks were accidentally sold by a cat walking on a keyboard.",
      "The market is now being controlled by a Magic 8-Ball. Outlook not good.",
    ]

    const randomEvent = events[Math.floor(Math.random() * events.length)]

    toast({
      title: "BREAKING NEWS!",
      description: randomEvent,
      variant: "destructive",
    })

    // Apply the negative effect
    setMoney((prev) => prev * 0.8)
  }

  // Check for achievements
  const checkAchievements = () => {
    const newAchievements = [...achievements]

    if (netWorth < 1000 && !achievements.includes("First Thousand Lost")) {
      newAchievements.push("First Thousand Lost")
      toast({
        title: "Achievement Unlocked!",
        description: "First Thousand Lost: You're on your way to financial ruin!",
        variant: "default",
      })
    }

    if (netWorth < 100 && !achievements.includes("Almost Broke")) {
      newAchievements.push("Almost Broke")
      toast({
        title: "Achievement Unlocked!",
        description: "Almost Broke: Just a little more to go!",
        variant: "default",
      })
    }

    if (netWorth <= 0 && !achievements.includes("Bankruptcy King")) {
      newAchievements.push("Bankruptcy King")
      toast({
        title: "Achievement Unlocked!",
        description: "Bankruptcy King: You've lost it all! Congratulations?",
        variant: "default",
      })
    }

    if (Object.keys(stocksOwned).length > 0 && !achievements.includes("Wall Street Bet$ MVP")) {
      const anyStockOwned = Object.values(stocksOwned).some((amount) => amount > 0)
      if (anyStockOwned && money < 100) {
        newAchievements.push("Wall Street Bet$ MVP")
        toast({
          title: "Achievement Unlocked!",
          description: "Wall Street Bet$ MVP: You bet it all on stocks and now you're broke!",
          variant: "default",
        })
      }
    }

    if (netWorth < -1000000 && !achievements.includes("Lost More Than the 2008 Crash")) {
      newAchievements.push("Lost More Than the 2008 Crash")
      toast({
        title: "Achievement Unlocked!",
        description: "Lost More Than the 2008 Crash: Your losses are historically bad!",
        variant: "default",
      })

      // Force tweet about being bad at investing
      toast({
        title: "ATTENTION!",
        description: "The app just tweeted 'I am bad at investing' from your account!",
        variant: "destructive",
      })
    }

    setAchievements(newAchievements)
  }

  // Buy a terrible investment
  const buyInvestment = (name: string, cost: number, incomeChange: number) => {
    if (money >= cost) {
      setMoney((prev) => prev - cost)
      setPassiveIncome((prev) => prev + incomeChange)

      toast({
        title: `Purchased ${name}!`,
        description:
          incomeChange >= 0
            ? `This will surely make you rich! (Narrator: It won't)`
            : `Congratulations on your terrible decision!`,
        variant: incomeChange >= 0 ? "default" : "destructive",
      })
    } else {
      toast({
        title: "Not enough money!",
        description: "Even your fake money is running out. Impressive!",
        variant: "destructive",
      })
    }
  }

  // Buy a stock (always a bad idea in this game)
  const buyStock = (stockName: string, price: number) => {
    if (money >= price) {
      setMoney((prev) => prev - price)
      setStocksOwned((prev) => ({
        ...prev,
        [stockName]: (prev[stockName] || 0) + 1,
      }))

      toast({
        title: `Bought 1 share of ${stockName}!`,
        description: "Watch it plummet in real-time!",
        variant: "default",
      })

      // Schedule the inevitable crash
      setTimeout(
        () => {
          toast({
            title: `${stockName} is crashing!`,
            description: "Should have sold sooner! (Not that it would have helped)",
            variant: "destructive",
          })
        },
        Math.random() * 10000 + 5000,
      )
    } else {
      toast({
        title: "Not enough money!",
        description: "Consider yourself lucky - we just saved you from a terrible investment!",
        variant: "destructive",
      })
    }
  }

  // Buy crypto (even worse than stocks)
  const buyCrypto = (cryptoName: string, price: number) => {
    if (money >= price) {
      setMoney((prev) => prev - price)
      setCryptoOwned((prev) => ({
        ...prev,
        [cryptoName]: (prev[cryptoName] || 0) + 1,
      }))

      toast({
        title: `Bought 1 ${cryptoName}!`,
        description: "To the moon! (Just kidding, it's going to zero)",
        variant: "default",
      })

      // Schedule the rug pull
      setTimeout(
        () => {
          toast({
            title: `${cryptoName} RUG PULL ALERT!`,
            description: "The developers just disappeared with everyone's money!",
            variant: "destructive",
          })

          // Remove the crypto from owned
          setCryptoOwned((prev) => {
            const newOwned = { ...prev }
            delete newOwned[cryptoName]
            return newOwned
          })
        },
        Math.random() * 20000 + 10000,
      )
    } else {
      toast({
        title: "Not enough money!",
        description: "Your wallet thanks you for this forced HODL moment.",
        variant: "destructive",
      })
    }
  }

  // Sell a stock (always at the worst time)
  const sellStock = (stockName: string) => {
    if (stocksOwned[stockName] && stocksOwned[stockName] > 0) {
      // Calculate a terrible selling price (always less than what they paid)
      const terriblePrice = Math.random() * 100 // Random low price

      setMoney((prev) => prev + terriblePrice)
      setStocksOwned((prev) => ({
        ...prev,
        [stockName]: prev[stockName] - 1,
      }))

      toast({
        title: `Sold 1 share of ${stockName}!`,
        description: "Congrats! It's about to skyrocket now that you sold!",
        variant: "default",
      })

      // Stock skyrockets after selling
      setTimeout(() => {
        toast({
          title: `${stockName} just went up 1000%!`,
          description: "If only you had held onto it for 5 more minutes!",
          variant: "destructive",
        })

        // Add Paper Hands Loser achievement
        if (!achievements.includes("Paper Hands Loser")) {
          setAchievements((prev) => [...prev, "Paper Hands Loser"])
          toast({
            title: "Achievement Unlocked!",
            description: "Paper Hands Loser: You sold right before the stock mooned!",
            variant: "default",
          })
        }
      }, 5000)
    } else {
      toast({
        title: "No shares to sell!",
        description: "You can't sell what you don't own... or can you? (No, you can't.)",
        variant: "destructive",
      })
    }
  }

  // Start the game
  const startGame = (mode: string) => {
    setGameMode(mode)
    setGameStarted(true)

    // Different starting conditions based on mode
    switch (mode) {
      case "pumpAndDump":
        setMoney(5000)
        setNetWorth(5000)
        toast({
          title: "Pump & Dump Paradise Mode Activated!",
          description: "Get ready to watch your investment skyrocket... then crash to zero!",
          variant: "default",
        })

        // Assign a random penny stock
        setTimeout(() => {
          toast({
            title: "You've been assigned a penny stock!",
            description: "All your money has been invested in SCAM Corp!",
            variant: "default",
          })

          setMoney(0)
          setStocksOwned({ SCAM: 5000 })

          // Schedule the pump
          setTimeout(
            () => {
              toast({
                title: "SCAM Corp is pumping!",
                description: "Your investment is now worth $50,000! Feeling lucky?",
                variant: "default",
              })
              setNetWorth(50000)

              // Schedule the dump
              setTimeout(
                () => {
                  toast({
                    title: "SCAM Corp is crashing!",
                    description: "Oops! Should've sold sooner! Your investment is now worth $0!",
                    variant: "destructive",
                  })
                  setNetWorth(0)
                  setStocksOwned({ SCAM: 0 })
                },
                10 * 60 * 1000,
              ) // 10 minutes
            },
            5 * 60 * 1000,
          ) // 5 minutes
        }, 10000)
        break

      case "hedgeFund":
        setMoney(10000000)
        setNetWorth(10000000)
        toast({
          title: "Hedge Fund Mode Activated!",
          description: "You have $10 million to lose in spectacular fashion!",
          variant: "default",
        })
        break

      case "instantRegret":
        setMoney(5000)
        setNetWorth(5000)
        toast({
          title: "Instant Regret Mode Activated!",
          description: "Every decision you make will be the wrong one. Guaranteed!",
          variant: "default",
        })
        break

      case "stockMarketOnDrugs":
        setMoney(25000)
        setNetWorth(25000)
        toast({
          title: "Stock Market on Drugs Mode Activated!",
          description: "Reality is optional. Logic is forbidden.",
          variant: "default",
        })
        break

      case "cryptoNightmare":
        setMoney(50000)
        setNetWorth(50000)
        toast({
          title: "Crypto Nightmare Mode Activated!",
          description: "Get ready for rug pulls, hacks, and lost wallet keys!",
          variant: "default",
        })

        // Schedule random crypto disasters
        const cryptoDisasterInterval = setInterval(
          () => {
            const disasters = [
              "Your crypto wallet was hacked! All funds stolen!",
              "You lost your private keys! All crypto inaccessible!",
              "The exchange you used just exit scammed!",
              "Your NFTs have disappeared from your wallet!",
              "The blockchain just forked and your tokens are now worthless!",
            ]

            const randomDisaster = disasters[Math.floor(Math.random() * disasters.length)]

            toast({
              title: "CRYPTO DISASTER!",
              description: randomDisaster,
              variant: "destructive",
            })

            // Reset crypto holdings
            setCryptoOwned({})
            setMoney((prev) => prev * 0.5)
          },
          5 * 60 * 1000,
        ) // Every 5 minutes

        return () => clearInterval(cryptoDisasterInterval)

      default:
        setMoney(10000)
        setNetWorth(10000)
        toast({
          title: "Normal Mode Activated!",
          description: "Ready to lose money at a reasonable pace!",
          variant: "default",
        })
    }
  }

  // Format money with commas and dollar sign
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Trigger a meme stock event
  const triggerMemeStockEvent = () => {
    const memeEvents = [
      "Reddit just discovered your stock! Price up 2000%!",
      "Elon Musk tweeted about your stock! It's going to Mars!",
      "Your stock is now a meme! Prepare for volatility!",
      "WallStreetBets is pumping your stock! Moon mission initiated!",
      "Diamond hands activated! Your stock is squeezing!",
    ]

    const randomEvent = memeEvents[Math.floor(Math.random() * memeEvents.length)]

    toast({
      title: "MEME STOCK ALERT! 🚀🚀🚀",
      description: randomEvent,
      variant: "default",
    })

    // Temporarily boost net worth
    setNetWorth((prev) => prev * 5)

    // Then crash it
    setTimeout(() => {
      toast({
        title: "MEME STOCK CRASH! 📉📉📉",
        description: "The meme is over! Back to reality!",
        variant: "destructive",
      })
      setNetWorth((prev) => prev * 0.2)
    }, 8000)
  }

  // Add this function to handle money clicking
  const handleMoneyClick = () => {
    setClickCount((prev) => prev + 1)
    setMoney((prev) => prev + 10 * moneyMultiplier)

    // Every 10 clicks, show a toast
    if (clickCount % 10 === 9) {
      toast({
        title: "Click Milestone!",
        description: `You've clicked ${clickCount + 1} times! Here's some bonus money!`,
        variant: "default",
      })
      setMoney((prev) => prev + 100 * moneyMultiplier)
    }

    // Random chance to trigger events
    if (Math.random() < 0.1) {
      triggerRandomEvent()
    }
  }

  // Add this function to handle panic mode
  const togglePanicMode = () => {
    setPanicMode((prev) => !prev)
    if (!panicMode) {
      toast({
        title: "PANIC MODE ACTIVATED!",
        description: "You just lost 50% of your money because you panicked!",
        variant: "destructive",
      })
      setMoney((prev) => prev * 0.5)
      setNetWorth((prev) => prev * 0.5)
    } else {
      toast({
        title: "Panic Mode Deactivated",
        description: "You've calmed down. Your money is still gone though.",
        variant: "default",
      })
    }
  }

  if (!gameStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2 flex items-center justify-center">
            <DollarSign className="h-10 w-10 mr-2" />
            MONEYDUMPSTER™
            <Flame className="h-10 w-10 ml-2 text-orange-500" />
          </h1>
          <p className="text-xl text-gray-400">The World's Worst Financial Simulator</p>
        </div>

        <Card className="mb-8 bg-gray-800 border-red-500">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Choose Your Financial Doom</CardTitle>
            <CardDescription className="text-center text-gray-400">
              All paths lead to bankruptcy. The only question is how fast.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 border-green-500 hover:bg-green-900/20"
              onClick={() => startGame("normal")}
            >
              <div className="text-left">
                <h3 className="font-bold">Normal Mode</h3>
                <p className="text-sm text-gray-400">Lose money at a reasonable pace</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-24 border-blue-500 hover:bg-blue-900/20"
              onClick={() => startGame("hedgeFund")}
            >
              <div className="text-left">
                <h3 className="font-bold">Hedge Fund Mode</h3>
                <p className="text-sm text-gray-400">Start with millions, end with nothing</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-24 border-red-500 hover:bg-red-900/20"
              onClick={() => startGame("instantRegret")}
            >
              <div className="text-left">
                <h3 className="font-bold">Instant Regret Mode</h3>
                <p className="text-sm text-gray-400">Every decision is the wrong one</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-24 border-yellow-500 hover:bg-yellow-900/20"
              onClick={() => startGame("stockMarketOnDrugs")}
            >
              <div className="text-left">
                <h3 className="font-bold">Stock Market on Drugs</h3>
                <p className="text-sm text-gray-400">Pure chaos, no logic allowed</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-24 border-purple-500 hover:bg-purple-900/20"
              onClick={() => startGame("pumpAndDump")}
            >
              <div className="text-left">
                <h3 className="font-bold">Pump & Dump Paradise</h3>
                <p className="text-sm text-gray-400">Watch your investment moon, then crash</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-24 border-cyan-500 hover:bg-cyan-900/20"
              onClick={() => startGame("cryptoNightmare")}
            >
              <div className="text-left">
                <h3 className="font-bold">Crypto Nightmare</h3>
                <p className="text-sm text-gray-400">Rug pulls, hacks, and lost keys</p>
              </div>
            </Button>
          </CardContent>
          <CardFooter className="text-center text-gray-400 italic">
            Warning: No real money is involved, but your dignity is at stake.
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl bg-black text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#5eff5e] mb-2 flex items-center justify-center">
          <DollarSign className="h-10 w-10 mr-2" />
          MONEYDUMPSTER™
          <Flame className="h-10 w-10 ml-2 text-orange-500" />
        </h1>
        <p className="text-xl text-[#5eff5e]">STOCK STOR AL9R</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card
          className={`bg-[#121212] border-[#5eff5e] rounded-xl cursor-pointer transition-all ${clickCount % 5 === 0 && clickCount > 0 ? "animate-bounce" : ""}`}
          onClick={handleMoneyClick}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#5eff5e]">
              <span>Your Money (Click Me!)</span>
              {money > netWorth / 2 ? (
                <TrendingDown className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#5eff5e]">{formatMoney(money)}</div>
            <Progress value={(money / 10000) * 100} className="mt-2 bg-gray-700" indicatorClassName="bg-[#5eff5e]" />
            <div className="text-center mt-2 text-sm text-gray-400">
              Clicks: {clickCount} | +${10 * moneyMultiplier} per click
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121212] border-yellow-500 rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-yellow-500">
              <span>Net Worth</span>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">{formatMoney(netWorth)}</div>
            <Progress
              value={(netWorth / 10000) * 100}
              className="mt-2 bg-gray-700"
              indicatorClassName="bg-yellow-500"
            />
            <Button
              className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              onClick={() => {
                triggerRandomEvent()
                setNetWorth((prev) => prev * 0.8)
                toast({
                  title: "CATASTROPHIC LOSS!",
                  description: "You just lost 20% of your net worth!",
                  variant: "destructive",
                })
              }}
            >
              INSTALL & LOSE EVERYTHING
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#121212] border-red-500 rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-red-500">
              <span>Passive Income</span>
              {passiveIncome >= 0 ? (
                <ArrowUp className="h-5 w-5 text-[#5eff5e]" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${passiveIncome >= 0 ? "text-[#5eff5e]" : "text-red-500"}`}>
              {formatMoney(passiveIncome)}/sec
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {passiveIncome >= 0
                ? "Don't get used to it. This won't last."
                : "Losing money while you sleep. Impressive!"}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                variant="outline"
                className="bg-red-500 hover:bg-red-600 text-white border-none"
                onClick={() => {
                  setPassiveIncome((prev) => prev - 50)
                  setMoney((prev) => prev + 500)
                  toast({
                    title: "Sold Some Assets!",
                    description: "You got some quick cash but reduced your passive income!",
                    variant: "default",
                  })
                }}
              >
                SELL
              </Button>
              <Button
                variant="outline"
                className="bg-[#5eff5e] hover:bg-green-400 text-black border-none"
                onClick={() => {
                  if (money >= 1000) {
                    setMoney((prev) => prev - 1000)
                    setPassiveIncome((prev) => prev + 10)
                    toast({
                      title: "Bought Some Assets!",
                      description: "You spent $1,000 to increase your passive income!",
                      variant: "default",
                    })
                  } else {
                    toast({
                      title: "Not Enough Money!",
                      description: "You need at least $1,000 to buy assets!",
                      variant: "destructive",
                    })
                  }
                }}
              >
                BUY
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          className={`h-16 ${panicMode ? "bg-gray-600 hover:bg-gray-700" : "bg-red-600 hover:bg-red-700 animate-pulse"} text-white text-xl font-bold transition-all`}
          onClick={togglePanicMode}
        >
          {panicMode ? "😌 CALM DOWN 😌" : "🚨 PANIC BUTTON 🚨"}
        </Button>

        <Button
          className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold"
          onClick={() => {
            if (money <= 0) {
              toast({
                title: "No Money to YOLO!",
                description: "You need money to lose money!",
                variant: "destructive",
              })
              return
            }

            toast({
              title: "YOLO MODE ACTIVATED!",
              description: "You just invested all your money in a random stock!",
              variant: "default",
            })
            const randomStock = ["MEME", "SCAM", "PONZ", "DOGE", "MOON"][Math.floor(Math.random() * 5)]
            const currentMoney = money
            setMoney(0)
            setStocksOwned((prev) => ({ ...prev, [randomStock]: (prev[randomStock] || 0) + 1 }))

            // Random chance for immediate moon or crash
            if (Math.random() < 0.3) {
              // Moon scenario
              setTimeout(() => {
                toast({
                  title: `${randomStock} MOONING! 🚀`,
                  description: "Your YOLO investment is up 1000%! Sell now!",
                  variant: "default",
                })
                setNetWorth((prev) => prev + currentMoney * 10)

                // Add a sell button in the toast
                toast({
                  title: "Sell Now?",
                  description: (
                    <Button
                      className="bg-green-500 hover:bg-green-600 text-white w-full mt-2"
                      onClick={() => {
                        setMoney((prev) => prev + currentMoney * 10)
                        setStocksOwned((prev) => {
                          const newStocks = { ...prev }
                          newStocks[randomStock] = 0
                          return newStocks
                        })
                        toast({
                          title: "Sold at the Peak!",
                          description: "You actually made money! This is not the MoneyDumpster way!",
                          variant: "default",
                        })
                      }}
                    >
                      SELL NOW
                    </Button>
                  ),
                  variant: "default",
                  duration: 10000,
                })

                // If they don't sell, it crashes
                setTimeout(() => {
                  toast({
                    title: `${randomStock} CRASHED!`,
                    description: "You didn't sell in time! It's now worthless!",
                    variant: "destructive",
                  })
                  setNetWorth((prev) => prev - currentMoney * 10)
                  setStocksOwned((prev) => {
                    const newStocks = { ...prev }
                    newStocks[randomStock] = 0
                    return newStocks
                  })
                }, 10000)
              }, 3000)
            } else {
              // Crash scenario
              setTimeout(() => {
                toast({
                  title: `${randomStock} CRASHED TO ZERO!`,
                  description: "Your YOLO investment is now worthless! Congratulations!",
                  variant: "destructive",
                })
                setStocksOwned((prev) => {
                  const newStocks = { ...prev }
                  newStocks[randomStock] = 0
                  return newStocks
                })

                // Add achievement
                if (!achievements.includes("YOLO Master")) {
                  setAchievements((prev) => [...prev, "YOLO Master"])
                  toast({
                    title: "Achievement Unlocked!",
                    description: "YOLO Master: Put all your money in one terrible investment!",
                    variant: "default",
                  })
                }
              }, 5000)
            }
          }}
        >
          💸 YOLO ALL-IN 💸
        </Button>

        <Button
          className="h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black text-xl font-bold"
          onClick={() => {
            setShowStupidAdvice(!showStupidAdvice)
            if (!showStupidAdvice) {
              toast({
                title: "Stupid Advice Activated!",
                description: "Now you can get terrible financial advice on demand!",
                variant: "default",
              })
            }
          }}
        >
          {showStupidAdvice ? "🧠 HIDE ADVICE 🧠" : "🧠 STUPID ADVICE 🧠"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Button
          className="h-16 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl font-bold"
          onClick={() => {
            triggerMemeStockEvent()
            // Increase click multiplier temporarily
            const oldMultiplier = moneyMultiplier
            setMoneyMultiplier((prev) => prev * 5)
            toast({
              title: "Click Multiplier Activated!",
              description: "Your clicks are worth 5x more during meme stock mania!",
              variant: "default",
            })

            // Reset after 10 seconds
            setTimeout(() => {
              setMoneyMultiplier(oldMultiplier)
              toast({
                title: "Meme Stock Mania Over!",
                description: "Your click multiplier has returned to normal.",
                variant: "destructive",
              })
            }, 10000)
          }}
        >
          🚀 MEME STOCK MODE 🚀
        </Button>

        <Button
          className="h-16 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white text-xl font-bold"
          onClick={() => {
            setShowMemeGenerator(!showMemeGenerator)
            if (!showMemeGenerator) {
              toast({
                title: "Meme Stock Generator Activated!",
                description: "Create your own worthless stocks!",
                variant: "default",
              })
            }
          }}
        >
          {showMemeGenerator ? "📉 HIDE GENERATOR 📉" : "📈 MEME GENERATOR 📈"}
        </Button>
      </div>

      {showStupidAdvice && (
        <div className="mb-8">
          <StupidFinancialAdvice />
        </div>
      )}

      {showMemeGenerator && (
        <div className="mb-8">
          <MemeStockGenerator />
        </div>
      )}

      <Tabs defaultValue={activeTab} className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4 bg-[#121212]">
          <TabsTrigger value="market" className="data-[state=active]:bg-[#5eff5e] data-[state=active]:text-black">
            STOCKS
          </TabsTrigger>
          <TabsTrigger value="crypto" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            CRYPTO
          </TabsTrigger>
          <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            ANALYSIS
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
            FEATURES
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            REWARDS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          <StockMarket buyStock={buyStock} sellStock={sellStock} gameMode={gameMode} />
        </TabsContent>

        <TabsContent value="crypto" className="space-y-4">
          <CryptoMarket buyCrypto={buyCrypto} gameMode={gameMode} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <SmartAiPredictions gameMode={gameMode} />
            <HypeMeter gameMode={gameMode} />

            <Card className="bg-[#121212] border-yellow-500">
              <CardHeader>
                <CardTitle className="text-yellow-500">Luck-Based Investing</CardTitle>
                <CardDescription>Who needs technical analysis when you have luck?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-800 rounded-lg p-4 mb-4 text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Magic 8-Ball Says:</h3>
                  <p className="text-2xl text-yellow-500 italic">"Outlook not so good. Buy anyway!"</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">Spinning Wheel of Fortune:</h3>
                  <div className="flex justify-center my-4">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative flex items-center justify-center">
                      <div className="absolute w-36 h-36 rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">LOSE</span>
                      </div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-white"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-xl font-bold text-white mb-2">Financial Guru Says:</h3>
                  <p className="text-lg text-gray-300 italic">
                    "Trust the vibes. The chart looks like a cat, which means buy!"
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => {
                    toast({
                      title: "Consulting the stars...",
                      description: "The alignment of Jupiter suggests you should lose all your money!",
                      variant: "default",
                    })
                  }}
                >
                  Get Random Financial Advice
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-[#121212] border-[#5eff5e]">
              <CardHeader>
                <CardTitle className="text-[#5eff5e]">Penny Stock Scheme</CardTitle>
                <CardDescription>Cost: $500</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Invest in a company that doesn't exist. What could go wrong?</p>
                <Badge className="mt-2 bg-red-500">-$10/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-[#5eff5e] hover:bg-green-400 text-black"
                  onClick={() => buyInvestment("Penny Stock Scheme", 500, -10)}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#121212] border-red-500">
              <CardHeader>
                <CardTitle className="text-red-500">Crypto Mining Rig</CardTitle>
                <CardDescription>Cost: $2,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">It generates heat, noise, and disappointment.</p>
                <Badge className="mt-2 bg-red-500">-$25/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => buyInvestment("Crypto Mining Rig", 2000, -25)}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#121212] border-yellow-500">
              <CardHeader>
                <CardTitle className="text-yellow-500">NFT Collection</CardTitle>
                <CardDescription>Cost: $5,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Digital art that somehow loses value faster than physical art.</p>
                <Badge className="mt-2 bg-red-500">-$50/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => buyInvestment("NFT Collection", 5000, -50)}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#121212] border-purple-500">
              <CardHeader>
                <CardTitle className="text-purple-500">Pyramid Scheme</CardTitle>
                <CardDescription>Cost: $10,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">It's not a pyramid, it's a "multi-level marketing opportunity"!</p>
                <Badge className="mt-2 bg-red-500">-$100/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => buyInvestment("Pyramid Scheme", 10000, -100)}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#121212] border-blue-500">
              <CardHeader>
                <CardTitle className="text-blue-500">Invisible Chair Company</CardTitle>
                <CardDescription>Cost: $15,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Selling chairs that don't exist to people who can't sit.</p>
                <Badge className="mt-2 bg-red-500">-$150/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => buyInvestment("Invisible Chair Company", 15000, -150)}
                >
                  Buy
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#121212] border-orange-500">
              <CardHeader>
                <CardTitle className="text-orange-500">Trust Us Button</CardTitle>
                <CardDescription>Cost: $25,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Press this button and watch your money disappear. Trust us!</p>
                <Badge className="mt-2 bg-red-500">-$250/sec</Badge>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={() => {
                    toast({
                      title: "You pressed the Trust Us Button!",
                      description: "All your stocks have mysteriously disappeared!",
                      variant: "destructive",
                    })
                    setStocksOwned({})
                    buyInvestment("Trust Us Button", 25000, -250)
                  }}
                >
                  Trust Us
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <Achievements achievements={achievements} />
        </TabsContent>
      </Tabs>

      <NewsFlash gameMode={gameMode} />

      <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-gray-800 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center text-gray-400">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-gray-400">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Stats</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-yellow-500">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">Earn</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-gray-400">
            <BarChart className="h-5 w-5" />
            <span className="text-xs">Stocks</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center text-gray-400">
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

