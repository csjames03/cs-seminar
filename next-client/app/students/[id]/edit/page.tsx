import React from 'react'
import EditStudentForm from '@/app/components/EditStudentForm'
const StudentEditPage = async ({params}: {params: any}) => {

    const id = params.id

    //Fetching Specific Student Data
    const fetchStudent = await fetch(`http://127.0.0.1:5000/student/${id}`,{ cache: 'no-cache' })
    const studentData: any = await fetchStudent.json()

    const fetchCourses:any = await fetch(`http://127.0.0.1:5000/courses`, {cache: 'no-cache'})
    const coursesData:any = await fetchCourses.json()

    const courses = coursesData.courses



    if (studentData.message == null) {
        return(
            <div className='h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative flex justify-center items-center'>
                <p className='mt-20 text-2xl text-red-500 font-bold'>
                    Student with an id of {id} not found
                </p>
            </div>
        )
    }

    const data ={
        student_id: studentData.message.student_id,
        student_name: studentData.message.student_name,
        course_name: studentData.message.course_name,
        courses: courses,
        course_id: studentData.message.course_id
    }
  return (
    <div className='h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative flex justify-center items-center'>
        <h1>
            {
                studentData.message && (
                    <div>
                        <EditStudentForm {...data}/>
                    </div>
                )
            }
        </h1>
    </div>
  )
}

export default StudentEditPage