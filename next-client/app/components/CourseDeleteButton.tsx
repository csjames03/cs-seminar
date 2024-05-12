'use client'
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from 'next/navigation';

const CourseDeleteButton = ({id}:{id:number}) => {

    const { toast } = useToast()
    const router = useRouter()

    const DeleteCourse = async () => {
        const response = await fetch(`http://127.0.0.1:5000/course/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })

        const deletedCourse = await response.json()
        if(deletedCourse.status != 'ok'){
            toast({
                variant: "default",
                title: "Error",
                description: "There was an error deleting the course with an id: " + id,
            })
        } else {
            toast({
                variant: "default",
                title: "Success",
                description: "Course deleted successfully",
            })
        }

        setTimeout(() => {
            router.refresh()
        }, 500)
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger className='bg-red-500 hover:bg-red-400 cursor-pointer px-4 py-2 rounded-sm'>
                     Delete
                </PopoverTrigger>
                <PopoverContent>
                    <div className='w-auto h-auto flex flex-col gap-2 p-2'>
                        <p>Are you sure you want to delete this course with an id of {id}?</p>
                        <div onClick={DeleteCourse} className='bg-red-500 hover:bg-red-400 cursor-pointer px-4 py-2 rounded-sm flex justify-center items-center'>
                            Yes
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CourseDeleteButton
