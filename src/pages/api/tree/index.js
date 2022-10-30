// import { withSessionRoute } from "src/utils/lib/session";
// import { getAllQuestions, setQuestions } from "server/mongodb/actions/Question";

// // @route   GET/POST api/question
// // @desc    Get/set all questions from database
// // @access  Public
// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     // Set all questions
//     try {
//       await setQuestions(req.body);

//       await req.session.save();
//       return res.status(200).json({
//         success: true,
//       });
//     } catch (error) {
//       res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   } else if (req.method === "GET") {
//     // Get all questions
//     try {
//       const questions = await getAllQuestions();

//       await req.session.save();
//       return res.status(200).json({
//         success: true,
//         payload: questions.questions,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }
// };

// export default withSessionRoute(handler);
