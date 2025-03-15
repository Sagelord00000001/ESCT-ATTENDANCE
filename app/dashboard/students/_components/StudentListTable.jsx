'use client'
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
  


// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = [8];
const paginationPageSizeSelector = [25, 50, 100]
function StudentListTable({studentList, refreshData}) {

    const CustomButtons=(props)=>{
        return(
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant='destructive'><Trash/></Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your record
                        and remove your data from our records.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        )}
        const DeleteRecord = (id)=>{
            GlobalApi.DeleteStudentRecord(id).then(resp=>{
                if(resp){
                    toast('Record deleted succesfully')
                    refreshData()
                }
            })
        }

    const [colDefs, setColDefs] = useState([
        {field:"id", filter:true, flex:1},
        {field:"name", filter:true,flex:2},
        {field:"grade", filter:true,flex:1},
        {field:"course", filter:true,flex:2},
        {field:"matricNo", filter:true,flex:2},
        {field:"action", cellRenderer:CustomButtons,flex:1}
        
    ]);
    const [searchInput, setSearchInput] = useState('');
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
        studentList&&setRowData(studentList)
},[studentList])

    const totalStudent = rowData.length
  return (
    <div className='py-2'>
    <div style={{ height: 400}}>
        <div>
            <h2 className='text-lg' > Total Number of Students: {totalStudent}</h2>
        </div>
        <div className='rounded-lg border flex shadow-sm mb-4 max-w-sm p-2 gap-2 '>
            <Search/>
            <input type='text' placeholder='Search' className='outline-none w-full'
            onChange={(event)=>setSearchInput(event.target.value || '')}
            />
        </div>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={pagination}
            quickFilterText={searchInput}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector = {paginationPageSizeSelector}
        />
    </div>
    </div>
  )
}

export default StudentListTable