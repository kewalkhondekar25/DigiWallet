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
import { Link } from "react-router-dom"

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
            {formik.errors.name ? <p className="text-red-500 text-sm">{formik.errors.name}</p> : null}
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label>Email</Label>
            <Input 
              type="email"
              {...formik.getFieldProps("email")}
              name="email"
              placeholder="johndoe@example.com"/>
            {formik.errors.email ? <p className="text-red-500 text-sm">{formik.errors.email}</p> : null}
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label>Password</Label>
            <Input type="password"
              {...formik.getFieldProps("password")}
              name="password"
              placeholder="********"/>
            {formik.errors.password ? <p className="text-red-500 text-sm">{formik.errors.password}</p> : null}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit" size="lg">Sign Up</Button>
          <p className="text-xs text-gray-400">Already have an account?
            <Link to="/signin">
              <span className="text-white underline ml-1">Sign In</span>
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
};

export default SignUp;