import React from "react";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  if (coursePart.name === "Fundamentals") {
    return (
      <>
        <h2>{coursePart.name}</h2>
        <div>
          <p>Number of exercises {coursePart.exerciseCount}</p>
          <p> {coursePart.description}</p>
        </div>
      </>
    );
  } else if (coursePart.name === "Using props to pass data") {
    return (
      <>
        <h2> {coursePart.name}</h2>
        <div>
          <p>Number of exercises {coursePart.exerciseCount}</p>
          <p>Number of group projects {coursePart.groupProjectCount}</p>
        </div>
      </>
    );
  } else if (coursePart.name === "Deeper type usage") {
    return (
      <>
        <h2>{coursePart.name}</h2>
        <div>
          <p>Number of exercises {coursePart.exerciseCount}</p>
          <p>{coursePart.description}</p>
          <p>Exercise submission link {coursePart.exerciseSubmissionLink}</p>
        </div>
      </>
    );
  } else if (coursePart.name === "Own course") {
    return (
      <>
        <h2>{coursePart.name}</h2>
        <div>
          <p> Number of exercise {coursePart.exerciseCount}</p>
          <p> {coursePart.description}</p>
          <p>Special {coursePart.notation}</p>
        </div>
      </>
    );
  }
  return null;
};

export default Part;
