import { withSessionRoute } from "src/utils/lib/session";
import { getActiveQuestionTree } from "server/mongodb/actions/Tree";

// @route   GET api/tree/get-active
// @desc    Unprotected, anyone can access
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
      message: 'Error occurred while processing request.',
    });
  }
};

export default withSessionRoute(handler);
