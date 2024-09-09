"use client"

import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios";
import { VITE_BASE_URL } from "@/config"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

// Define form schema using Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Please confirm your password" }),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"], // This points to the confirmPassword field
        });
    }
});


export const SignupForm = () => {
    // to naviagte to another page
    const navigate = useNavigate();

    // keep track of loading state
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange", // Validate on change and blur
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    // Handle form submission
    async function onSubmit(values: z.infer<typeof formSchema>) {
        //set loading animation
        setLoading(true);
        try {
            // make an api call and submit the form
            console.log("VITE_BASE_URL:", VITE_BASE_URL)
            const res = await axios.post(`${VITE_BASE_URL}/auth/signup`, values)
            console.log(res.data)
            if (res.status === 200) {
                alert("Account created successfully!");
                navigate("/login")
            }
            else {
                alert("An error occurred. Please try again.");
                navigate("/signup")
            }
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name field */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Username field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Username" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {loading ? (<Button disabled={loading} className="w-full flex items-center ">
                    <ReloadIcon className="mr-2 h-4 animate-spin" />
                    Please wait
                </Button>) : (<Button className="w-full" type="submit">Sign up</Button>)}
                {/* <Button onClick={() => { setLoading(c => !c) }} className="w-full" type="submit">Sign up</Button>
                <Button disabled={loading} className="w-full flex items-center ">
                    <ReloadIcon className="mr-2 h-4 animate-spin" />
                    Please wait
                </Button> */}

            </form>
        </Form>
    )
}
