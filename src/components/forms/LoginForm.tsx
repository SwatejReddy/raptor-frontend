"use client"

import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios";
import { BASE_URL } from "@/config"
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
import { useEffect, useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"

// Define form schema using Zod
const formSchema = z.object({
    username: z.string().min(4, { message: "Username must be at least 4 characters" }).max(50),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})


export const LoginForm = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/login");
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            username: "",
            password: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, values);
            if (res.status === 200) {
                localStorage.setItem("token", res.data);
                navigate("/home");
            } else if (res.status === 401) {
                alert("Invalid credentials");
                form.reset();
            }
        } catch (error) {
            alert("An error occurred. Please try again");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} autoComplete="off" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    loading ?
                        (
                            <Button disabled={loading} className="w-full flex items-center ">
                                <ReloadIcon className="mr-2 h-4 animate-spin" />
                                Please wait
                            </Button>
                        ) :
                        (
                            <Button className="w-full" type="submit">Login</Button>
                        )
                }

            </form>
        </Form>
    )
}