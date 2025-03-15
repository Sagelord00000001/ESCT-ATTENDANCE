'use client'
import { getUniqueRecord } from '@/app/_services/services'
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartComponent({ attendanceList, TotalPresntData }) {
  const [data, setData] = useState([])
  const [isClient, setIsClient] = useState(false) // Track client-side rendering

  useEffect(() => {
    setIsClient(true) // Set to true on client side
  }, [])

  useEffect(() => {
    if (attendanceList && TotalPresntData) {
      formatAttendanceListCount()
    }
  }, [attendanceList, TotalPresntData])

  const formatAttendanceListCount = () => {
    const totalStudent = getUniqueRecord(attendanceList)

    const result = TotalPresntData.map((item) => ({
      day: item.day,
      presentCount: item.presentCount,
      absentCount: Number(totalStudent?.length) - Number(item.presentCount),
    }))
    console.log(result)
    setData(result)
  }

  // Render nothing on the server
  if (!isClient) {
    return null
  }

  return (
    <div className='p-5 border rounded-lg shadow-sm'>
      <h2 className='my-2 font-bold text-lg'>Attendance</h2>
      <ResponsiveContainer width={'100%'} height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="absentCount" name= 'Total Present' fill="#8884d8" />
        <Bar dataKey="presentCount" name= 'Total Absent' fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartComponent