import { withSessionRoute } from "src/utils/lib/session";
import { removeQuestionTreeById } from "server/mongodb/actions/Tree";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// @route   POST api/tree/remove-by-id
// @desc
// @access  Public
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    // Not Signed in
    res.status(401).json({
      success: false,
      message: "user is not an authenticated user",
    });
  } else {
    try {
      await removeQuestionTreeById(req.body.id);

      await req.session.save();
      return res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Error occurred while processing request.",
      });
    }
  }
};

export default withSessionRoute(handler);
