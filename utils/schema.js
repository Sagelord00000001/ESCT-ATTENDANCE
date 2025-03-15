import { pgTable, serial, varchar, integer, smallint } from "drizzle-orm/pg-core";  // Use smallint instead of tinyint

export const GRADE = pgTable('grades', {
    id: serial('id').primaryKey(),
    grades: varchar('grades', { length: 10 }).notNull(),
});

export const STUDENTS = pgTable('students', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 20 }).notNull(),
    grade: varchar('grade', { length: 10 }).notNull(),
    course: varchar('course', { length: 30 }).notNull(),
    matricNo: varchar('matricNo', { length: 20 }).notNull(),
});

export const ATTENDANCE = pgTable('attendance', {
    id: serial('id').primaryKey(),
    studentId: integer('studentId').notNull(),
    present: smallint('present').default(0),  // 0 for false, 1 for true (use smallint for tinyint)
    day: integer('day').notNull(),
    date: varchar('date', { length: 20 }).notNull(),
});
