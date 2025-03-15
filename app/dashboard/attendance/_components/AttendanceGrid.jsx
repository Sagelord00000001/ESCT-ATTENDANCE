import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/services';
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = [8];
const paginationPageSizeSelector = [25, 50, 100]

function AttendanceGrid({ attendanceList, selectedMonth }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: 'studentId', headerName: 'Student ID',filter:true },
        { field: 'name',filter:true, headerName: 'Name' },
    ]);

    const daysInMonth = (year, month) => {
        const monthNumber = parseInt(month, 10) - 1; // Convert month to 0-based index
        return new Date(year, monthNumber + 1, 0).getDate();
    };

    const numberOfDays = daysInMonth(
        moment(selectedMonth).format('YYYY'), // Year (e.g., "2024")
        moment(selectedMonth).format('MM')    // Month (e.g., "02")
    );

    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    useEffect(() => {
        if (attendanceList) {
            const userList = getUniqueRecord(attendanceList);

            // Initialize attendance data for each student
            const updatedRowData = userList.map(student => {
                const attendanceData = {};
                daysArray.forEach(date => {
                    attendanceData[date.toString()] = ispresent(student.studentId,date); // Default attendance value
                });
                return { ...student, ...attendanceData };
            });

            setRowData(updatedRowData);

            // Generate column definitions for each day in the month
            const dateColumns = daysArray.map(date => ({
                field: date.toString(),
                headerName: date.toString(),
                width: 50,
                editable: true, // Allow editing attendance data
            }));

            // Update column definitions
            setColDefs([
                { field: 'studentId', headerName: 'Student ID' },
                { field: 'name', headerName: 'Name' },
                ...dateColumns,
            ]);
        }
    }, [attendanceList, selectedMonth]);

    /**
     * used to check if user is present or not
     * @param {*} studentId 
     * @param {*} day 
     * @returns 
     */

    const ispresent = (studentId,day)=>{
        const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false;
    }



    /**
     * used to mark student attendance
     * @param {*} day 
     * @param {*} studentId 
     * @param {*} presentStatus 
     */
    
    const onMarkAttendance = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format('MM/YYYY'); // Format date as MM/YYYY

    if (presentStatus) {
        // Mark as present
        const data = {
            day: day,
            studentId: studentId,
            present: presentStatus,
            date: date, // Pass date in MM/YYYY format
        };
        GlobalApi.MarkAttendance(data).then((resp) => {
            console.log(resp);
            toast(`Student ID ${studentId} Marked as present`);
        });
    } else {
        // Mark as absent
        GlobalApi.MarkAbsent(studentId, day, date)
            .then((res) => {
                toast(`Student ID ${studentId} Marked as Absent`);
            })
            .catch((error) => {
                console.error("Error marking absent:", error);
                toast.error("Failed to mark student as absent");
            });
    }
}


    return (
        <div>
            <div style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector = {paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default AttendanceGrid;