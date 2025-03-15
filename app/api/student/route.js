import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/utils";

export async function POST(req,res) {
    const data = await req.json();

    const result = await db.insert(STUDENTS)
    .values({
        name:data?.name,
        grade:data?.grade,
        course:data?.course,
        matricNo: data?.matricNo
    })

    return NextResponse.json(result);
}

export async function  GET(req) {
    
    const result = await db.select().from(STUDENTS)

    return NextResponse.json(result)
}

export async function DELETE(req) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    const result = await db.delete(STUDENTS)
    .where(eq(STUDENTS.id, id))

    return NextResponse.json(result)
}