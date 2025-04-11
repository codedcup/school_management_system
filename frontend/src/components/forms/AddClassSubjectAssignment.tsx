import { useEffect, useState } from "react";
import { useApiMutation, useApiQuery } from "../../api/apiService";
import { ADD_CLASS_SUBJECT_ASSIGNMENT, GET_ALL_CLASSES, GET_ALL_SECTIONS, GET_ALL_STREAMS, GET_ALL_SUBJECTS } from "../../api/endpoints";
import InputField from "../inputField";
import FormDialog from "../FormDialog";
import { Option } from "@material-tailwind/react";

type Props = {
  open: boolean,
  editData?: any,
  onClose: () => void
};

type Status = "active" | "inactive";

export default function AddClassSubjectAssignment({ open, editData, onClose }: Props) {
  const [formData, setFormData] = useState({
    classId: "",
    sectionId: "",
    streamId: "",
    subjectId: "",
    subjectCode: "",
    status: "active" as Status
  });

  const { data: classes = [] } = useApiQuery<any>(['classes'], GET_ALL_CLASSES);
  const { data: sections = [] } = useApiQuery<any>(['section'], GET_ALL_SECTIONS);
  const { data: streams = [] } = useApiQuery<any>(['stream'], GET_ALL_STREAMS);
  const { data: subjects = [] } = useApiQuery<any>(['subject'], GET_ALL_SUBJECTS);

  const mutation = useApiMutation<any, typeof formData>(
    ADD_CLASS_SUBJECT_ASSIGNMENT,
    'POST',
    {
      onSuccess: () => handleClose(),
      onError: (err) => console.log(err),
    }
  );

  useEffect(() => {
    if (editData && editData._id) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutation.mutate(formData);
  };

  const handleClose = () => {
    setFormData({
      classId: "",
      sectionId: "",
      streamId: "",
      subjectId: "",
      subjectCode: "",
      status: "active"
    });
    onClose();
  };

  return (
    <FormDialog
      isOpen={open}
      title="Assign Subject to Class"
      subtitle="Fill in the details below"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InputField label="Class" type="Select" value={formData.classId} onChange={(val) => handleChange("classId", val)}>
        {classes.map((item: any) => <Option key={item._id} value={item._id}>{item.class}</Option>)}
      </InputField>

      <InputField label="Section" type="Select" value={formData.sectionId} onChange={(val) => handleChange("sectionId", val)}>
        {sections.map((item: any) => <Option key={item._id} value={item._id}>{item.name}</Option>)}
      </InputField>

      <InputField label="Stream" type="Select" value={formData.streamId} onChange={(val) => handleChange("streamId", val)}>
        {streams.map((item: any) => <Option key={item._id} value={item._id}>{item.name}</Option>)}
      </InputField>

      <InputField label="Subject" type="Select" value={formData.subjectId} onChange={(val) => handleChange("subjectId", val)}>
        {subjects.map((item: any) => <Option key={item._id} value={item._id}>{item.name}</Option>)}
      </InputField>

      <InputField label="Subject Code" value={formData.subjectCode} onChange={(val) => handleChange("subjectCode", val)} />

      <InputField label="Status" type="Select" value={formData.status} onChange={(val: Status) => handleChange("status", val)}>
        <Option value="active">Active</Option>
        <Option value="inactive">Inactive</Option>
      </InputField>
    </FormDialog>
  );
}
