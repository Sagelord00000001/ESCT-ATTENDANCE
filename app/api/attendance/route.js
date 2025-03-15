import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET route to fetch attendance records
export async function GET(req) {
    try {
        // Parse query parameters
        const url = new URL(req.url);
        const grade = url.searchParams.get('grade');
        const month = url.searchParams.get('month');

        console.log("Request URL:", req.url);
        console.log("Grade:", grade);
        console.log("Month:", month);

        // Base query
        let query = db
            .select({
                name: STUDENTS.name,
                present: ATTENDANCE.present,
                day: ATTENDANCE.day,
                date: ATTENDANCE.date,
                grade: STUDENTS.grade,
                studentId: STUDENTS.id,
                attendanceId: ATTENDANCE.id,
            })
            .from(STUDENTS)
            .leftJoin(ATTENDANCE, eq(STUDENTS.id, ATTENDANCE.studentId));

        // Add filters only if grade or month is provided and valid
        if (grade && grade !== 'null') {
            query = query.where(eq(STUDENTS.grade, grade));
        }

        if (month && month !== 'null') {
            const [monthPart] = month.split('/'); // Extract the month part (e.g., '02' from '02/2025')
            query = query.where(sql`split_part(${ATTENDANCE.date}, '/', 1) = ${monthPart}`);
        }

        const result = await query;

        // Modify the `result` array directly
        const formattedResult = result.map((row) => ({
            ...row,
            present: row.present === 1, // Convert TINYINT to boolean
        }));

        console.log("Query result:", formattedResult);
        return NextResponse.json(formattedResult);
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}

// POST route to create a new attendance record
export async function POST(req) {
    try {
        const data = await req.json();

        // Validate input
        if (!data.studentId || !data.day || !data.date) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Insert new attendance record (do not include `id`)
        const result = await db.insert(ATTENDANCE).values({
            studentId: data.studentId,
            present: data.present ? 1 : 0, // Convert boolean to TINYINT
            day: data.day,
            date: data.date,
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error creating attendance record:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const studentId = searchParams.get('studentId');
        const date = searchParams.get('date');
        const day = searchParams.get('day');

        // Validate input
        if (!studentId || !date || !day) {
            return NextResponse.json(
                { error: "Missing required query parameters" },
                { status: 400 }
            );
        }

        // Validate date format (MM/YYYY)
        const datePattern = /^\d{2}\/\d{4}$/; // Matches "MM/YYYY"
        if (!datePattern.test(date)) {
            return NextResponse.json(
                { error: "Invalid date format. Expected 'MM/YYYY'." },
                { status: 400 }
            );
        }

        // Validate day (must be a number between 1 and 31)
        const dayInt = parseInt(day, 10);
        if (isNaN(dayInt) || dayInt < 1 || dayInt > 31) {
            return NextResponse.json(
                { error: "Invalid day. Expected a number between 1 and 31." },
                { status: 400 }
            );
        }

        // Convert date to YYYY-MM-DD format
        const [month, year] = date.split('/');
        const formattedDate = `${year}-${month}-01`; // Use the first day of the month

        // Log query parameters for debugging
        console.log("Query Parameters:", {
            studentId: parseInt(studentId, 10),
            day: dayInt,
            date: formattedDate,
        });

        // Delete the attendance record
        const result = await db
            .delete(ATTENDANCE)
            .where(
                and(
                    eq(ATTENDANCE.studentId, parseInt(studentId, 10)),
                    eq(ATTENDANCE.day, dayInt),
                    eq(ATTENDANCE.date, formattedDate)
                )
            );

        // Check if any rows were deleted
        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: "No matching record found to delete." },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Record deleted successfully" });
    } catch (error) {
        console.error("Error deleting attendance record:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}