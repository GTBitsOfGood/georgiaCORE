import QuestionTemplate from "src/components/QuestionTemplate/QuestionTemplate";
import React from "react";

const NavigatorPage = () => {
  return (
    <QuestionTemplate
      question="How are you doing?"
      options={[
        {
          answer: "Great",
          image: "",
        },
        {
          answer: "Bad",
          image: "",
        },
      ]}
    ></QuestionTemplate>
  );
};

export default NavigatorPage;
