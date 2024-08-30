import dummyData, { DataProp } from "@/dummy-data";
import Image from "next/image";
import React from "react";

export const AllProjects = () => {
  return (
    <div>
      <ul className="grid grid-cols-7">
        <li>Name</li>
        <li>Price</li>
        <li>TMV</li>
        <li>GDP</li>
        <li>Dept</li>
        <li>Listings/mon</li>
        <li>Balance</li>
      </ul>
      <ul className="grid gap-5">
          {dummyData.map((data: DataProp) => {
            return (
              <li key={data.id} className="flex gap-2 text-secondary">
                {/* <Image src={data.image} alt="image" height={28} width={28} /> */}
                <div className="w-[28px] h-[28px] bg-green-300 rounded-full"></div>
                <p>{data.name}</p>
                <p className="bg-input bg-opacity-25 rounded-3xl px-3 text-xs text-primary-foreground py-1 h-fit">{data.nameTag}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
