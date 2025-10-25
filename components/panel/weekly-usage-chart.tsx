"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface WeeklyUsageChartProps {
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

export function WeeklyUsageChart({ data }: WeeklyUsageChartProps) {
  const chartData = data
    ? data.mail.map((mailItem, index) => ({
        day: getTurkishDayName(mailItem.date),
        mail: mailItem.count,
        whatsapp: data.whatsapp[index]?.count || 0,
      }))
    : []

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
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
        <Bar dataKey="mail" fill="#2563eb" radius={[8, 8, 0, 0]} name="Mail" />
        <Bar dataKey="whatsapp" fill="#60a5fa" radius={[8, 8, 0, 0]} name="WhatsApp" />
      </BarChart>
    </ResponsiveContainer>
  )
}
