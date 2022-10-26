import mongoDB from "../index";
import AuthUser from "../models/AuthUser";

//Function to get all authUsers from database
export const getAuthUsers = async () => {
    await mongoDB();
  
    try {
      const authUsers = await AuthUser.find({});
  
      if (authUsers == null) {
        throw new Error("AuthUsers from database null");
      }
      return {
        authUsers
        
      };
    } catch (e) {
      throw new Error("Invalid token!", e);
    }
  };

//Function to insert a new authUser into database
export const insertAuthUser = async (authUser) => {
    await mongoDB();
  
    try {
      await AuthUser.create(authUser);
  
      return {
        success: true,
      };
    } catch (e) {
      throw new Error("Invalid token!" + e);
    }
};

//Function to delete an authUser from database
export const deleteAuthUser = async (authUser) => {
    await mongoDB();

    try {
        await AuthUser.deleteOne(authUser);

        return {
            success: true,
        };
    } catch (e) {
        throw new Error("Invalid token!" + e);
    }
};

//Function to update an authUser corresponding to given email with new information
export const updateAuthUser = async (oldAuthUserEmail, newAuthUser) => {
    await mongoDB();

    try {
        await AuthUser.findOneAndUpdate({email: oldAuthUserEmail}, newAuthUser, {new: true});

        return {
            success: true,
        };
    } catch (e) {
        throw new Error("Invalid token!" + e);
    }
};