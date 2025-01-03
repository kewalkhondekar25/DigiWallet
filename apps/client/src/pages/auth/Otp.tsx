import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label";
import { otpRequest } from "@/lib/apiCalls";
import { otpValidation } from "@/validations/auth.validation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate, isPending, isError} = useMutation({

    mutationFn: otpRequest,

    onSuccess: (response) => {
      
      console.log(response);
      alert(JSON.stringify(response.data));
      navigate("/signin")
    },

    onError: (err: any) => {
      console.log(err.response.data.message);
      setErrorMessage(err.response.data.message);
    }
  })

  const formik = useFormik({

    initialValues: {
      otp: ""
    },

    validationSchema: otpValidation,

    onSubmit: (values) => {
      console.log(values);
      mutate(values);
    }
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 gap-3">
      <Label className="text-lg">One-Time Password</Label>
      <form onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit()
      }}>
        <div className="flex flex-col place-items-start gap-1">
          <InputOTP maxLength={6}
            onChange={(e) => formik.setFieldValue("otp", e)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-red-500 text-sm">{formik.errors.otp}</p>
          {
            isError && errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>
          }
          <p className="text-xs text-gray-500">Please enter the OTP sent to your email.</p>
          <Button className="mt-3 rounded-lg" type="submit">Submit</Button>
        </div>
      </form>
    </div>

  )
};

export default OtpPage;