"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/utils/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-none", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(
  ({ className, status, children, ...props }, ref) => {
    let statusStyle = "";
    if (status == "submitted") {
      statusStyle =
        "text-yellow-300 data-[state=open]:text-white data-[state=open]:font-semibold data-[state=open]:bg-gradient-to-r from-yellow-900";
    } else if (status == "approved") {
      statusStyle =
        "text-green-300 data-[state=open]:text-white data-[state=open]:font-semibold data-[state=open]:bg-gradient-to-r from-green-900";
    } else if (status == "rejected") {
      statusStyle =
        "text-red-300 data-[state=open]:text-white data-[state=open]:font-semibold data-[state=open]:bg-gradient-to-r from-red-900";
    } else {
      statusStyle =
        "text-white data-[state=open]:font-semibold data-[state=open]:bg-gradient-to-r from-green-500 to-yellow-500";
    }
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            `flex flex-1 items-center justify-between capitalize py-4  px-3  ${statusStyle}  bg-white/10 rounded text-xl  [&[data-state=open]>svg]:rotate-180`,
            className
          )}
          {...props}
        >
          {children}
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm  transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
