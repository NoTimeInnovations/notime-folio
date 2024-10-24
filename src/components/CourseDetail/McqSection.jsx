"use client";
import React, { useEffect, useState } from "react";
import H1 from "../common/H1";
import GradientText from "../common/GradientText";
import P from "../common/P";
import Button from "../home/Button";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const McqSection = ({ mcqs, taskId, completedMCQ, setMCQCompleted }) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [isSelected, setIsSelected] = useState({});
  const [correctOptions, setCorrectOptions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleOptionClick = (quesIndex, opIndex) => {
    setSelectedOption((prev) => {
      const newSelectedOption = [...prev];
      newSelectedOption[quesIndex] = opIndex;
      return newSelectedOption;
    });
    setIsSelected((prev) => ({
      ...prev,
      [quesIndex]: opIndex,
    }));
  };

  const handleGetPoints = () => {
    const correctAnswers = mcqs.map((mcq) => mcq.answer);
    setCorrectOptions(correctAnswers);

    const totalPoints = mcqs.reduce((acc, mcq) => acc + mcq.point, 0);
    const points = selectedOption.reduce((acc, selected, index) => {
      if (selected === correctAnswers[index]) {
        return acc + mcqs[index].point;
      }
      return acc;
    }, 0);

    return {
      totalPoints,
      points,
    };
  };

  const isValidAnswers = () => {
    const numOfQuestions = mcqs.length;
    const optionsSelected = selectedOption.length;

    if (numOfQuestions !== optionsSelected) {
      toast.error("Please answer all questions");
      return false;
    }

    return true;
  };

  const handleMCQSubmit = async () => {
    if (!isValidAnswers) return;
    const { totalPoints, points } = handleGetPoints();

    toast.loading("Submitting MCQ's");
    setLoading(true);

    try {
      const authToken = Cookies.get("auth_token");
      const user = JSON.parse(Cookies.get("user"));

      const selectedOptionsData = selectedOption.map((selected) => ({
        value: selected,
      }));

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/mcq-submissions`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            student_id: user.id,
            task_id: taskId,
            option_selected: selectedOptionsData,
          }),
        }
      );

      toast.dismiss();
      setLoading(false);
      const result = await response.json();

      console.log("MCQ's submitted: ", result);

      if (result?.errors?.length > 0) {
        toast.error(result?.errors[0]?.message);
      } else {
        toast.success("MCQ's submitted successfully");
        toast.success(`You scored ${points} out of ${totalPoints}`);
        setMCQCompleted(result?.doc);
      }
    } catch (error) {
      toast.dismiss();
      setLoading(false);
      toast.error("Error submitting MCQ's");
      console.error("Error submitting MCQ's: ", error);
    }
  };

  useEffect(() => {
    if (completedMCQ) {
      const userOptions = completedMCQ?.option_selected.map(
        (option ) => option.value
      );
      setIsSelected(userOptions);
      const correctAnswers = mcqs.map((mcq) => mcq.answer);
      setCorrectOptions(correctAnswers);
    }
  }, [completedMCQ]);

  return (
    <section className="mt-10">
      {mcqs?.length > 0 && (
        <div className="mt-10">
          <H1>
            <GradientText>MCQ's</GradientText>
          </H1>
          <div>
            {mcqs?.map((mcq, index) => (
              <div key={mcq.question} className="mt-5">
                <P className={"flex items-center gap-1"}>
                  <span>{index + 1}.</span>
                  <span>{mcq.question}</span>
                </P>
                <div className="grid gap-5 mt-3">
                  {mcq.options.map((option, opIndex) => {
                    const isSelectedOption = isSelected[index] === opIndex;
                    const isCorrectOption = correctOptions[index] === opIndex;

                    let bgClass = "";
                    if (correctOptions.length > 0) {
                      bgClass = isCorrectOption
                        ? isSelectedOption
                          ? "from-yellow-500"
                          : "from-green-500"
                        : isSelectedOption
                          ? "from-red-500"
                          : "";
                    } else if (isSelectedOption) {
                      bgClass = "from-green-500 to-yellow-500";
                    }

                    return (
                      <div
                        onClick={
                          correctOptions.length > 0
                            ? () => {}
                            : () => handleOptionClick(index, opIndex)
                        }
                        key={option.id}
                        className={`flex items-center gap-3 bg-white/10 py-3 px-5 rounded hover:bg-white/20 cursor-pointer bg-gradient-to-r ${bgClass}`}
                      >
                        <P className={isSelectedOption ? "text-white" : ""}>
                          {option.option}
                        </P>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          {!completedMCQ && (
            <Button
              disabled={isLoading}
              onClick={handleMCQSubmit}
              text={"Submit"}
              gradient={
                "bg-gradient-to-r from-green-500 to-yellow-500 text-white mt-5 max-w-[200px]"
              }
            />
          )}
        </div>
      )}
    </section>
  );
};

export default McqSection;
