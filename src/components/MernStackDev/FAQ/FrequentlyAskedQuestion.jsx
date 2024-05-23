import React, { useEffect, useState } from "react";
import { client } from "../../../utils/sanity/client";
import QuestionItem from "./QuestionItem";

const FrequentlyAskedQuestion = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response =
        await client.fetch(`*[_type == 'frequently_asked_question']{
                question,
                answer
              }`);

      setQuestions(response);
    };

    fetchQuestions();
  });

  return (
    <div className="max-w-6xl grid gap-10 lg:gap-20 mt-10">
      {/* heading  */}
      <h1 className="text-[2rem] lg:text-[3rem] font-bold md:text-center leading-[3rem]">
        Frequently Asked Questions
      </h1>

      {/* questions  */}
      <div className="grid gap-5 ">
        {questions?.map((question, index) => (
          <QuestionItem question={question} key={`question_${index}`} />
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
