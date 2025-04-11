import ActionBar from "../../../components/ActionBar";
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/Table";
import { useState } from "react";
import AddStreamForm from "../../../components/forms/AddStreamForm";
import { GET_ALL_STREAMS } from "../../../api/endpoints";
import { useApiQuery } from "../../../api/apiService";

export default function Streams() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data: tableData, error, isLoading } = useApiQuery(['streams'], GET_ALL_STREAMS);

  const columns = [
    { label: 'Stream Name', key: 'stream' },
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
            label: "Add Stream",
            onClick: () => setIsOpen(true),
            icon: <PlusIcon className="h-4" strokeWidth={4} />,
          },
          {
            label: "Add bulk streams",
            variant: "outlined",
            icon: <PlusIcon className="h-4" strokeWidth={4} />
        }
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

      <AddStreamForm
        editData={editData}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
