"use client"
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'

const SAFFRON = '#E8A838'
const TERRACOTTA = '#C4613A'
const WHEAT = '#4A6741'
const CREAM_DARK = '#D4B896'

const genderData = [
  { name: 'Males (53.8%)', value: 6325 },
  { name: 'Females (46.2%)', value: 5441 },
]

const literacyData = [
  { name: 'Overall', rate: 73.37 },
  { name: 'Male', rate: 85.07 },
  { name: 'Female', rate: 59.80 },
]

const compositionData = [
  { name: 'General', value: 10057 },
  { name: 'SC', value: 1709 },
]

const ageData = [
  { name: 'Adults (87.81%)', value: 10332 },
  { name: 'Children 0–6 (12.19%)', value: 1434 },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const numFmt = (v: any) => [Number(v).toLocaleString('en-IN'), 'Population'] as [string, string]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pctFmt = (v: any) => [`${v}%`, 'Literacy Rate'] as [string, string]
const tooltipStyle = { borderRadius: 8, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }

export function GenderDonut() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={genderData} cx="50%" cy="50%" innerRadius={72} outerRadius={110} paddingAngle={3} dataKey="value">
          <Cell fill={SAFFRON} />
          <Cell fill={TERRACOTTA} />
        </Pie>
        <Tooltip formatter={numFmt} contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function LiteracyBar() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={literacyData} barSize={40}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(28,28,30,0.06)" />
        <XAxis dataKey="name" tick={{ fontSize: 13 }} />
        <YAxis domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 12 }} />
        <Tooltip formatter={pctFmt} contentStyle={tooltipStyle} />
        <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
          <Cell fill={WHEAT} />
          <Cell fill={SAFFRON} />
          <Cell fill={TERRACOTTA} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function CompositionBar() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={compositionData} barSize={64}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(28,28,30,0.06)" />
        <XAxis dataKey="name" tick={{ fontSize: 13 }} />
        <YAxis tickFormatter={v => Number(v).toLocaleString('en-IN')} tick={{ fontSize: 12 }} />
        <Tooltip formatter={numFmt} contentStyle={tooltipStyle} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          <Cell fill={SAFFRON} />
          <Cell fill={CREAM_DARK} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function AgeDonut() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={ageData} cx="50%" cy="50%" innerRadius={72} outerRadius={110} paddingAngle={3} dataKey="value">
          <Cell fill={WHEAT} />
          <Cell fill={SAFFRON} />
        </Pie>
        <Tooltip formatter={numFmt} contentStyle={tooltipStyle} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
