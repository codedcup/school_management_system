import { Typography } from '@material-tailwind/react';
import { Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const LoginHome = () => {

    const links = [
        {
            link: "/admin-login",
            label: "Admin Login"
        },
        {
            link: "/teacher-login",
            label: "Teacher Login"
        },
        {
            link: "/student-login",
            label: "Student Login"
        },
    ]

    return (
        <div className='bg-gray-300 h-screen w-screen flex items-center justify-center'>
            <div className='flex flex-col text-center gap-4'>
                <h1>Welcome! Please log in as:</h1>
                <div className='flex gap-16'>
                    {
                        links.map(v => (
                            <Link to={v.link}>
                                <Card className="w-48 h-48 flex items-center justify-center hover:scale-105 transition duration-300">
                                    <Typography className="text-2xl">
                                        {v.label}
                                    </Typography>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LoginHome;
