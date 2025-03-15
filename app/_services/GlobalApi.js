const { default: axios } = require("axios");

const GetAllGrades = () => axios.get('/api/grade');
const CreateNewStudent = (data) => axios.post('/api/student', data);
const GetAllStudent = () => axios.get('/api/student');
const DeleteStudentRecord = (id) => axios.delete('/api/student?id=' + id);
const GetAttendanceList = (grade, month) => axios.get('/api/attendance?grade=' + grade + "&month=" + month);
const MarkAttendance = (data) => axios.post('/api/attendance', data);

// Fixed MarkAbsent method
const MarkAbsent = (studentId, day, date) => axios.delete('/api/attendance', {
    params: {
        studentId, // e.g., 3
        day,      // e.g., 1 (day of the month)
        date,     // e.g., "03/2025" (MM/YYYY format)
    },
});

const TotalPresntCountByDate = (date, grade) => axios.get('/api/dashboard?date=' + date + '&grade=' + grade);

export default {
    CreateNewStudent,
    GetAllGrades,
    GetAllStudent,
    DeleteStudentRecord,
    GetAttendanceList,
    MarkAttendance,
    MarkAbsent,
    TotalPresntCountByDate,
};