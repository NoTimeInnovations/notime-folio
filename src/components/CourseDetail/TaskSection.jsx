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

const TaskSection = ({ task }) => {
  return (
    <section className="mt-10">
      <H1>
        <GradientText>{task?.taskTitle}</GradientText>
      </H1>
      <P>{task?.taskDesc}</P>

      {/* <H1 className={"mt-5 mb-5 underline"}>
        Problems
      </H1> */}

      <Accordion type="single" className="mt-10" collapsible>
        {task?.problems?.map((prob) => (
          <AccordionItem
            key={prob.problemTitle}
            className="mt-2"
            value={prob.problemTitle}
          >
            <AccordionTrigger status={prob.status}>
              {prob.problemTitle}
            </AccordionTrigger>
            <AccordionContent className="text-white px-1 py-10">
              <H1>{prob.problemTitle}</H1>
              <P className={'mb-5'}>{prob.problemDesc}</P>

              <GradientText className={'font-semibold lg:text-xl'}>
                Demo : <Link href={prob.demo}>{prob.demo}</Link>
              </GradientText>

              <form className="lg:max-w-[50%] mt-5 grid gap-5">
                <Input id={'github'} name={'github'} placeholder={'Enter github repo link'}  />
                <Input id={'hosted'} name={'hosted'} placeholder={'Enter hosted url'}  />
                <Button text={'Submit'} gradient={'bg-gradient-to-r from-green-500 to-yellow-500 max-w-[200px]'} />
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default TaskSection;
