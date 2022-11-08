import { withSessionRoute } from "src/utils/lib/session";
import { getActiveQuestionTree } from "server/mongodb/actions/Tree";

// @route   GET api/tree/get-active
// @desc
// @access  Public
const handler = async (req, res) => {
  try {
    const treeRes = await getActiveQuestionTree();

    await req.session.save();
    return res.status(200).json({
      success: true,
      payload: treeRes.tree,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
