import AddStudentForm from "@/app/components/AddStudentForm"

type ReturnType = {
    courses:[
        Course
    ],
    status: string
}
export type Course = {
    course_id: number,
    course_name: string,
}

const StudentAddPage = async() => {

    const response = await fetch('http://127.0.0.1:5000/courses', {cache: 'no-cache'})

        const returnType:ReturnType = await response.json()

        if(returnType.status != 'ok'){
            console.log('error')
            return
        }
        

        const courses: Course[] = returnType.courses

  return (
    <div className='h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative'>
        <h1>Add Student</h1>
        <AddStudentForm {...returnType}/>
    </div>
  )
}

export default StudentAddPage