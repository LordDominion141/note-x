import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import LoginForm from "@/components/LoginForm";

const Signup = async  () => {
    const cookie = await cookies();

    const token = cookie.get('jwt')?.value;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            redirect('/pages/dashboard');
        } catch (error) {
            if(!(error instanceof jwt.JsonWebTokenError)) {
                throw error;
            }
        }
    }
    

    return <LoginForm />
}
 
export default Signup;