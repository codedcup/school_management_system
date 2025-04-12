import React, { useEffect, useState } from "react";
import FormDialog from "../FormDialog";
import InputField from "../inputField";
import { Option } from "@material-tailwind/react";
import { useApiMutation, useApiQuery } from "../../api/apiService";
import {
  GET_ALL_CLASSES,
  GET_ALL_SUBJECTS,
  GET_ALL_DESIGNATIONS,
  ADD_NEW_TEACHER,
} from "../../api/endpoints";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  editData: any;
  onClose: () => void;
};

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  designation: "",
  teachClass: [],
  teachSubject: [],
  employmentType: "permanent",
  dateOfJoining: "",
  dateOfLeaving: "",
  contractStartDate: "",
  contractEndDate: "",
  address: "",
  bloodGroup: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  identityProof: "",
  status: "active",
};

const AddTeacherForm = ({ open, editData, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);
  const isEdit = Boolean(editData);

  const { data: classOptions } = useApiQuery<any[]>(
    ["classes"],
    GET_ALL_CLASSES
  );
  const { data: subjectOptions } = useApiQuery<any[]>(
    ["subjects"],
    GET_ALL_SUBJECTS
  );
  const { data: designations } = useApiQuery<any[]>(
    ["designations"],
    GET_ALL_DESIGNATIONS
  );

  


  const teacherMutation = useApiMutation(
    isEdit ? `/teacher/${editData?._id}` : ADD_NEW_TEACHER,
    isEdit ? "PUT" : "POST",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teacher"] });
        handleClose();
      },
    }
  );

  useEffect(() => {
    if (editData) {
      setFormData({
        ...initialFormData,
        ...editData,
        dateOfJoining: editData.dateOfJoining?.slice(0, 10) || "",
        dateOfLeaving: editData.dateOfLeaving?.slice(0, 10) || "",
        contractStartDate: editData.contractStartDate?.slice(0, 10) || "",
        contractEndDate: editData.contractEndDate?.slice(0, 10) || "",
        teachClass: Array.isArray(editData.teachClass)
          ? editData.teachClass.map((c: any) => c._id)
          : [],
        teachSubject: Array.isArray(editData.teachSubject)
          ? editData.teachSubject.map((s: any) => s._id)
          : [],
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editData]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Name, Email and Password are required");
      return;
    }

    teacherMutation.mutate(formData);
  };

  return (
    <FormDialog
      isOpen={open}
      title={isEdit ? "Update Teacher" : "Register New Teacher"}
      subtitle='Fill in teacher details'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div className='max-h-[70vh] overflow-y-auto pr-2'>
        <InputField
          label='Name'
          value={formData.name}
          onChange={(val) => handleChange("name", val)}
        />
        <InputField
          label='Email'
          value={formData.email}
          onChange={(val) => handleChange("email", val)}
        />
        <InputField
          label='Phone'
          value={formData.phone}
          onChange={(val) => handleChange("phone", val)}
        />
        <InputField
          label='Password'
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
        />

        <InputField
          label='Designation'
          type='Select'
          value={formData.designation}
          
          onChange={(val) => handleChange("designation", val)}
        >
          {designations?.map((d) => (
            <Option key={d._id} value={d.designation}>
              {d.designation}
            </Option>
          ))}
        </InputField>

        <InputField
          label='Classes'
          type='Select'
          value={formData.teachClass}
          onChange={(val) => handleChange("teachClass", val)}
          multiple
        >
          {classOptions?.map((cls) => (
            <Option key={cls._id} value={cls._id}>
              {cls.class}
            </Option>
          ))}
        </InputField>

        <InputField
          label='Subjects'
          type='Select'
          value={formData.teachSubject}
          onChange={(val) => handleChange("teachSubject", val)}
          multiple
        >
          {subjectOptions?.map((subj) => (
            <Option key={subj._id} value={subj._id}>
              {subj.subject}
            </Option>
          ))}
        </InputField>

        <InputField
          label='Employment Type'
          type='Select'
          value={formData.employmentType}
          onChange={(val) => handleChange("employmentType", val)}
        >
          <Option value='permanent'>Permanent</Option>
          <Option value='contract'>Contract</Option>
        </InputField>

        <InputField
          label='Date of Joining'
          type='datepicker'
          value={formData.dateOfJoining}
          onChange={(val) => handleChange("dateOfJoining", val)}
        />
        <InputField
          label='Date of Leaving'
          type='datepicker'
          value={formData.dateOfLeaving}
          onChange={(val) => handleChange("dateOfLeaving", val)}
        />
        <InputField
          label='Contract Start Date'
          type='datepicker'
          value={formData.contractStartDate}
          onChange={(val) => handleChange("contractStartDate", val)}
        />
        <InputField
          label='Contract End Date'
          type='datepicker'
          value={formData.contractEndDate}
          onChange={(val) => handleChange("contractEndDate", val)}
        />

        <InputField
          label='Address'
          value={formData.address}
          onChange={(val) => handleChange("address", val)}
        />
        <InputField
          label='Blood Group'
          value={formData.bloodGroup}
          onChange={(val) => handleChange("bloodGroup", val)}
        />
        <InputField
          label='Emergency Contact Name'
          value={formData.emergencyContactName}
          onChange={(val) => handleChange("emergencyContactName", val)}
        />
        <InputField
          label='Emergency Contact Phone'
          value={formData.emergencyContactPhone}
          onChange={(val) => handleChange("emergencyContactPhone", val)}
        />
        <InputField
          label='Identity Proof'
          value={formData.identityProof}
          onChange={(val) => handleChange("identityProof", val)}
        />

        <InputField
          label='Status'
          type='Select'
          value={formData.status}
          onChange={(val) => handleChange("status", val)}
        >
          <Option value='active'>Active</Option>
          <Option value='inactive'>Inactive</Option>
        </InputField>
      </div>
    </FormDialog>
  );
};

export default AddTeacherForm;
