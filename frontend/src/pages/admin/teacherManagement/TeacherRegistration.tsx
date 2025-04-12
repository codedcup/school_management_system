import React, { useState, useMemo } from "react";
import ActionBar from "../../../components/ActionBar";
import Table from "../../../components/Table";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import AddTeacherForm from "../../../components/forms/AddTeacherForm";
import { useApiQuery } from "../../../api/apiService";
import { GET_ALL_TEACHERS } from "../../../api/endpoints";

export default function TeacherRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data: tableData, isLoading } = useApiQuery<any[]>(["teachers"], GET_ALL_TEACHERS);

  const transformedData = useMemo(() => {
    return tableData?.map((item) => ({
      ...item,
      teachClass: item.teachClass?.map((c) => c.class).join(", "),
      teachSubject: item.teachSubject?.map((s) => s.subject).join(", "),
    }));
  }, [tableData]);

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Designation", key: "designation" },
    { label: "Subjects", key: "teachSubject" },
    { label: "Classes", key: "teachClass" },
    { label: "Status", key: "status" },
  ];

  const actions = [
    {
      key: "edit",
      icon: <PencilIcon className="h-4 w-4 text-gray-900" />,
      visible: () => true,
    },
  ];

  const handleAction = (action: string, row: any) => {
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
            label: "Register Teacher",
            onClick: () => {
              setEditData(null);
              setIsOpen(true);
            },
            icon: <PlusIcon className="h-4" strokeWidth={4} />,
          },
        ]}
      />

      <Table
        data={transformedData}
        columns={columns}
        searchable
        selectable
        actions={actions}
        onAction={handleAction}
        loading={isLoading}
      />

      <AddTeacherForm open={isOpen} editData={editData} onClose={() => setIsOpen(false)} />
    </div>
  );
}
