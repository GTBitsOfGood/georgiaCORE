import mongoDB from "../index";
import AuthUser from "../models/AuthUser";

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