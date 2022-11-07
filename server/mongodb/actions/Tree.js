import mongoDB from "../index";
import Tree from "../models/Tree";
import { getUserFromId } from "server/mongodb/actions/User";

// adds metadata to passed in tree, returns nothing
async function addMetadataModifications(tree, author, changingToInactive) {
  tree.editedOn = new Date();
  if (author != null) {
    tree.author = author; // note: if we add a full name field to User in future, change here
  }

  // if we're making it inactive, update the last date it was active to today
  if (changingToInactive) {
    tree.lastActive = new Date();
  }
}

export const getQuestionTreeById = async (id) => {
  await mongoDB();

  try {
    const tree = await Tree.findById(id);

    if (tree == null) {
      throw new Error("Questions from database null");
    }

    return {
      tree
    };
  } catch (e) {
    throw new Error("Invalid token!", e);
  }
};

export const getActiveQuestionTree = async () => {
  await mongoDB();

  try {
    const tree = await Tree.findOne({ active: true });

    if (tree == null) {
      console.error("active tree from database is null");
    }

    return {
      tree
    };
  } catch (e) {
    throw new Error("Invalid token!", e);
  }
};

export const getAllQuestionTrees = async () => {
  await mongoDB();

  try {
    const trees = await Tree.find({});

    if (trees == null) {
      throw new Error("all question trees from database is null");
    }

    return {
      trees
    };
  } catch (e) {
    throw new Error("Invalid token!", e);
  }
};

export const addQuestionTree = async (tree, username) => {
  await mongoDB();

  try {
    const activeTree = (await getActiveQuestionTree()).tree;
    if (activeTree != null && tree.active) {
      // don't allow multiple trees to be active, user should set first to inactive before
      // setting new one to active.
      return {
        success: false,
      }
    }

    // add metadata to tree
    await addMetadataModifications(tree, username, false);
    await Tree.create(tree);

    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Invalid token!" + e);
  }
};

export const removeQuestionTreeById = async (id) => {
  await mongoDB();

  try {
    await Tree.deleteOne({ _id: id });

    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Invalid token!" + e);
  }
};

export const updateQuestionTree = async (tree, username) => {
  await mongoDB();

  try {

    const activeTree = (await getActiveQuestionTree()).tree;
    if (activeTree != null && tree.active) {
      // don't allow multiple trees to be active, user should set first to inactive before
      // setting new one to active.
      return {
        success: false,
      }
    }

    const curTree = (await getQuestionTreeById(tree._id)).tree;
    const changingToInactive = !tree.active && curTree.active;
    // add metadata to tree
    await addMetadataModifications(tree, username, changingToInactive);
    await Tree.updateOne({ _id: tree._id }, tree, {upsert: true});

    return {
      success: true,
    };
  } catch (e) {
    throw new Error("Invalid token!" + e);
  }
};
