import toast from "react-hot-toast";

const isValidEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const ValidateAndSubmit = (
  form,
  setIsFormSubmitted
) => {
  const isAnyFieldMissing =
    !form.name || !form.email || !form.phone ;
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
    SubmitForm(form, setIsFormSubmitted)
      .then(() => {
        setIsFormSubmitted(true);
      }),
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

const SubmitForm = async (form) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiBase = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
  const apiTable = process.env.NEXT_PUBLIC_ENROLLMENT_FORM_AIRTABLE_TABLE;
  const apiToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  const response = await fetch(`${apiUrl}/${apiBase}/${apiTable}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      fields: {
        full_name: form.name,
        email: form.email,
        phone: `+91${form.phone}`,
        referral_code: form.referral_code,
      },
    }),
  });

  const json = await response.json();

  if (json.error) {
    return Promise.reject(json.error);
  }
};
