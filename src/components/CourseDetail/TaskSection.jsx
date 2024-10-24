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

const TaskSection = ({ task }) => {
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

    console.log("postUrl: ", ApiUrl);
    

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
                  <H1 className={"capitalize"}>{prob.title}</H1>
                  <P className={"mb-5"}>sdfsdf</P>

                  {prob?.image && (
                    <GradientText className={"font-semibold lg:text-xl"}>
                      Demo :
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
                      onChange={
                        isSubmitted?.status !== "rejected"
                          ? () => {}
                          : handleInputChange
                      }
                      readOnly={
                        isSubmitted?.status !== "rejected" ? true : false
                      }
                      value={
                        isSubmitted?.status !== "rejected"
                          ? isSubmitted?.github_link
                          : form.githubRepo
                      }
                      id={"github"}
                      name={"githubRepo"}
                      placeholder={"Enter github repo link"}
                    />
                    <Input
                      onChange={
                        isSubmitted?.status !== "rejected"
                          ? () => {}
                          : handleInputChange
                      }
                      readOnly={
                        isSubmitted?.status !== "rejected" ? true : false
                      }
                      value={
                        isSubmitted?.status !== "rejected"
                          ? isSubmitted?.live_link
                          : form.hostedUrl
                      }
                      id={"hosted"}
                      name={"hostedUrl"}
                      placeholder={"Enter hosted url"}
                    />
                    {(isSubmitted?.status === "rejected" || !isSubmitted) && (
                      <Button
                        disabled={isBtnLoading ? isBtnLoading[prob.id] : false}
                        onClick={() =>
                          handleProblemSubmission(prob.id, isSubmitted)
                        }
                        text={"Submit"}
                        gradient={
                          "bg-gradient-to-r from-green-500 to-yellow-500 max-w-[200px]"
                        }
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
