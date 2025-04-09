import {
    Typography,
    Input,
    CardFooter,
    Button,
    Checkbox,
    CardBody,
    CardHeader,
    Card
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";

import { AdminLoginResponseType } from "../../utilities/types";
import { useAppContext } from "../../contexts/AppContext";
import { useApiMutation } from "../../api/apiService";
import { useAuth } from "../../contexts/AuthContext";
import { LOGIN_ADMIN, LOGIN_STUDENT, LOGIN_TEACHER } from "../../api/endpoints";

type Props = {
    loginType: "Admin" | "Teacher" | "Student"
}

export default function LoginForm({ loginType }: Props) {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { setToken } = useAuth();
    const { setUser } = useAppContext();

    useEffect(() => {
        setErrorMessage("");
    }, [email, password])

    const getUrlForLoginType = () => {
        switch (loginType) {
            case "Admin": return LOGIN_ADMIN;
            case "Teacher": return LOGIN_TEACHER;
            default: return LOGIN_STUDENT;
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

    // 👉 Setup API mutation hook
    const loginMutation = useApiMutation<AdminLoginResponseType, { email: string, password: string }>(
        getUrlForLoginType(),
        'POST',
        {
            onSuccess: (data) => {
                setToken(data.token);
                setUser(data.user);
            },
            onError: () => {
                setErrorMessage("Incorrect Email/Password!");
            },
        }
    );

    const handleSubmit = () => {
        if (validate()) {
            setErrorMessage('');
            loginMutation.mutate({ email, password });
        }
    };

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
                            type="email"
                            label="Email"
                            size="lg"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value.toLowerCase())}
                        />
                        <Input
                            type="password"
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