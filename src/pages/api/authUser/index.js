import { withSessionRoute } from "src/utils/lib/session";
import { deleteAuthUser, insertAuthUser, updateAuthUser, getAuthUsers } from "server/mongodb/actions/AuthUser";

// @route   POST/DELETE/PATCH/GET api/authUser
// @desc    Insert/Delete/Update/Get authUser(s) into/from database
// @access  Public
const handler = async (req, res) => {
  if (req.method === "POST") {
    // Insert authUser
    try {
      await insertAuthUser(req.body);
      
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
  } else if (req.method === "DELETE") {
    //Delete authUser
    try {
      await deleteAuthUser(req.body);

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
  } else if (req.method === "PATCH") {
    //Update authUser
    try {
      await updateAuthUser(req.body.first, req.body.second);

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
  } else if (req.method === "GET") {
    // Get authUsers
    try {
      const authUsers = await getAuthUsers();

      await req.session.save();
      return res.status(200).json({
        success: true,
        payload: authUsers.authUsers,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export default withSessionRoute(handler);