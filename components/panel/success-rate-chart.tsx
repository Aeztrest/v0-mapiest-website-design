"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface SuccessRateChartProps {
  data?: {
    mail: Array<{ date: string; count: number }>
    whatsapp: Array<{ date: string; count: number }>
  }
}

const getTurkishDayName = (dateString: string) => {
  const date = new Date(dateString)
  const days = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
  return days[date.getDay()]
}

export function SuccessRateChart({ data }: SuccessRateChartProps) {
  const chartData = data
    ? data.mail.map((mailItem, index) => ({
        day: getTurkishDayName(mailItem.date),
        mail: mailItem.count,
        whatsapp: data.whatsapp[index]?.count || 0,
      }))
    : []

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="day" className="text-xs" />
        <YAxis className="text-xs" />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="mail" stroke="#2563eb" strokeWidth={2} name="Mail" />
        <Line type="monotone" dataKey="whatsapp" stroke="#60a5fa" strokeWidth={2} name="WhatsApp" />
      </LineChart>
    </ResponsiveContainer>
  )
}
