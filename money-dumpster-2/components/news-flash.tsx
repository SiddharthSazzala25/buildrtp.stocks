"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface NewsFlashProps {
  gameMode: string
}

export function NewsFlash({ gameMode }: NewsFlashProps) {
  const [news, setNews] = useState("")
  const [visible, setVisible] = useState(false)

  // Generate random news headlines
  useEffect(() => {
    const interval = setInterval(() => {
      generateNews()
      setVisible(true)

      // Hide the news after 5 seconds
      setTimeout(() => {
        setVisible(false)
      }, 5000)
    }, 15000)

    return () => clearInterval(interval)
  }, [gameMode])

  const generateNews = () => {
    const normalNews = [
      "Elon Musk tweets 'DOGE TO $10,000' – DOGE drops 98% instantly.",
      "Warren Buffett buys 10,000 shares of McDonald's! Just kidding, he didn't.",
      "NEW INVESTMENT ALERT: A company that sells NFT screenshots of other NFTs!",
      "The CEO of Amazon just said, 'oops' – Amazon stock drops 50%.",
      "Federal Reserve announces new money printing strategy: 'Just trust us'",
      "Bitcoin declared 'definitely going to $100k this year' for the 7th year in a row",
      "Wall Street analyst recommends buying high and selling low as 'innovative strategy'",
      "New study shows most investors would do better letting a monkey pick their stocks",
      "BREAKING: Stock market now accepting Monopoly money as valid currency",
      "New investment strategy: Close your eyes and click randomly",
      "Scientists confirm: Money can't buy happiness, but losing it can buy sadness",
      "ALERT: Your portfolio is now being managed by three raccoons in a trenchcoat",
      "Market experts agree: The best time to sell was yesterday, the second best time is never",
      "New trading algorithm just flips a coin and hopes for the best",
      "BREAKING: Your financial advisor admits they've been using a Magic 8-Ball all along",
    ]

    const hedgeFundNews = [
      "Hedge fund manager buys fourth yacht while fund loses 80%",
      "Breaking: Your fund just invested in a company that sells invisible chairs",
      "Insider trading? No, we call it 'strategic information acquisition'",
      "Hedge fund conference concludes: 'We have no idea what we're doing either'",
      "New hedge fund strategy: Throw darts at stock listings while blindfolded",
      "Billionaire investor reveals secret: 'I just got really lucky once'",
      "BREAKING: Your hedge fund just lost $1 billion on a bet that cows would fly",
      "Hedge fund manager's 2-year-old daughter outperforms entire firm",
      "New hedge fund fee structure: 'We take 100%, you keep the losses'",
      "ALERT: Your hedge fund is now investing exclusively in companies with funny names",
      "Hedge fund strategy leaked: 'Just do the opposite of what we tell clients'",
      "BREAKING: Hedge fund manager can't explain what a stock is when asked",
      "New hedge fund launches with strategy: 'We just vibes'",
    ]

    const instantRegretNews = [
      "Stock you just sold up 5000% in after-hours trading",
      "Company you invested in announces surprise bankruptcy seconds after your purchase",
      "That penny stock you ignored last week just became a 1000-bagger",
      "Breaking: Your financial advisor was actually a cat in a tie",
      "Stock market rally begins exactly 5 minutes after you sell everything",
      "ALERT: The stock you just sold is now being acquired for 10x its current price",
      "Company you researched for weeks just announced they've been cooking the books",
      "BREAKING: Stock you almost bought is up 2000%, stock you actually bought is bankrupt",
      "Your limit order missed by $0.01, stock immediately rose 500%",
      "ALERT: The moment you bought, insiders started selling",
      "Stock you've been holding for years skyrockets the day after you sell",
      "BREAKING: Your stop loss triggered at the absolute bottom before a historic rally",
    ]

    const drugsNews = [
      "Market up 10000% because someone sneezed during a CNBC interview",
      "Stocks now priced in emojis instead of dollars",
      "Breaking: Gravity repealed, stocks only go up now (for 5 minutes)",
      "New economic indicator: The position of Jupiter relative to Mars",
      "Stock market now determined by which way a chicken walks on a keyboard",
      "Federal Reserve sets interest rates based on today's horoscope",
      "BREAKING: Stock prices now determined by number of rocket emojis on Reddit",
      "New market rule: Stocks can only be traded while standing on one foot",
      "ALERT: Market direction now determined by coin flip on live TV",
      "Stock exchange replaces opening bell with random air horn blasts throughout the day",
      "BREAKING: Stocks now move in opposite direction of all logical expectations",
      "New trading rule: You must dance the Macarena before each trade",
      "Market analysts now using tea leaves and crystal balls exclusively",
    ]

    const pumpAndDumpNews = [
      "BREAKING: Your penny stock is being pumped on Reddit by 12-year-olds!",
      "Famous influencer just mentioned your stock! Price up 5000%!",
      "WARNING: SEC investigating your stock for market manipulation",
      "Pump complete! Dump incoming in 3... 2... 1...",
      "Congratulations! You're now the only person still holding this stock!",
      "ALERT: The CEO of your penny stock just changed his Twitter name to 'Definitely Not A Scam'",
      "Your stock is trending! (Because everyone is laughing at it)",
      "BREAKING: The company you invested in doesn't actually exist",
      "Influencer who pumped your stock just deleted all social media accounts",
      "Stock promoter who recommended your stock just changed his name and moved to a non-extradition country",
      "ALERT: Your stock's entire business model is 'going up in price'",
      "Company executives just sold 100% of their shares. They said it's 'totally normal'",
    ]

    const cryptoNews = [
      "New crypto just launched: 'ScamCoin' promises 100000% returns",
      "Major exchange hacked! All funds gone! Anyway, here's a 10% off coupon",
      "Your NFT collection is now worth less than a screenshot of it",
      "Crypto founder disappears with $100M in investor funds, leaves only a 'lol' message",
      "New blockchain promises to solve problems that don't exist",
      "BREAKING: Your crypto wallet password was 'password123' and now you're broke",
      "New crypto trend: Coins that automatically go to zero after purchase",
      "ALERT: The blockchain your crypto is on just decided to start over from scratch",
      "Your crypto exchange just announced: 'Withdrawals temporarily disabled forever'",
      "New NFT collection: Pictures of people crying after losing money on NFTs",
      "BREAKING: Your crypto is now worth less than the electricity used to buy it",
      "Crypto founder reveals: 'I just made it up as I went along'",
      "ALERT: Your crypto wallet was hacked by a 12-year-old using a calculator",
    ]

    let newsPool

    switch (gameMode) {
      case "hedgeFund":
        newsPool = hedgeFundNews
        break
      case "instantRegret":
        newsPool = instantRegretNews
        break
      case "stockMarketOnDrugs":
        newsPool = drugsNews
        break
      case "pumpAndDump":
        newsPool = pumpAndDumpNews
        break
      case "cryptoNightmare":
        newsPool = cryptoNews
        break
      default:
        newsPool = normalNews
    }

    const randomNews = newsPool[Math.floor(Math.random() * newsPool.length)]
    setNews(randomNews)
  }

  if (!visible) return null

  return (
    <Alert className="bg-red-900/30 border-red-500 animate-pulse relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-yellow-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-red-500"></div>

      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 py-0.5 rounded-bl animate-pulse">
        LIVE
      </div>

      <AlertCircle className="h-5 w-5 text-red-500" />
      <AlertTitle className="text-[#5eff5e] text-lg font-bold flex items-center">
        🚨 BREAKING NEWS! 🚨
        <span className="ml-2 text-xs bg-red-900 text-red-300 px-1 rounded animate-pulse">URGENT</span>
      </AlertTitle>
      <AlertDescription className="text-white font-medium">{news}</AlertDescription>

      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-400">Source: Trust Me Bro Financial News</span>
        <span className="text-xs text-red-400 animate-pulse">BREAKING</span>
      </div>
    </Alert>
  )
}

