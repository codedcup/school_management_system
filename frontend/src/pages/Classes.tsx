import ActionBar from "../components/ActionBar";
import { DocumentIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table";
import FSDrawer from "../components/FSDrawer";
import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { DialogHeader } from "@material-tailwind/react";
import FormDialog from "../components/FormDialog";
import AddClassForm from "../components/forms/AddClassForm";

const sampleData = [
    {
        id: 1,
        invoice: "INV-001",
        customer: "John Doe",
        amount: "$100.00",
        issued: "2025-04-01",
        date: "2025-04-02",
        status: "paid",
    },
    {
        id: 2,
        invoice: "INV-002",
        customer: "Jane Smith",
        amount: "$200.00",
        issued: "2025-04-03",
        date: "2025-04-04",
        status: "unpaid",
    },
];

const columns = [
    {
        label: 'Invoice',
        key: 'invoice',
    },
    {
        label: 'Customer',
        key: 'customer',
    },
    {
        label: 'Amount',
        key: 'amount',
    },
    {
        label: 'Issued',
        key: 'issued',
    },
    {
        label: 'Date Of joining',
        key: 'date',
    },
];

const actions = [
    {
        key: 'view',
        icon: <EyeIcon className="h-4 w-4 text-gray-900" />,
        visible: (row: any) => row.status == "paid",
    },
    {
        key: 'edit',
        icon: <PencilIcon className="h-4 w-4 text-gray-900" />,
        visible: () => true,
    },
    {
        key: 'delete',
        icon: <TrashIcon className="h-4 w-4 text-gray-900" />,
        visible: () => true,
    },
];

export default function Classes() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleAction = (action: any, row: any) => {
        alert(action + " " + row.id);
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ActionBar
                className='text-right'
                actions={[
                    {
                        label: "text 1",
                        onClick: () => setIsOpen(true),
                        icon: <PlusIcon className="h-4" strokeWidth={4} />
                    },
                    {
                        label: "text 2",
                        variant: "outlined",
                        onClick: () => alert("button 2 clicked"),
                    },
                    {
                        label: "jlkajf",
                        onClick: () => alert("another cick")
                    }
                ]} />

            <Table
                data={sampleData}
                columns={columns}
                searchable={true}
                selectable={true}
                actions={actions}
                onAction={handleAction}
            />

            <AddClassForm data={{}} open={isOpen} handleOpen={() => setIsOpen(!isOpen)}/>
        </div>
    )
}