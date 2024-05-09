'use client'
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
import { useState } from 'react';
const AddCourseSchema = z.object({
    course_name: z.string().min(3).max(255),
})
const CourseAddPage = () => {

    const [loading, setLoading] = useState<boolean>(false) 

    const router = useRouter()

    const { toast } = useToast()

    const form = useForm<z.infer<typeof AddCourseSchema>>({
        resolver: zodResolver(AddCourseSchema),
        defaultValues: {
            course_name: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof AddCourseSchema>) => {
        setLoading(true)
        console.log(data)

        const response: any = await fetch('http://127.0.0.1:5000/course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if(!response.ok){
            toast({
                variant: "default",
                title: "Error",
                description: "An error occurred",
            })
            setLoading(false)
            return
        }
        setTimeout(() => {
            router.push('/courses')
        }, 1500)

        toast({
            variant: "default",
            title: "Success",
            description: "Course added successfully",
        })
        setLoading(false)

    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='px-10 h-[screen-26] md:h-[screen-20] w-screen pt-26  md:p-20 relative flex justify-center items-center gap-5 flex-col'>
            <div className="w-full md:w-2/6 flex gap-5 flex-col py-20 justify-center items-center">
                <h1 className="text-2xl font-bold text-emerald-600">Add Course</h1>
                <FormField
                    control={form.control}
                    name="course_name"
                    render={({ field }) => (
                        <FormItem className="w-full text-emerald-400">
                        <FormLabel htmlFor="course_name">Course Name</FormLabel>
                        <FormControl>
                            <Input
                            {...field}
                            type="text"
                            name="course_name"
                            placeholder="BS in Computer Science"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <Button type="submit" className="w-full bg-emerald-400 hover:bg-emerald-500" disabled={loading}>Add Course</Button>
            </div>
        </form>
    </Form>
  )
}

export default CourseAddPage