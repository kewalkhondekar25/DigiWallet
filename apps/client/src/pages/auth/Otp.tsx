import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Label } from "@/components/ui/label";
import { otpValidation } from "@/validations/auth.validation";
import { useFormik } from "formik";

const OtpPage = () => {

  const formik = useFormik({
    initialValues: {
      otp: ""
    },
    validationSchema: otpValidation,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className="flex flex-col gap-3">
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
          <p className="text-xs text-gray-500">Please enter the OTP sent to your email.</p>
          <Button className="mt-3 rounded-lg" type="submit">Submit</Button>
        </div>
      </form>
    </div>

  )
};

export default OtpPage;