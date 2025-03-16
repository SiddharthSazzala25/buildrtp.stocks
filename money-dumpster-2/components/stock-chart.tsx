"use client"

import { useEffect, useRef } from "react"

interface StockChartProps {
  positive: boolean
}

export function StockChart({ positive }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Generate chart data
    const points = 50
    const data = Array.from({ length: points }, (_, i) => {
      const randomFactor = Math.random() * 0.4 - 0.2
      const trend = positive ? i / points + randomFactor : 1 - i / points + randomFactor
      return Math.max(0.1, Math.min(0.9, trend))
    })

    // Draw chart
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight
    const stepX = width / (points - 1)

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height * (1 - data[0]))

    for (let i = 1; i < points; i++) {
      ctx.lineTo(i * stepX, height * (1 - data[i]))
    }

    ctx.strokeStyle = positive ? "#22c55e" : "#ef4444"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    if (positive) {
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)")
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)")
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0)")
    }

    ctx.fillStyle = gradient
    ctx.fill()
  }, [positive])

  return (
    <div className="w-full h-40">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

