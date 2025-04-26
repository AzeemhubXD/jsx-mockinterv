"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import FormField from "@/components/FormField"
import Link from "next/link";
import { toast } from "sonner";
import { Form } from "./ui/form"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase/client"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth"
import { signUp, signIn } from "@/lib/actions/auth.action";


const formSchema = z.object({
  username: z.string().min(2).max(50),
})

const AuthFormSchema = (type:FormType) => {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}


const AuthForm = ({type}:{type:FormType}) => {
  const router = useRouter();
    const formSchema = AuthFormSchema(type);
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {

        const {name, email, password} = values;
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        });

        if(!result?.sucess) {
          toast.error(result?.message);
          return;
        }
        
        toast.success('Account successfully created, please sign in');
        router.push('/sign-in')
      } else {
           const { email, password} = values;

           const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        
          const idToken = await userCredentials.user.getIdToken();

          if(!idToken) {
            toast.error('Sign in Failed')
            return;
          }
          await signIn({
            email, idToken
          })
        
          toast.success('Sign in successful');
          router.push('/')

        
      }
    } catch (error) {
      console.log(error);
      toast.error('There was an error: ${error}')
    }
  }

const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-col gap-2 justify-center">
          <Image 
            src="/logo.svg" 
            alt="logo" 
            width={38} 
            height={32} 
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

           <h3>Practice Job Interview with AI</h3>

           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                {!isSignIn && (
                  <FormField 
                       control={form.control}
                       name="name"
                       label="Name"
                       placeholder="Enter your name"
                       type="text"
                  />
                )}
                <FormField 
                       control={form.control}
                       name="email"
                       label="Email"
                       placeholder="Enter your Email Address"
                       type="email"
                  />
                <FormField 
                       control={form.control}
                       name="password"
                       label="Password"
                       placeholder="Enter your Password"
                       type="password"
                  />
                <p>Confirm Password</p>
              
               <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create An Account'}</Button>
             </form>
           </Form>

              <p className="text-center">
                {isSignIn ? 'No Account yet?' : 'Please Have An Account Already?'}
                <Link href={!isSignIn ? '/sign-in' : '/sign-up'}
                className ="front-bold test-user-primary ml-1">
                {isSignIn ? "Sign in" : 'Sign up'}
                </Link>
              </p>
           </div>
        </div>
    )
}
export default AuthForm