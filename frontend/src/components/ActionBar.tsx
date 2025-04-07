import { Button } from "@material-tailwind/react";

type Props = {
    className?: string,
    actions?: Action[]
}

type variant = "filled" | "outlined" | "gradient" | "text";

type Action = {
    label: string,
    onClick?: () => void,
    bgColor?: string,
    icon?: any,
    variant?: variant
}

export default function ActionBar({ className, actions }: Props) {
    return (
        <div className={`py-3 px-4 mb-4 bg-white ${className}`}>
            <div className="inline-flex gap-2">
                {
                    actions && actions.map((v: Action) => {
                        return <Button
                            onClick={v.onClick}
                            key={v.label}
                            variant={v.variant ? v.variant : "filled"}
                            className={`flex gap-2 ${v.bgColor}`}
                            >
                            {v.label} {v.icon}
                        </Button>
                    })
                }
            </div>
        </div>
    )
}