import React from "react";
import H1 from "../common/H1";
import P from "../common/P";
import GradientText from "../common/GradientText";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../common/Accordion";
import Link from "next/link";
import Input from "../common/Input";
import Button from "../home/Button";
import Image from "next/image";

const TaskSection = ({ task }) => {
  console.log(task);

  return (
    <section className="mt-10">
      {/* tasks  */}
      <div>
        <H1>
          <GradientText>{task?.taskTitle}</GradientText>
        </H1>
        <P>{task?.taskDesc}</P>
        <Accordion
          defaultValue={task?.problems?.[0]?.title}
          type="single"
          className="mt-10"
          collapsible
        >
          {task?.problems?.map((prob) => (
            <AccordionItem key={prob.title} className="mt-2" value={prob.title}>
              <AccordionTrigger status={prob.status}>
                {prob.title}
              </AccordionTrigger>
              <AccordionContent className="text-white px-1 py-10">
                <H1>{prob.title}</H1>
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

                <form className="lg:max-w-[50%] mt-5 grid gap-5">
                  <Input
                    id={"github"}
                    name={"github"}
                    placeholder={"Enter github repo link"}
                  />
                  <Input
                    id={"hosted"}
                    name={"hosted"}
                    placeholder={"Enter hosted url"}
                  />
                  <Button
                    text={"Submit"}
                    gradient={
                      "bg-gradient-to-r from-green-500 to-yellow-500 max-w-[200px]"
                    }
                  />
                </form>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </section>
  );
};

export default TaskSection;
