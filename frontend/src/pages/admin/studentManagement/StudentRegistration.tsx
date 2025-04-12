import React, { useState, useMemo } from "react";
import ActionBar from "../../../components/ActionBar";
import Table from "../../../components/Table";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import AddStudentRegistration from "../../../components/forms/AddStudentRegistration";
import { useApiQuery } from "../../../api/apiService";
import { GET_ALL_STUDENTS } from "../../../api/endpoints";
import { StudentResponseType } from "../../../utilities/types";

export default function StudentRegistration() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<StudentResponseType | null>(null);

  const { data: tableData, isLoading } = useApiQuery<StudentResponseType[]>(
    ["students"],
    GET_ALL_STUDENTS
  );

  const transformedData = useMemo(() => {
    return tableData?.map((item) => ({
      ...item,
      className: item.class?.classId?.class || "—",
    }));
  }, [tableData]);

  const columns = [
    { label: "Name", key: "name" },
    { label: "Student ID", key: "studentId" },
    { label: "Roll No.", key: "rollNum" },
    { label: "Class", key: "className" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
  ];

  const actions = [
    {
      key: "edit",
      icon: <PencilIcon className="h-4 w-4 text-gray-900" />,
      visible: () => true,
    },
  ];

  const handleAction = (action: string, row: StudentResponseType) => {
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
            label: "Register Student",
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

      <AddStudentRegistration
        open={isOpen}
        editData={editData}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
