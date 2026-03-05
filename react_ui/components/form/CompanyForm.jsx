import { useState, useEffect } from "react";
import Modal from "../Modal";
import Close from "../Close";
import InputText from "./InputText";
import Button from "../Button";
import MessageBox from "../MessageBox";
import Loading from "../ShowLoadingBox";
import CheckBox from "../form/InputCheckbox";

const emptyCompany = {
  name: "",
  code: "",
  address: "",
  email: "",
  active: false,
};

const CompanyForm = ({
  open,
  onClose,
  mode = "add",
  initialValue = emptyCompany,
  onSubmit,
  loadingState = "idle",
  formResponse = { success: false, message: "" },
}) => {
  const [formData, setFormData] = useState(emptyCompany);
  
  useEffect(() => {
    if (open) {
      setFormData({ ...emptyCompany, ...initialValue });
    }
  }, [open, initialValue]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const disableForm = formResponse.success;

  const title = mode === "edit" ? "Update Company" : "Add Company";
  return (
    <Modal open={open} onClose={onClose} variant="medium">
      {loadingState === "submitting" && (
        <Loading message="Submitting form"></Loading>
      )}
      <div className="gap-2 flex flex-col justify-between">
        <div className="flex items-center flex-row justify-between">
          <div className="font-bold">{title}</div>
          <Close onClick={onClose}></Close>
        </div>
        {/* Info box */}

        {formResponse.message && (
          <MessageBox type={formResponse.success ? "success" : "error"}>
            {formResponse.message}
          </MessageBox>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <InputText
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disable={disableForm}
            isRequired
          ></InputText>
          <InputText
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            disable={disableForm}
            isRequired
          ></InputText>
          <InputText
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disable={disableForm}
          ></InputText>
          <InputText
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disable={disableForm}
            isRequired
          ></InputText>
          <CheckBox
            label="Active"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            isRequired
          ></CheckBox>
          <Button variant="primary" className="mt-2" disabled={disableForm}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CompanyForm;
