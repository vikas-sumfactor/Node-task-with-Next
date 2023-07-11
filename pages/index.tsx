import mysqldb from "@/database/mysqldb";
import SignupForm from "@/components/SignupForm";
import Signin from "@/components/Signin"


export default function Home() {
  return (
    <div >
    <SignupForm />
    {/* <Signin /> */}
    </div>

  
  )
}