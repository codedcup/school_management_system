import ActionBar from "../../../components/ActionBar";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/Table";
import { useState } from "react";
import AddClassForm from "../../../components/forms/AddClassForm";
import { ClassResponseType } from "../../../utilities/types";
import { GET_ALL_CLASSES } from "../../../api/endpoints";
import { useApiQuery } from "../../../api/apiService";

export default function Classes() {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editData, setEditData] = useState<any>(undefined);

    const { data: tableData, error, isLoading } = useApiQuery<any>(
        ['classes'],
        GET_ALL_CLASSES
    );

    const columns = [
        {
            label: 'Class Name',
            key: 'class',
        },
        {
            label: 'Status',
            key: 'status',
        }
    ];

    const actions = [
        {
            key: 'view',
            icon: <EyeIcon className="h-4 w-4 text-gray-900" />,
            visible: () => true,
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

    const handleAction = (action: any, row: any) => {
        if (action == "edit") {
            setEditData(row);
            setIsOpen(true);
        }
    }

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <ActionBar
                className='text-right'
                actions={[
                    {
                        label: "Add Class",
                        onClick: () => setIsOpen(true),
                        icon: <PlusIcon className="h-4" strokeWidth={4} />
                    },
                    {
                        label: "Add bulk class",
                        variant: "outlined",
                        icon: <PlusIcon className="h-4" strokeWidth={4} />
                    }
                ]} />

            <Table
                data={tableData}
                columns={columns}
                searchable={true}
                selectable={true}
                actions={actions}
                onAction={handleAction}
            />

            <AddClassForm
                editData={editData}
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
            />
        </div>
    )
}