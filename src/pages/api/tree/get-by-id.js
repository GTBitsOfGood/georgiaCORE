import { withSessionRoute } from "src/utils/lib/session";
import { getQuestionTreeById } from "server/mongodb/actions/Tree";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// @route   GET api/tree/get-by-id
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
      const treeRes = await getQuestionTreeById(req.query.id);

      await req.session.save();
      return res.status(200).json({
        success: true,
        payload: treeRes.tree,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error occurred while processing request.",
      });
    }
  }
};

export default withSessionRoute(handler);
