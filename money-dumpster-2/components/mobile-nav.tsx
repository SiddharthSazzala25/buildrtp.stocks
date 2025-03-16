import { Home, BarChart3, LineChart, PieChart, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  activeTab: string
}

export function MobileNav({ activeTab }: MobileNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-2 flex justify-around items-center">
      <Button
        variant="ghost"
        size="icon"
        className={`rounded-full ${activeTab === "home" ? "text-green-500" : "text-gray-500"}`}
      >
        <Home className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
        <BarChart3 className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
        <LineChart className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
        <PieChart className="h-6 w-6" />
      </Button>

      <Button variant="ghost" size="icon" className="rounded-full text-gray-500">
        <User className="h-6 w-6" />
      </Button>
    </div>
  )
}

