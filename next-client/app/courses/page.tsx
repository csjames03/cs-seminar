import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
type ReturnType = {
    courses:[
        Course
    ],
    status: string
}
  
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
                    <TableHead className="w-auto">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        courses?.map((course:Course) => {
                            return (
                                <TableRow key={course.course_id} className='cursor-pointer'>
                                    <TableCell className="font-medium">{course.course_id}</TableCell>
                                    <TableCell>{course.course_name}</TableCell>
                                    <TableCell className="text-right">Edit</TableCell>
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