'use client'
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Course = {
  course_id: number;
  course_name: string;
};

const editStudentSchema = z.object({
  student_id: z.number(),
  student_name: z.string().min(3).max(255),
  course_id: z.coerce.number(),
});

const EditStudentForm = ({ student_id, student_name, course_name, course_id, courses }: { student_id: number, student_name: string, course_name: string, course_id:number, courses: Course[] }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  console.log('Courses:', courses)

  const form = useForm({
    resolver: zodResolver(editStudentSchema),
    defaultValues: {
        student_id,
      student_name,
      course_id
    },
  });

  const onSubmit = async (data: z.infer<typeof editStudentSchema>&{student_id:number}):Promise<void> => {
    setLoading(true);
    console.log('Submitting:', data)

    const response = await fetch(`http://127.0.0.1:5000/student/${student_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student: data.student_name,
        course_id: data.course_id
      }),
    });

    if (!response.ok) {
      toast({
        variant: "default",
        title: "Error",
        description: "An error occurred",
      });
      setLoading(false);
      return;
    }

    toast({
      variant: "default",
      title: "Success",
      description: "Course Edited successfully",
    });
    
    setTimeout(() => {
        router.push('/students');
        }, 1500);
    setLoading(false);
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='px-10 h-[screen-26] md:h-[screen-20] w-screen pt-26 md:p-20 relative flex justify-center items-center gap-5 flex-col'>
            <div className="w-full md:w-2/6 flex gap-5 flex-col py-20 justify-center items-center">
                <h1 className="text-2xl font-bold text-emerald-600">Edit Course</h1>
                <FormField
                    control={form.control}
                    name="student_name"
                    render={({ field }) => (
                        <FormItem className="w-full text-emerald-400">
                            <FormLabel htmlFor="student_name">Student Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="course_id"
                    render={({ field }) => (
                        <FormItem className="w-full text-emerald-400">
                            <FormLabel htmlFor="course_id">Course Name</FormLabel>
                            <FormControl>
                                <Select
                                    {...field}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Course"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course: any) => (
                                            <SelectItem key={course.course_id} value={course.course_id}>
                                                {course.course_name}-{course.course_id}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full bg-emerald-400 hover:bg-emerald-500" disabled={loading}>Edit Course</Button>
            </div>
            </form>
    </Form>
  );
};

export default EditStudentForm;
