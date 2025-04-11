import ActionBar from "../../../components/ActionBar";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/Table";
import { useState } from "react";
import AddDesignationForm from "../../../components/forms/AddDesignationForm";
import { GET_ALL_DESIGNATIONS } from "../../../api/endpoints";
import { useApiQuery } from "../../../api/apiService";

export default function Designations() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data: tableData, error, isLoading } = useApiQuery(['designations'], GET_ALL_DESIGNATIONS);

  const columns = [
    { label: 'Designation Name', key: 'designation' },
    { label: 'Status', key: 'status' },
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

  const handleAction = (action, row) => {
    if (action === "edit") {
      setEditData(row);
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ActionBar
        className="text-right"
        actions={[
          {
            label: "Add Designation",
            onClick: () => setIsOpen(true),
            icon: <PlusIcon className="h-4" strokeWidth={4} />,
          },
        ]}
      />

      <Table
        data={tableData}
        columns={columns}
        searchable
        selectable
        actions={actions}
        onAction={handleAction}
      />

      <AddDesignationForm
        editData={editData}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
