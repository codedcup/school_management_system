import { Typography } from "@material-tailwind/react"

type Props = {
    children?: any,
    error?: string
}

export default function InputGroup({ children, error }: Props) {
    return (
        <div>
            {children}

            <Typography>
                {error}
            </Typography>
        </div>
    )
}