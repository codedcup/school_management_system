import React, { useEffect, useState } from "react";
import FormDialog from "../FormDialog";
import InputField from "../inputField";
import { Option } from "@material-tailwind/react";
import { useApiMutation, useApiQuery } from "../../api/apiService";
import {
  ADD_NEW_STUDENT,
  GET_ALL_CLASS_SUBJECT_ASSIGNMENTS,
} from "../../api/endpoints";
import { StudentResponseType } from "../../utilities/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  open: boolean;
  editData: StudentResponseType | null;
  onClose: () => void;
};

const initialFormData = {
  name: "",
  studentId: "",
  rollNum: "",
  class: "",
  password: "",
  phone: "",
  email: "",
  primaryContactMode: "phone",
  address: "",
  fatherName: "",
  motherName: "",
  fatherOccupation: "",
  motherOccupation: "",
  bloodGroup: "",
  medicalCondition: "",
  identityProof: "",
  photo: "",
  dateOfAdmission: "",
  dateOfLeaving: "",
  status: "active",
};

const AddStudentRegistration = ({ open, editData, onClose }: Props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(initialFormData);

  const { data: classOptions } = useApiQuery<any[]>(
    ["assignment"],
    GET_ALL_CLASS_SUBJECT_ASSIGNMENTS
  );

  const isEdit = Boolean(editData);

  const studentMutation = useApiMutation(
    isEdit ? `/student/${editData?._id}` : ADD_NEW_STUDENT,
    isEdit ? "PUT" : "POST",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["student"] });
        handleClose();
      },
      onError: (err) => console.error("Student registration failed", err),
    }
  );

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        class: editData.class?._id || "",
        dateOfAdmission: editData.dateOfAdmission?.slice(0, 10) || "",
        dateOfLeaving: editData.dateOfLeaving?.slice(0, 10) || "",
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
    const payload = {
      ...formData,
      rollNum: parseInt(formData.rollNum),
      dateOfAdmission: formData.dateOfAdmission
        ? new Date(formData.dateOfAdmission).toISOString()
        : null,
      dateOfLeaving: formData.dateOfLeaving
        ? new Date(formData.dateOfLeaving).toISOString()
        : null,
    };

    // Optional basic validation
    if (!payload.name || !payload.class || !payload.password) {
      alert("Name, Class and Password are required");
      return;
    }

    studentMutation.mutate(payload);
  };

  return (
    <FormDialog
      size='sm'
      isOpen={open}
      title={isEdit ? "Update Student" : "Register New Student"}
      subtitle='Fill in the student details'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <div className='max-h-[75vh] overflow-y-auto pr-2'>
        {/* BASIC INFO */}
        <InputField
          label='Name'
          value={formData.name}
          required={true}
          onChange={(val) => handleChange("name", val)}
        />
        <InputField
          label='Student ID'
          value={formData.studentId}
          required={true}
          onChange={(val) => handleChange("studentId", val)}
        />
        <InputField
          label='Roll Number'
          value={formData.rollNum}
          onChange={(val) => handleChange("rollNum", val)}
        />
        <InputField
          label='Password'
          //type='password'
          value={formData.password}
          onChange={(val) => handleChange("password", val)}
        />
        <InputField
          label='Class'
          type='Select'
          value={formData.class}
          onChange={(val) => handleChange("class", val)}
        >
          {classOptions?.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.classId?.class} - {item.sectionId?.section} -{" "}
              {item.subjectId?.subject}
            </Option>
          ))}
        </InputField>

        {/* CONTACT INFO */}
        <InputField
          label='Phone'
          value={formData.phone}
          onChange={(val) => handleChange("phone", val)}
        />
        <InputField
          label='Email'
          value={formData.email}
          onChange={(val) => handleChange("email", val)}
        />
        <InputField
          label='Primary Contact Mode'
          type='Select'
          value={formData.primaryContactMode}
          onChange={(val) => handleChange("primaryContactMode", val)}
        >
          <Option value='phone'>Phone</Option>
          <Option value='email'>Email</Option>
        </InputField>
        <InputField
          label='Address'
          value={formData.address}
          onChange={(val) => handleChange("address", val)}
        />

        {/* FAMILY INFO */}
        <InputField
          label="Father's Name"
          value={formData.fatherName}
          onChange={(val) => handleChange("fatherName", val)}
        />
        <InputField
          label="Mother's Name"
          value={formData.motherName}
          onChange={(val) => handleChange("motherName", val)}
        />
        <InputField
          label="Father's Occupation"
          value={formData.fatherOccupation}
          onChange={(val) => handleChange("fatherOccupation", val)}
        />
        <InputField
          label="Mother's Occupation"
          value={formData.motherOccupation}
          onChange={(val) => handleChange("motherOccupation", val)}
        />

        {/* HEALTH & IDENTITY */}
        <InputField
          label='Blood Group'
          value={formData.bloodGroup}
          onChange={(val) => handleChange("bloodGroup", val)}
        />
        <InputField
          label='Medical Condition'
          value={formData.medicalCondition}
          onChange={(val) => handleChange("medicalCondition", val)}
        />
        <InputField
          label='Identity Proof'
          value={formData.identityProof}
          onChange={(val) => handleChange("identityProof", val)}
        />
        <InputField
          label='Photo URL'
          value={formData.photo}
          onChange={(val) => handleChange("photo", val)}
        />

        {/* ADMISSION */}
        <InputField
          label='Date of Admission'
          type='datepicker'
          value={formData.dateOfAdmission}
          onChange={(val) => handleChange("dateOfAdmission", val)}
        />

        <InputField
          label='Date of Leaving'
          type='datepicker'
          value={formData.dateOfLeaving}
          onChange={(val) => handleChange("dateOfLeaving", val)}
        />

        {/* STATUS */}
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

export default AddStudentRegistration;
