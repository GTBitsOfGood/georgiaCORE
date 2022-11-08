import { withSessionRoute } from "src/utils/lib/session";
import { removeQuestionTreeById } from "server/mongodb/actions/Tree";

// @route   POST api/tree/remove-by-id
// @desc
// @access  Public
const handler = async (req, res) => {
  try {
    await removeQuestionTreeById(req.body.id);

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
