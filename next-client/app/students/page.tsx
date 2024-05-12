import React from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Button } from '@/components/ui/button';

type ReturnType = {
    Message: Student[],
    status: string
};

type Student = {
    student_id: number,
    student_name: string,
    course_name: string,
    course_id: number
};

import DeleteStudentButton from '../components/StudentDeleteButton';

const StudentsPage = async () => {
    const response = await fetch('http://127.0.0.1:5000/students', { cache: 'no-cache' });

    const returnType: ReturnType = await response.json();

    if (returnType.status != 'ok') {
        console.log('error');
        return;
    }

    const students: Student[] = returnType.Message;
    console.log('Students',students);

    return (
        <main className='h-[screen-26] md:h-[screen-20] w-screen pt-26 md:p-20 relative'>
            <Link href="students/add">
                <Button className="bg-green-400 hover:bg-green-500">
                    Add Student
                </Button>
            </Link>
            <Table>
                <TableCaption>Students</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-auto">ID</TableHead>
                        <TableHead className="w-auto">Name</TableHead>
                        <TableHead className="w-auto">Course</TableHead>
                        <TableHead className="w-auto">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students?.map((student: Student) => (
                        <TableRow key={student.student_id} className='cursor-pointer'>
                            <TableCell className="font-medium">
                                <Link href={`/students/${student.student_id}/edit`}>
                                    {student.student_id}
                                </Link>
                            </TableCell>
                            <TableCell>{student.student_name}</TableCell>
                            <TableCell>{student.course_name}</TableCell>
                            <TableCell> 
                                <DeleteStudentButton id={student.student_id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </main>
    );
};

export default StudentsPage;
