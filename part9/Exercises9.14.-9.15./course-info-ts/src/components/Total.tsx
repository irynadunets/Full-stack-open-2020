import React from "react";
import { CoursePart } from "../types";

interface TotalProps {
  courseParts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {
  const total = courseParts.reduce((total, part) => {
    return total + part.exerciseCount
}, 0)
  return (
      <h2>Number of exercises {total}</h2>
  )
}

export default Total;
