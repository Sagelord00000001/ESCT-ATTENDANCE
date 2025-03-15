'use client'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Calendar1Icon } from 'lucide-react'
import {addMonths} from 'date-fns'
import moment from 'moment/moment'
import { Calendar } from "@/components/ui/calendar"



function MonthSelection({selectMonth}) {
    const today = Date()
    const nextMonths = addMonths(new Date(),0);

    const [month, setMonth] = useState(nextMonths)

    return (
        <div>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='flex gap-2 items-center'>
                            <Calendar1Icon className='h-5 w-5'/>{moment(month).format('MMM YYYY')}</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            mode="single"
                            month={month}
                            onMonthChange={(value)=>{selectMonth(value);setMonth(value)}}
                            className="rounded-md border flex flex-1 justify-center"
                        />
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}

export default MonthSelection