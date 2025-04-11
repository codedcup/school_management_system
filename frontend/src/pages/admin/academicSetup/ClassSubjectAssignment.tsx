import React, { useState } from "react";
import ActionBar from "../../../components/ActionBar";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/Table";
import AddClassSubjectForm from "../../../components/forms/AddClassSubjectForm";
import { useApiQuery } from "../../../api/apiService";
import { GET_ALL_CLASS_SUBJECT_ASSIGNMENTS } from "../../../api/endpoints";
import { ClassSubjectAssignmentType } from "../../../utilities/types";

export default function ClassSubjectAssignment() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editData, setEditData] = useState<ClassSubjectAssignmentType | null>(null);

  const { data: tableData, error, isLoading } = useApiQuery<ClassSubjectAssignmentType[]>(
    ["class-subject-assignments"],
    GET_ALL_CLASS_SUBJECT_ASSIGNMENTS
  );

  const columns = [
    { label: "Class", key: "classId.class" },
    { label: "Section", key: "sectionId.section" },
    { label: "Stream", key: "streamId.stream" },
    { label: "Subject", key: "subjectId.subject" },
    { label: "Subject Code", key: "subjectCode" },
    { label: "Status", key: "status" },
  ];

  const actions = [
    {
      key: "edit",
      icon: <PencilIcon className="h-4 w-4 text-gray-900" />,
      visible: () => true,
    },
    {
      key: "delete",
      icon: <TrashIcon className="h-4 w-4 text-gray-900" />,
      visible: () => true,
    },
  ];

  const handleAction = (action: string, row: ClassSubjectAssignmentType) => {
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
            label: "Add Assignment",
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
        searchable={true}
        selectable={true}
        actions={actions}
        onAction={handleAction}
      />

      <AddClassSubjectForm
        open={isOpen}
        editData={editData}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
