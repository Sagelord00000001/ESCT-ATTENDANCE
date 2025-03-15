'use client';
import GradeSelection from '@/app/_components/GradeSelection';
import MonthSelection from '@/app/_components/MonthSelection';
import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button';
import moment from 'moment';
import React, { useState } from 'react';
import AttendanceGrid from './_components/AttendanceGrid';

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();

  const onSearchHandler = () => {
    console.log("Selected Month:", selectedMonth);
    console.log("Selected Grade:", selectedGrade);

    const month = selectedMonth ? moment(selectedMonth).format('MM/YYYY') : null;
    const grade = selectedGrade || null;

    console.log("Formatted Month:", month);
    console.log("Selected Grade:", grade);

    GlobalApi.GetAttendanceList(grade, month)
      .then(resp => {
        setAttendanceList(resp.data); // Update the attendance list
      })
      .catch(error => {
        console.error("Error fetching attendance data:", error);
      });
  };

  const onMarkAbsentHandler = (studentId, date, day) => {
    console.log("Marking student as absent:", studentId, "on date:", date, "day:", day);

    GlobalApi.MarkAbsent(studentId, date, day)
      .then(() => {
        console.log("Student marked as absent successfully");

        // Refresh the attendance list after marking as absent
        const month = selectedMonth ? moment(selectedMonth).format('MM/YYYY') : null;
        const grade = selectedGrade || null;

        GlobalApi.GetAttendanceList(grade, month)
          .then(resp => {
            setAttendanceList(resp.data); // Update the attendance list
          })
          .catch(error => {
            console.error("Error refreshing attendance data:", error);
          });
      })
      .catch(error => {
        console.error("Error marking student as absent:", error);
      });
  };

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      {/* Search options */}
      <div className='flex gap-4 p-3 border rounded-lg my-2'>
        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className='flex gap-2 items-center'>
          <label>Select Level:</label>
          <GradeSelection selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>

      {/**Student Attendance Grid */}
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
        onMarkAbsent={onMarkAbsentHandler} // Pass the handler
      />
    </div>
  );
}

export default Attendance;