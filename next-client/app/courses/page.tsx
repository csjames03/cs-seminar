import React from 'react'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { Button } from '@/components/ui/button'
type ReturnType = {
    courses:[
        Course
    ],
    status: string
}
import CourseDeleteButton from '../components/CourseDeleteButton'
  
type Course = {
    course_id: number,
    course_name: string,
}
const CoursesPage = async () => {
        const response = await fetch('http://127.0.0.1:5000/courses', {cache: 'no-cache'})

        const returnType:ReturnType = await response.json()

        if(returnType.status != 'ok'){
            console.log('error')
            return
        }
        

        const courses: Course[] = returnType.courses

        console.log(courses)
        


       

    return (
        <main className='h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative'>
            <Link href="courses/add">
               <Button className="bg-green-400 hover:bg-green-500">
                Add Course
               </Button>
            </Link>
            <Table>
                <TableCaption>Courses</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-auto">ID</TableHead>
                    <TableHead className="w-auto">Name</TableHead>
                    <TableHead className="w-auto">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        courses?.map((course:Course) => {
                            return (
                                <TableRow key={course.course_id} className='cursor-pointer'>
                                    <TableCell className="font-medium">
                                        <Link href={`/courses/${course.course_id}/edit`}>
                                            {course.course_id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{course.course_name}</TableCell>
                                    <TableCell>
                                        <CourseDeleteButton id={course.course_id}/>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </main>
    )
}

export default CoursesPage