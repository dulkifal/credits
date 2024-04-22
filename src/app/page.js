"use client";

import { useState } from "react";
import data from "../../public/data.json";
import Select from "react-select";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState();
  console.log(data);
  // teachers
  let teacher = [];

  data.forEach((item) => {
    if (!teacher.includes(item.teacher)) {
      teacher.push(item.teacher);
    }
  });
  const teacherList = teacher.map((item) => ({
    value: item,
    label: item,
  }));
  console.log(teacher);

  // filter function
  function filterData(data, searchTerm) {
    
    // remove dublicate obj
   return [...new Set(data)].filter((item) => item.teacher.includes(searchTerm));

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* filter */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Select Your Name</h1>
      </div>
      <Select
        options={teacherList}
        className="w-full"
        placeholder="Select a teacher"
        onChange={(e) => {
          console.log(e.value);
          // search
          setSearchTerm(e.value);
        }}
      />

      <table
        className="
     w-full
     text-sm text-left text-gray-500 dark:text-gray-400
     "
      >
        <thead
          className="
      text-xs text-gray-700 uppercase "
        >
          <tr
            className="
        "
          >
            <th className="border p-2 text-center">class</th>
            <th className="border p-2 text-center">teacher</th>
            <th className="border p-2 text-center">subject</th>
            <th className="border p-2 text-center">credit</th>
            <th className="border p-2 text-center">period</th>
          </tr>
        </thead>
        <tbody
          className="
     
      "
        >
          {/* {data.map((item) => (
          <tr key={item.class}>
            <td>{item.class}</td>
            <td>{item.teacher}</td>
            <td>{item.sub}</td>
            <td>{item.credit}</td>
            <td>{item.period}</td>
          </tr>
        )
        )} */}
          {/* display filtered data only */}

          {filterData(data, searchTerm).map((item, index) => (
            // remove dublicate obj
            
            <tr key={index}>
              <td className="border p-2 text-center">{item.class}</td>
              <td className="border p-2 text-center">{item.teacher}</td>
              <td className="border p-2 text-center"> {item.sub}</td>
              <td className="border p-2 text-center">{item.credit}</td>
              <td className="border p-2 text-center">{item.period}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
