import { getUniqueRecord } from '@/app/_services/services'
import React, { useEffect, useState } from 'react'
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react'
import Card from './Card'

function Status({ attendanceList }) {
  const [totalStudent, setTotalStudent] = useState(0) 
  const [presentCount, setPresentCount] = useState(0)
  const [presentPercentage, setPresentPercentage] = useState(0)

  useEffect(() => {
    if (attendanceList && Array.isArray(attendanceList)) {
      console.log('Attendance List:', attendanceList) 

      // Get unique students from attendance list
      const totalSt = getUniqueRecord(attendanceList) 
      setTotalStudent(totalSt.length)

      // ✅ Fix: Get unique students who were marked present at least once
      const uniquePresentStudents = [...new Set(
        attendanceList.filter(record => record.present === true).map(record => record.name)
      )]

      setPresentCount(uniquePresentStudents.length)
      console.log('Present Count (Unique Students):', uniquePresentStudents.length)

      // ✅ Fix: Correct percentage calculation
      if (totalSt.length > 0) {
        const percentage = (uniquePresentStudents.length / totalSt.length) * 100
        setPresentPercentage(percentage)
        console.log('Present Percentage:', percentage)
      } else {
        console.log('No students found!')
        setPresentPercentage(0)
      }
    }
  }, [attendanceList])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
      <Card icon={<GraduationCap />} title={'Total Students'} value={totalStudent} />
      <Card icon={<TrendingUp />} title={'Total Present'} value={presentPercentage.toFixed(1) + '%'}  />
      <Card icon={<TrendingDown />} title={'Total Absent'} value={(100 - presentPercentage).toFixed(1) + '%'} />
    </div>
  )
}

export default Status
