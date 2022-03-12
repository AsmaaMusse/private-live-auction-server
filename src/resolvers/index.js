const getSingleUser = require("./getSingleUser");
const addUser = require("./addUser");
const login = require("./login");
const addListing = require("./addListing");
const getAllCategories = require("./getAllCategories");
const saveAListing = require("./saveAListing");
const getListings = require("./getListings");
const getSingleListing = require("./getSingleListing");

const resolvers = {
  Query: {
    getSingleUser,
    getAllCategories,
    getListings,
    getSingleListing,
  },
  Mutation: {
    addUser,
    login,
    addListing,
    saveAListing,
  },
};

module.exports = resolvers;
