import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormik } from "formik"
import { signUpValidation } from "@/validations/auth.validation";

const SignUp = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: signUpValidation,
    onSubmit: (values) => {
      values.email = values.email.toLowerCase(),
      console.log(values)
    }
  });

  return (
    <Card className="w-4/5">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit()
        }}>
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your details. We'll send you OTP.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 mb-3">
            <Label>Name</Label>
            <Input 
              type="text" 
              {...formik.getFieldProps("name")}
              name="name"
              placeholder="john doe"/>
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label>Email</Label>
            <Input 
              type="email"
              {...formik.getFieldProps("email")}
              name="email"
              placeholder="johndoe@example.com"/>
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label>Password</Label>
            <Input type="password"
              {...formik.getFieldProps("password")}
              name="password"
              placeholder="********"/>
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" size="lg">Sign Up</Button>
        </CardFooter>
      </form>
    </Card>
  )
};

export default SignUp;