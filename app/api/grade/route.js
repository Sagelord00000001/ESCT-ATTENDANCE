import { GRADE } from "@/utils/schema";
import { NextResponse } from "next/server";
import { db } from "@/utils";



export async function  GET(req){
    const result = await db.select().from(GRADE)
   return NextResponse.json(result)
}