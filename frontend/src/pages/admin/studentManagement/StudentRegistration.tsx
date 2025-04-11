import React, { useState } from "react";
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

  const { data: tableData, error, isLoading } = useApiQuery<StudentResponseType[]>(
    ["students"],
    GET_ALL_STUDENTS
  );

  const columns = [
    { label: "Name", key: "name" },
    { label: "Student ID", key: "studentId" },
    { label: "Roll No.", key: "rollNum" },
    { label: "Class", key: "class.classId.class" },
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
        data={tableData}
        columns={columns}
        searchable
        selectable
        actions={actions}
        onAction={handleAction}
      />

      <AddStudentRegistration
        open={isOpen}
        editData={editData}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
