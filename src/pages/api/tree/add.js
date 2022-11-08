import { withSessionRoute } from "src/utils/lib/session";
import { addQuestionTree } from "server/mongodb/actions/Tree";

// @route   POST api/tree/add
// @desc
// @access  Public
const handler = async (req, res) => {
  try {
    await addQuestionTree(req.body.tree, req.body.username);

    await req.session.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
