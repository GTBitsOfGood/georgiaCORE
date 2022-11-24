import { withSessionRoute } from "src/utils/lib/session";
import { getAllQuestionTrees } from "server/mongodb/actions/Tree";

// @route   GET api/tree/get-all
// @desc
// @access  Public
const handler = async (req, res) => {
  console.log(process.env);

  try {
    const treesRes = await getAllQuestionTrees();

    await req.session.save();
    return res.status(200).json({
      success: true,
      payload: treesRes.trees,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
