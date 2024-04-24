"use client";

import { useState } from "react";
import data from "../../public/data.json";
import Select from "react-select";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState();

  let teacher = [];

  data.forEach((item) => {
    if (!teacher.includes(item.teacher)) {
      teacher.push(item.teacher);
    }
  });

  const teachers = {};

  for (const item of data) {
    const teacherName = item.teacher;
    if (!teachers[teacherName]) {
      teachers[teacherName] = [];
    }
    teachers[teacherName].push(item);
  }
  console.log(teachers);

  const teacherList = teacher.map((item) => ({
    value: item,
    label: item + " Usthad",
  }));

  // filter function
  function filterData(data, searchTerm) {
    // remove dublicate obj
    return [...new Set(data)].filter((item) =>
      item.teacher.includes(searchTerm)
    );
  }
  // total ceridts
  const totalCredits = filterData([...new Set(data)], searchTerm).reduce(
    (acc, item) => acc + item.credit,
    0
  );
  // total periods
  const totalPeriods = filterData([...new Set(data)], searchTerm).reduce(
    (acc, item) => acc + item.period,
    0
  );
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
          <tr>
            <th className="border p-2 text-center">No</th>
            <th className="border p-2 text-center">class</th>
            <th className="border p-2 text-center">teacher</th>
            <th className="border p-2 text-center">subject</th>
            <th className="border p-2 text-center">credits</th>
            <th className="border p-2 text-center">period</th>
          </tr>
        </thead>
        <tbody
          className="
     
      "
        >
          {/* display filtered data only */}

          {filterData(data, searchTerm).map((item, index) =>
           (
              // remove dublicate obj

              <tr key={index}>

                <td className="border p-2 text-center">{index +1}</td>
                <td className="border p-2 text-center">{item.class}</td>
                <td className="border p-2 text-center">{item.teacher}</td>
                <td className="border p-2 text-center"> {item.sub}</td>
                <td className="border p-2 text-center">{item.credit}</td>
                <td className="border p-2 text-center">{item.period}</td>
              </tr>
            ) 
            
          )}
          <tr>
            <td className="border p-2 text-center ">{}</td>
            <td className="border p-2 text-center ">{}</td>
            <td className="border p-2 text-center ">{}</td>
            <td className="border p-2 text-center ">Total</td>
            <td className="border p-2 text-center ">{totalCredits}</td>
            <td className="border p-2 text-center ">{totalPeriods}</td>
          </tr>
        </tbody>
      </table>
      {/* loop through teachers and make table */}
      <div className="h-50">
        <h1 className="text-4xl font-bold"> Total Teachers</h1>
      </div>

      {Object.entries(teachers).map(([teacherName]) => (
        <table
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4" >
          <thead>
            <tr >
            <th className="border p-2 text-center">No</th>
              <th className="border p-2 text-center">Teacher</th>
              <th className="border p-2 text-center">Class</th>
              <th className="border p-2 text-center">Subject</th>
              <th className="border p-2 text-center">Credit</th>
              <th className="border p-2 text-center">Period</th>
            </tr>
          </thead>
          <tbody>
            {teachers[teacherName].map((item,index) => (
              <tr key={index}>
                <td className="border p-2 text-center ">{index}</td>
                <td className="border p-2 text-center ">{item.class}</td>
                <td className="border p-2 text-center ">{item.teacher} </td>
                <td className="border p-2 text-center ">{item.sub}</td>
                <td className="border p-2 text-center ">{item.credit}</td>
                <td className="border p-2 text-center ">{item.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </main>
  );
}
