import React, { useEffect, useState } from "react";
import CountCard from "./CountCard";
import { client } from "@/utils/sanity/client";

const CountsSection = () => {
  const [counts, setCounts] = useState();

  useEffect(() => {
    const query = `*[_type == 'odometer']{
      name,
      value
    }`;

    client.fetch(query).then((res) => {
      setCounts(res);
    });
  }, []);

  return (
    <div className="w-full border-[0.5px] border-[#242b34] bg-[#151b24] p-10 rounded-xl grid grid-cols-2 lg:grid-cols-4 gap-x-5  gap-y-10 mb-20 lg:mt-56 ">
      {counts?.map((count, index) => (
        <CountCard key={index} value={count.value} text={count.name} />
      ))}
    </div>
  );
};

export default CountsSection;
