import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Dialog,
  Select,
  Option,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  open: boolean,
  editData?: { class: string, status: statusOptions },
  onClose: () => void
}

type statusOptions = "active" | "inactive";

export default function AddClassForm({ open, editData, onClose }: Props) {
  const [className, setClassName] = useState<string>('');
  const [status, setStatus] = useState<statusOptions>("active");
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (editData) {
      setEditMode(true);
      setClassName(editData.class);
      setStatus(editData.status);
    }
  }, [editData]);

  const handleClose = () => {
    setClassName("");
    setStatus("active");
    setEditMode(false);
    onClose();
  }

  const handleSubmit = () => {
    if (validate()) {
      console.log(className + " | " + status);
      handleClose();
    } else {
      alert("input validation failed");
    }
  }

  const validate = () => {
    return true;
  }

  return (
    <>
      <Dialog size="sm" open={open} handler={handleClose} className="p-4">

        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Class
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Subheader of add class
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleClose}
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
              Class Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="e.g., John Doe"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
              value={className}
              onChange={(e: any) => setClassName(e.target.value)}
            />
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Status
            </Typography>
            <Select
              labelProps={{ className: "hidden" }}
              value={status}
              onChange={(val: statusOptions) => setStatus(val)}
            >
              <Option value="active">Active</Option>
              <Option value="inactive" default>Inactive</Option>
            </Select>
          </div>

        </DialogBody>

        <DialogFooter>
          <div className="inline-flex gap-4 text-right">
            <Button variant="text" className="ml-auto" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="ml-auto" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </DialogFooter>

      </Dialog>
    </>
  );
}