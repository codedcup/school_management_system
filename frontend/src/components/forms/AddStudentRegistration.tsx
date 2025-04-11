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

type Props = {
  open: boolean;
  editData: StudentResponseType | null;
  onClose: () => void;
};

const AddStudentRegistration = ({ open, editData, onClose }: Props) => {
  const [formData, setFormData] = useState({
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
  });

  const { data: classOptions } = useApiQuery<any[]>(
    ["classSubjectAssignments"],
    GET_ALL_CLASS_SUBJECT_ASSIGNMENTS
  );

  const addStudentMutation = useApiMutation(ADD_NEW_STUDENT, "POST", {
    onSuccess: () => handleClose(),
    onError: (err) => console.error("Student registration failed", err),
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        class: editData.class?._id,
      });
    }
  }, [editData]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    setFormData({
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
    });
    onClose();
  };

  const handleSubmit = () => {
    addStudentMutation.mutate(formData);
  };

  return (
    <FormDialog
      size = "xl"
      isOpen={open}
      title='Register New Student'
      subtitle='Fill in the student details'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      {/* BASIC INFO */}
      <InputField
        label='Name'
        value={formData.name}
        onChange={(val) => handleChange("name", val)}
      />
      <InputField
        label='Student ID'
        value={formData.studentId}
        onChange={(val) => handleChange("studentId", val)}
      />
      <InputField
        label='Roll Number'
        value={formData.rollNum}
        onChange={(val) => handleChange("rollNum", val)}
      />
      <InputField
        label='Password'
        type='password'
        value={formData.password}
        onChange={(val) => handleChange("password", val)}
      />
      {/* <InputField
        label='Class'
        type='Select'
        value={formData.class || ""} // ✅ fallback
        onChange={(val) => handleChange("class", val)}
      >
        {classOptions?.map((item) => (
          <Option key={item._id} value={item._id}>
            {item.classId?.class} - {item.sectionId?.section} -{" "}
            {item.subjectId?.subject}
          </Option>
        ))}
      </InputField> */}

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
        type='date'
        value={formData.dateOfAdmission}
        onChange={(val) => handleChange("dateOfAdmission", val)}
      />
      <InputField
        label='Date of Leaving'
        type='date'
        value={formData.dateOfLeaving}
        onChange={(val) => handleChange("dateOfLeaving", val)}
      />

      {/* STATUS */}
      <InputField
        label='Status'
        type='Select'
        value={formData.status || "active"}
        onChange={(val) => handleChange("status", val)}
      >
        <Option value='active'>Active</Option>
        <Option value='inactive'>Inactive</Option>
      </InputField>
    </FormDialog>
  );
};

export default AddStudentRegistration;
