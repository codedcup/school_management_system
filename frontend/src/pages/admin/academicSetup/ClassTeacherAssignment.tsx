import React, { useState, useMemo } from "react";
import ActionBar from "../../../components/ActionBar";
import Table from "../../../components/Table";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import AddClassTeacherForm from "../../../components/forms/AddClassTeacherForm";
import { useApiQuery } from "../../../api/apiService";
import { GET_ALL_CLASS_TEACHER_ASSIGNMENTS } from "../../../api/endpoints";

export default function ClassTeacherAssignment() {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data: tableData, isLoading } = useApiQuery<any[]>(
    ["classTeacher"],
    GET_ALL_CLASS_TEACHER_ASSIGNMENTS
  );

  const transformedData = useMemo(() => {
    return tableData?.map((item) => ({
      ...item,
      className: item.classId?.class || "—",
      sectionName: item.sectionId?.section || "—",
      teacherName: item.teacherId?.name || "—",
    }));
  }, [tableData]);

  const columns = [
    { label: "Class", key: "className" },
    { label: "Section", key: "sectionName" },
    { label: "Teacher", key: "teacherName" },
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
            label: "Assign Class Teacher",
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
        actions={actions}
        onAction={handleAction}
        loading={isLoading}
      />

      <AddClassTeacherForm
        open={isOpen}
        editData={editData}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
