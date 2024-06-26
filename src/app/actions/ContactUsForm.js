import toast from "react-hot-toast";

const isValidEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const validateForm = (form,setIsFormSubmitted) => {
  const isAnyFieldMissing =
    !form.name || !form.email || !form.phone || !form.reason || !form.message;

  if (isAnyFieldMissing) {
    return toast.error("All fields are required");
  }

  if (!isValidEmail(form.email)) {
    return toast.error("Invalid email address");
  }

  if (form.phone.length !== 10) {
    return toast.error("Invalid phone number");
  }

  // If all validations pass, submit the form

  toast.promise(
    submitForm(form,setIsFormSubmitted),
    {
      loading: "Submitting form...",
      success: "Form submitted successfully",
      error: "Failed to submit form",
    },
    {
      style: {
        minWidth: "250px",
      },
    }
  );
};

const submitForm = async (form, setIsFormSubmitted) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiBase = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
  const apiTable = process.env.NEXT_PUBLIC_CONTACT_FORM_AIRTABLE_TABLE;
  const apiToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;
  

  const response = await fetch(`${apiUrl}/${apiBase}/${apiTable}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      fields: {
        name: form.name,
        email: form.email,
        reason: form.reason,
        phone: `+91${form.phone}`,
        message: form.message,
        communication_preference:form.communication_method
      },
    }),
  });

  const json = await response.json();

  if (json.error) {
    return Promise.reject(json.error);
  }else{
    setIsFormSubmitted(true);
  }
  
};
