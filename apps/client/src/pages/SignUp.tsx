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



const SignUp = () => {
  return (
    <Card className="w-4/5">
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details. We'll send you OTP.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="">
          <div className="flex flex-col gap-2 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="john doe" />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label htmlFor="email">Email</Label>
            <Input type="email" placeholder="johndoe@example.com" />
          </div>
          <div className="flex flex-col gap-2 mb-3">
            <Label htmlFor="password">Password</Label>
            <Input type="password" placeholder="********" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">Sign Up</Button>
      </CardFooter>
    </Card>
  )
};

export default SignUp;