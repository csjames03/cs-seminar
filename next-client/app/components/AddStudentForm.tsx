'use client'
import type { Course } from '../students/add/page'
import React from 'react'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const addStudentSchema = z.object({
    student: z.string().min(3).max(255),
    course_id: z.coerce.number(),
})

const AddStudentForm = ({courses}: {courses:Course[]}) => {

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof addStudentSchema>>({
        resolver: zodResolver(addStudentSchema),
        defaultValues: {
            student:  '',
            course_id: courses[0].course_id,
        },
    })

    
    const onSubmit = async (data: z.infer<typeof addStudentSchema>) => {
        const response: any = await fetch('http://127.0.0.1:5000/student',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res:any = await response.json()

        if(res.status != 'ok'){
            toast({
                variant: "default",
                title: "Error",
                description: "An error occurred",
            })
            return
        }

        toast({
            variant: "default",
            title: "Success",
            description: "Student added successfully",
        })

        router.push('/students')



    }


  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full md:w-2/6 flex gap-5 flex-col py-20 justify-center items-center">
                <h1 className="text-2xl font-bold text-emerald-600">Add Student</h1>
                    <FormField
                        control={form.control}
                        name="student"
                        render={({ field }) => (
                            <FormItem className="w-full text-emerald-400">
                            <FormLabel htmlFor="student">Student Name</FormLabel>
                            <FormControl>
                                <Input
                                {...field}
                                type="text"
                                name="student"
                                placeholder="Zeus Morley Penida"
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="course_id"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Course</FormLabel>
                                <FormControl>
                                    <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Course Name"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                    {courses.map((course) => (
                                            <SelectItem key={course.course_id} value={course.course_id}>
                                                {course.course_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                <Button type="submit" className="bg-green-400 hover:bg-green-500">Add Student</Button>
            </div>
        </form>
    </Form>
  )
}

export default AddStudentForm