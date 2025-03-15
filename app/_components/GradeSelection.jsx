'use client'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_services/GlobalApi'


function GradeSelection({selectedGrade}) {

        const [grade,setGrades]= useState([]);

          useEffect(()=>{
            GetAllGradesList()
          },[])
    
          const GetAllGradesList=()=>{
            GlobalApi.GetAllGrades().then(resp=>{
                setGrades(resp.data)
            })
          }
  return (
    <div>
          <select name="grade" className='p-2 border rounded-lg'
          onChange={(e) => selectedGrade(e.target.value)}
          >
              {grade.map((item, index) => (
                  <option key={index} value={item.grades}>{item.grades}</option>
              ))}
          </select>
    </div>
  )
}

export default GradeSelection