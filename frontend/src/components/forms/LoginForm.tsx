import { Typography } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { CardFooter } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import { CardBody } from "@material-tailwind/react";
import { CardHeader } from "@material-tailwind/react";
import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { callApi } from "../../api/callApi";
import { useAuth } from "../../contexts/AuthContext";
import { useAppContext } from "../../contexts/AppContext";
import { AdminLoginResponseType } from "../../utilities/interfaces";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";


type Props = {
    loginType: "Admin" | "Teacher" | "Student"
}

export default function LoginForm({ loginType }: Props) {

    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const [errorMessage, setErrorMessage] = useState<String>('');

    const { setToken } = useAuth();
    const { setUser } = useAppContext();

    useEffect(() => {
        setErrorMessage("");
    }, [email, password])

    const handleSubmit = () => {

        if (validate()) {
            setErrorMessage("");

            callApi<AdminLoginResponseType>(getUrlForLoginType(), "POST", { email: email, password })
                .then((response) => {
                    setToken(response.token);
                    setUser(response.user);
                })
                .catch(() => setErrorMessage("Incorrect Email/Password!"))
        }
    }

    const getUrlForLoginType = () => {
        switch (loginType) {
            case "Admin": return "/auth/admin/login";
            case "Teacher": return "/auth/teacher/login";
            default: return "/auth/student/login";
        }
    }

    const validate = () => {
        if (email.trim().length == 0) {
            setErrorMessage("Email is required!");
            return false;
        }

        if (password.trim().length == 0) {
            setErrorMessage("Password is required!");
            return false;
        }

        return true;
    }

    return (
        <div className="flex h-screen w-screen bg-gray-300">
            <Link to={`/`} className="fixed top-4 left-4">
                <Button className="bg-white text-gray-900 flex items-center gap-2 hover:scale-105"><HomeIcon className="h-5" /> Home</Button>
            </Link>

            <div className="flex-1 flex flex-col gap-8 items-center justify-center h-full text-white bg-gray-900">
                <Typography className="text-smxl">
                    {`< LOGO HERE >`}
                </Typography>
                <Typography variant="h1" className="text-3xl">
                    Welcome to
                </Typography>
                <Typography variant="h1" className="text-8xl">
                    XYZ School
                </Typography>
            </div>

            <div className="flex-1 flex justify-center items-center">
                <Card className="w-96">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            {loginType} Login
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            size="lg"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <Input
                            label="Password"
                            size="lg"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        />

                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" fullWidth onClick={handleSubmit}>
                            Sign In
                        </Button>

                        {
                            errorMessage && <Typography className="text-red-700 mt-4 text-center">
                                {errorMessage}
                            </Typography>
                        }
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}