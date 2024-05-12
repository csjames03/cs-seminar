
import EditCourseForm from "@/app/components/EditCourse"

type ReturnType = {
    message:{
        course_id: number,
        course_name: string,
    },
    status: string
}

const CoursesEditPage = async ({params}: any) => {
    const {id} = params

    const response = await fetch(`http://127.0.0.1:5000/course/${id}`, {cache: 'no-cache'})

    const returnType:ReturnType = await response.json()

    if(returnType.status != 'ok'){
        return(
            <div className="h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative flex justify-center items-center">
                <h1 className="text-4xl text-red-600 mt-20">There is an error while fetching the course with an id: {id}</h1>
            </div>
        )
    }

    console.log(returnType.message == null)
    
    if(returnType.message == null){
        return(
        <div className="h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative flex justify-center items-center">
            <h1 className="text-4xl text-red-600 mt-20">Cannot fetch the course with an id: {id}</h1>
        </div>
        )
    }

    return (
        <div className="h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative">
            {
                returnType.message && (
                    <div>
                        <EditCourseForm {...returnType.message}/>
                    </div>
                )
            }
        </div>
    )
}

export default CoursesEditPage