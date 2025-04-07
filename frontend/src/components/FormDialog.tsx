import React from "react";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";


type Props = {
    children?: any,
    isOpen: boolean,
    onClose: () => void,
    onSubmit: () => void,
}

export default function FormDialog({ isOpen, onClose, onSubmit, children }: Props) {

    return (
        <>
            <Dialog size="sm" open={isOpen} handler={() => alert("Dialog Handler called")} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blue-gray">
                        Manage Item
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-600">
                        Keep your records up-to-date and organized.
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
                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Name
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="eg. White Shoes"
                            name="name"
                            className="placeholder:opacity-100 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    <div>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 text-left font-medium"
                        >
                            Description (Optional)
                        </Typography>
                        <Textarea
                            rows={7}
                            placeholder="eg. This is a white shoes with a comfortable sole."
                            className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                </DialogBody>

                <DialogFooter>
                    <div className="inline-flex text-right gap-4">
                        <Button variant="text" className="ml-auto" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="ml-auto" onClick={onSubmit}>
                            Submit
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    );
}