'use client'  
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { LoaderIcon } from 'lucide-react';


function AddNewStudent({refreshData}) {
    const [open, setOpen] = useState(false);
    const [grade,setGrades]= useState([]);
    const [loading,setloading]= useState(false,[]);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()

      useEffect(()=>{
        GetAllGradesList()
      },[])

      const GetAllGradesList=()=>{
        GlobalApi.GetAllGrades().then(resp=>{
            setGrades(resp.data)
        })
      }

      const onSubmit =(data)=> {
        setloading(true);
        GlobalApi.CreateNewStudent(data).then(resp=>{
            console.log('--',resp);
            if(resp.data){
                reset();
                refreshData()
                setOpen(false);
                toast('New Student has been Added !')
            }
            setloading(false)
        })
      };
    return (
        <div>
            <Button onClick={() => setOpen(true)}>Add New Student</Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new student</DialogTitle>
                        <DialogDescription>
                            Fill in the student's details below:
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='py-2'>
                            <label>Full Name</label>
                            <Input placeholder='Sage lord'
                            {...register("name", {required:true})}
                            />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Select Level</label>
                            <select name="grade" className='p-3 border rounded-lg'
                            {...register("grade", {required:true})}
                            >
                                {grade.map((item,index)=>(
                                <option key={index} value={item.grades}>{item.grades}</option>
                                ))}
                            </select>
                        </div>
                        <div className='py-2'>
                            <label>Course</label>
                            <Input placeholder='Computer Science'
                            {...register("course", {required:true})}
                            />
                        </div>
                        <div className='py-2'>
                            <label>Matric No</label>
                            <Input placeholder='ESCT/CSC/21/0015/25'
                            {...register("matricNo", {required:true})}
                            />
                        </div>
                        <div className='flex gap-3 justify-end items-center'>
                            <Button type='button' onClick={()=> setOpen(false)} variant='ghost'>Cancel</Button>
                            <Button type='submit'
                            disabled={loading}>
                            {loading? <LoaderIcon className='animate-spin'/>:
                            'Save'}</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewStudent;
