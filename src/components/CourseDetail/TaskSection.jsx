"use client";
import React, { use, useEffect, useState } from "react";
import H1 from "../common/H1";
import P from "../common/P";
import GradientText from "../common/GradientText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/Accordion";
import Input from "../common/Input";
import Button from "../home/Button";
import Image from "next/image";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
// import { RichTextLexicalRenderer } from "@webiny/react-rich-text-lexical-renderer";

const TaskSection = ({ task, courseInfo }) => {
  const [problemSubmissions, setProblemSubmissions] = useState();
  const [isBtnLoading, setIsBtnLoading] = useState();
  const [form, setForm] = useState({
    githubRepo: "",
    hostedUrl: "",
  });
  const [firstNonSubmittedProblem, setFirstNonSubmittedProblem] = useState();

  const fetchProblemSubmission = async () => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/problem-submissions?task_id=${task.id}&user_id=${user.id}&depth=1`
      );
      const result = await response.json();
      if (result?.errors?.length > 0) {
        console.error(result?.errors[0]?.message);
      } else {
        console.log("Problem submissions: ", result?.docs);

        setProblemSubmissions(result?.docs);
      }
    } catch (error) {
      console.error("Error fetching problem submissions: ", error);
    }
  };

  const handleNextTopicUnlock = async () => {
    const user = JSON.parse(Cookies.get("user"));
    const authToken = Cookies.get("auth_token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            courses_unlocked: {
              course_id: courseInfo?.courseId,
              roadmap_id: courseInfo?.roadmapId,
              topic_id: courseInfo?.topicId,
            },
          }),
        }
      );

      const result = await response.json();

      if (result?.errors?.length > 0) {
        console.error(result?.errors[0]?.message);
      } else {
        console.log("Next topic unlocked successfully");
      }
    } catch (error) {
      console.error("Error unlocking next topic: ", error);
    }
  };

  const handleProblemSubmission = async (probId, isSubmitted) => {
    setIsBtnLoading((prev) => ({ ...prev, [probId]: true }));
    toast.loading("Submitting your solution");
    const user = JSON.parse(Cookies.get("user"));
    const authToken = Cookies.get("auth_token");

    if (form.githubRepo === "") {
      toast.dismiss();
      toast.error("github rep link is required");
      setIsBtnLoading((prev) => ({ ...prev, [probId]: false }));
      return;
    }

    let method = "POST";
    let ApiUrl = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/problem-submissions`;

    if (isSubmitted?.status === "rejected") {
      method = "PATCH";
      ApiUrl = ApiUrl + `/${isSubmitted?.id}`;
    }

    try {
      const response = await fetch(ApiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          user_id: user?.id,
          problem_id: probId,
          problem_name: task?.problems?.find((prob) => prob.id === probId)
            ?.title,
          task_id: task?.id,
          github_link: form.githubRepo,
          live_link: form.hostedUrl,
          status: "submitted",
        }),
      });
      setIsBtnLoading((prev) => ({ ...prev, [probId]: false }));
      toast.dismiss();
      const result = await response.json();

      if (result?.errors?.length > 0) {
        toast.error(result?.errors[0]?.message);
      } else {
        toast.success("Solution submitted successfully");
        fetchProblemSubmission();
        handleNextTopicUnlock();
      }
    } catch (error) {
      toast.dismiss();
      setIsBtnLoading((prev) => ({ ...prev, [probId]: false }));
      console.error("Error submitting problem: ", error);
      toast.error("Error submitting problem");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchProblemSubmission();
  }, []);

  useEffect(() => {
    const firstNonSubmitted = task?.problems?.find(
      (prob) =>
        !problemSubmissions?.some((p) => p.problem_id === prob.id) || false
    );
    setFirstNonSubmittedProblem(firstNonSubmitted);
  }, [problemSubmissions, task]);

  return (
    <section className="mt-10">
      {/* tasks  */}
      <div>
        <H1>
          <GradientText>{task?.taskTitle}</GradientText>
        </H1>
        <P>{task?.taskDesc}</P>
        <Accordion
          defaultValue={firstNonSubmittedProblem?.title}
          type="single"
          className="mt-10"
          collapsible
        >
          {task?.problems?.map((prob) => {
            const isSubmitted =
              problemSubmissions?.find((p) => p.problem_id === prob.id) ||
              false;

            console.log(isSubmitted);

            const isEditable =
              !isSubmitted || isSubmitted.status === "rejected";

            return (
              <AccordionItem
                key={prob.title}
                className="mt-2"
                value={prob.title}
              >
                <AccordionTrigger status={isSubmitted?.status}>
                  {prob.title}
                </AccordionTrigger>
                <AccordionContent className="text-white px-1 py-10">
                  <H1 className="capitalize">{prob.title}</H1>
                  <P className="mb-5">
                    {/* <RichTextLexicalRenderer value={prob.question} /> */}
                  </P>

                  {prob?.image && (
                    <GradientText className="font-semibold lg:text-xl">
                      Demo:
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_PAYLOAD_URL + prob?.image?.url
                        }
                        alt={prob.title}
                        width={300}
                        height={300}
                      />
                    </GradientText>
                  )}

                  <div className="lg:max-w-[50%] mt-5 grid gap-5">
                    <Input
                      onChange={isEditable ? handleInputChange : () => {}}
                      readOnly={!isEditable}
                      value={
                        isEditable ? form.githubRepo : isSubmitted?.github_link
                      }
                      id="github"
                      name="githubRepo"
                      placeholder="Enter GitHub repo link"
                    />
                    <Input
                      onChange={isEditable ? handleInputChange : () => {}}
                      readOnly={!isEditable}
                      value={
                        isEditable ? form.hostedUrl : isSubmitted?.live_link
                      }
                      id="hosted"
                      name="hostedUrl"
                      placeholder="Enter hosted URL"
                    />
                    {isEditable && (
                      <Button
                        disabled={isBtnLoading ? isBtnLoading[prob.id] : false}
                        onClick={() =>
                          handleProblemSubmission(prob.id, isSubmitted)
                        }
                        text="Submit"
                        gradient="bg-gradient-to-r from-green-500 to-yellow-500 max-w-[200px]"
                      />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
};

export default TaskSection;
