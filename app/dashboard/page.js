"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import GradeSelection from '../_components/GradeSelection'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import Status from './_components/Status'
import BarChartComponent from './_components/BarChartComponent'

function Dashboard() {
  const { setTheme } = useTheme()
  const [selectMonth, setSelectMonth] = useState(moment().startOf('month').toDate()) // Default to current month
  const [selectedGrade, setSelectedGrade] = useState('') // Default to empty or a specific grade
  const [attendanceList, setAttendanceList] = useState()
  const [TotalPresntData, setTotalPresntData] = useState([])
  useEffect(() => {
    if (selectMonth && selectedGrade) {
      GetTotalPresntCountByDate()
      getStudentAttendance()
    }
  }, [selectMonth, selectedGrade]) // Correct dependency array

  /**
   * Used to get student attendance for a given date and month
   */
  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedGrade, moment(selectMonth).format('MM/yyyy'))
      .then(resp => {
        setAttendanceList(resp.data)
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error)
      })
  }
  const GetTotalPresntCountByDate = ()=>{
    GlobalApi.TotalPresntCountByDate(moment(selectMonth).format('MM/yyyy'),selectedGrade)
    .then(resp=>{
      setTotalPresntData(resp.data)
    })
  }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className='flex items-center gap-4'>
          <MonthSelection selectMonth={setSelectMonth} />
          <GradeSelection selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <Status attendanceList={attendanceList}/>
      <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3'>
        <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList}
          TotalPresntData={TotalPresntData}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard