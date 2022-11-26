import { withSessionRoute } from "src/utils/lib/session";
import {
  deleteAuthUser,
  insertAuthUser,
  updateAuthUser,
  getAuthUsers,
} from "server/mongodb/actions/AuthUser";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

// @route   POST/DELETE/PATCH/GET api/authUser
// @desc    Insert/Delete/Update/Get authUser(s) into/from database
// @access  Public
const handler = async (req, res) => {
  // All authUser apis should be protected so that only users who are logged in
  // and Administrator role can access, [...nextauth].js is on backend so it can bypass
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    // Not Signed in
    res.status(401).json({
      success: false,
      message: "user is not an authenticated user",
    });
  } else {
    const newAuthUsers = await getAuthUsers();
    const user = newAuthUsers.authUsers.find(
      (u) => u.email == session.user.email
    );
    if (user.role != "Administrator") {
      // Not an Administrator role
      res.status(401).json({
        success: false,
        message: "user is not an authenticated user",
      });
    } else {
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
    }
  }
};

export default withSessionRoute(handler);
