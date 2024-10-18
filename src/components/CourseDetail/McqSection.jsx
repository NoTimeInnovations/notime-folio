import React from "react";
import H1 from "../common/H1";
import GradientText from "../common/GradientText";
import P from "../common/P";
import Button from "../home/Button";

const McqSection = ({ mcqs }) => {
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
                  {mcq.options.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center gap-3 bg-white/10 py-3 px-5 rounded hover:bg-white/20 cursor-pointer"
                    >
                      <P>{option.option}</P>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            text={"Submit"}
            gradient={
              "bg-gradient-to-r from-green-500 to-yellow-500 text-white mt-5 max-w-[200px]"
            }
          />
        </div>
      )}
    </section>
  );
};

export default McqSection;
