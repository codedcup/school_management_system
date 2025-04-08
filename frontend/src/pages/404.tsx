import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const nav = useNavigate();
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="text-center">
                <Typography className="text-xl font-bold">
                    404
                </Typography>
                <Typography className="text-7xl font-bold mb-8">
                    Page not found
                </Typography>
                <Typography>
                    Sorry, we couldn’t find the page you’re looking for.
                </Typography>
                <div className="mt-8">
                    <Button onClick={() => nav("/")}>Go back Home</Button>
                </div>
            </div>
        </div>
    )
}