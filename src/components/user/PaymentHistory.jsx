import { useState } from "react";

const PaymentHistory = ({ userData }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  return (<>
    <section className="mt-10 items-center">
      <h2
        className="flex items-center text-3xl font-semibold cursor-pointer"
        onClick={toggleAccordion}
      >
        Payment History
        <svg
          className={`h-8 w-8 text-red-500  ml-2 transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </h2>
      <div
        className={`mt-4 space-y-3 overflow-hidden transition-all duration-300 ${isAccordionOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        {userData.paymentHistory.map((payment, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-800 p-4 rounded"
          >
            <span>{payment.course}</span>
            <span>{payment.amount}</span>
            <span>{payment.date}</span>
          </div>
        ))}
      </div>
    </section>
  </>)
}

export default PaymentHistory;