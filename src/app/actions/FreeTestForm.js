import toast from "react-hot-toast";

const isValidEmail = (email) => {
  // Simple email validation regex
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

const isDateInPast = (dateString) => {
  const formDate = new Date(dateString);
  const currentDate = new Date();
  return formDate < currentDate;
};

export const ValidateAndSubmit = (form, setIsFormSubmitted) => {
  const isAnyFieldMissing = !form.name || !form.email || !form.phone || !form.date;
  if (isAnyFieldMissing) {
    return toast.error("All fields are required");
  }

  if (!isValidEmail(form.email)) {
    return toast.error("Invalid email address");
  }

  if (form.phone.length !== 10) {
    return toast.error("Invalid phone number");
  }

  // Check if form.date is in the past
  if (isDateInPast(form.date)) {
    return toast.error("Date cannot be in the past");
  }

  // If all validations pass, submit the form
  toast.promise(
    SubmitForm(form, setIsFormSubmitted),
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

const SubmitForm = async (form, setIsFormSubmitted) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiBase = process.env.NEXT_PUBLIC_AIRTABLE_BASE;
  const apiTable = process.env.NEXT_PUBLIC_TEST_FORM_AIRTABLE_TABLE;
  const apiToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN;

  const response = await fetch(`${apiUrl}/${apiBase}/${apiTable}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify({
      fields: {
        Name: form.name,
        Email: form.email,
        Phone: form.phone,
        Date: form.date,
      },
    }),
  });

  const json = await response.json();

  if (json.error) {
    return Promise.reject(json.error);
  } else {
    setIsFormSubmitted(true);
  }
};