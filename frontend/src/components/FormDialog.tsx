import { XMarkIcon } from "@heroicons/react/16/solid";
import {
    Typography,
    DialogFooter,
    Button,
    DialogBody,
    IconButton,
    DialogHeader,
    Dialog
} from "@material-tailwind/react";

type Props = {
    title: string,
    subtitle: string,
    children?: any,
    size?: "sm" | "lg"
    isOpen: boolean,
    isEditMode?: boolean,
    onClose?: () => void,
    onSubmit?: () => void,
}

export default function FormDialog({
    isOpen,
    isEditMode,
    title,
    subtitle,
    size = "sm",
    onClose,
    onSubmit,
    children
}: Props) {

    return (
        <Dialog size={size} open={isOpen} handler={onClose} className="p-4">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    {title}
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    {subtitle}
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </DialogHeader>

            <DialogBody className="space-y-4 pb-6">
                {children}
            </DialogBody>

            <DialogFooter>
                <div className="inline-flex text-right gap-4">
                    <Button variant="text" className="ml-auto" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button className="ml-auto" onClick={onSubmit}>
                        { isEditMode ? "Update" : "Submit"}
                    </Button>
                </div>
            </DialogFooter>
        </Dialog>
    );
}