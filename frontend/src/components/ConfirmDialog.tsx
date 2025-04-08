import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

type Props = {
  open: boolean,
  title: string,
  message: string,
  onCancel?: () => void,
  onAccept: () => void
}

export default function ConfirmDialog({ open, title, message, onCancel, onAccept }: Props) {

  return (
    <>
      <Dialog open={open} size="xs" handler={onCancel}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>
          {message}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={onCancel}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={onAccept}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}