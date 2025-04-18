import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { agentCode, securityKey } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

// Define validation schema
const formSchema = z.object({
  email: z.string().email("Invalid email"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Invalid phone number format, Phone number must start with a '+' followed by up to 15 digits"
    ),
});

// Define TypeScript type from schema
export type SignupFormData = z.infer<typeof formSchema>;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // the fetch did not seem to waork bcause of a cors error


  async function signupUser(userData: SignupFormData) {
    try {
      console.log("🚀 ~ signupUser ~ securityKey:", securityKey);
      const response = await fetch("https://datacliqq.ditcosoft.com/apis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Security-Key": securityKey,
        },
        body: JSON.stringify({
          requestType: "REGT",
          userMail: userData.email,
          userPassword: userData.password,
          userFullname: `${userData.firstName} ${userData.lastName}`,
          userPhone: userData.phone,
          agentCode: agentCode,
          userAgent: navigator.userAgent,
        }),
      });

      console.log("🚀 ~ signupUser ~ response:", response.json());
      return response.json();
    } catch (e) {
      console.error("🚀 ~ signupUser ~ e:", e);
      throw new Error(e instanceof Error ? e.message : String(e));
    }
  }


  // React Hook Form Setup
  const form = useForm<SignupFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phone: "",
    },
  });

  // sign in user
  const signUp = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("Signup successful", data);
      navigate("/admin"); // Navigate after successful signup
    },
    onError: (error) => {
      console.error("Signup failed:", error);
       navigate("/admin"); 
    },
  });

  // Form submission handler
  const onSubmit = (data: SignupFormData) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    signUp.mutate(data);
  };



  return (
    <div className="bg-gradient-to-br from-[#6d10b8] to-[#01040e] flex items-center justify-center h-screen w-full md:p-10 p-5">
      <div className="flex rounded-lg bg-white">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 p-10 text-white flex-col justify-center items-center rounded-tl-lg rounded-bl-lg">
          <img
            src="/assets/left-side-img.png"
            alt="Description"
            className="size-64"
          />
          <div className="text-left">
            <h2 className="text-4xl font-semibold mb-4">
              We simplify your financial handlings
            </h2>
            <p className="text-lg max-w-[350px]">
              Register your business or file your tax returns seamlessly with
              Spar.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 max-w-lg mx-auto flex justify-center items-center md:p-10 p-5">
          <Card className="w-full lg:p-6">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

            {/* Google Sign-in */}
            <Button variant="outline" className="w-full flex gap-2">
              <FcGoogle size={20} /> Sign up with Google
            </Button>

            <div className="text-center text-sm text-gray-500">or</div>

            {/* Signup Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 w-full">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-blue-500">
                    Terms of Service
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                  .
                </p>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={signUp.isPending}>
                  {signUp.isPending ? "Signing up..." : "Agree and Continue"}
                </Button>
              </form>
            </Form>

            <p className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
