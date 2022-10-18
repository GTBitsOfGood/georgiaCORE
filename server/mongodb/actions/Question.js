import mongoDB from "../index";
import Question from "../models/Question";

export const getAllQuestions = async () => {
  await mongoDB();

  try {
    const questions = await Question.find({});

    if (questions == null) {
      throw new Error("Questions from database null");
    }

    return {
      questions,
    };
  } catch (e) {
    throw new Error("Invalid token!", e);
  }
};

export const setQuestions = async (questions) => {
  await mongoDB();

  try {
    await Question.deleteMany({});
    await Question.create(questions);

    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Invalid token!" + e);
  }
};
