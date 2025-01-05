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
import { useFormik } from "formik";
import { signInValidation } from "@/validations/auth.validation";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signInRequest } from "@/lib/apiCalls";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

const SignIn = () => {

  //cookie are httponly, they will be sent over https only.
  // const [ cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { mutate, isError, isPending, error } = useMutation({

    mutationFn: signInRequest,

    onSuccess: (response) => {

      console.log("onsuccess", response);
      alert(JSON.stringify(response.data));

      if(response.statusCode === 200){
        navigate("/dashboard")
      };

      // const accessToken = response.headers["accessToken"];
      // const refreshToken = response.headers["refreshToken"];

      // if(accessToken){
      //   setCookie("accessToken", accessToken, {
      //     path: "/",
      //     httpOnly: false,
      //     secure: true,
      //     sameSite: "strict"
      //   })
      // };

      // if(refreshToken){
      //   setCookie("refreshToken", refreshToken, {
      //     path: "/",
      //     httpOnly: true,
      //     secure: true,
      //     sameSite: "strict"
      //   })
      // };
      
    },

    onError: (err: any) => {
      console.log("onerror: ", err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  });


  useEffect(() => {
    console.log(`isError: ${isError}; isPending: ${isPending}; error: ${error}`);
  }, [isPending, isError, error]);


  const formik = useFormik({

    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: signInValidation,

    onSubmit: (values) => {
      values.email = values.email.toLowerCase(),
      mutate(values);
      console.log(values);
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">

      <Card className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault(),
            formik.handleSubmit()
          }}>
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your email and password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-3">
              <Label>Email</Label>
              <Input
                type="email"
                {...formik.getFieldProps("email")}
                name="email"
                placeholder="johndoe@example.com" />
              {formik.errors.email && formik.touched.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
            </div>
            <div className="flex flex-col gap-2 mb-3">
              <Label>Password</Label>
              <Input
                type="password"
                {...formik.getFieldProps("password")}
                name="password"
                placeholder="********" />
              {formik.errors.password && formik.touched.password && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

              {isError && errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button className="w-full" type="submit" size="lg">Sign In</Button>
            <p className="text-xs text-gray-400">Don't have an account?
              <Link to="/signup">
                <span className="text-white underline ml-1">Sign Up</span>
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
};

export default SignIn;