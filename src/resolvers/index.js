const getSingleUser = require("./getSingleUser");
const addUser = require("./addUser");
const login = require("./login");
const addListing = require("./addListing");
const getAllCategories = require("./getAllCategories");
const saveAListing = require("./saveAListing");
const getListings = require("./getListings");
const getSingleListing = require("./getSingleListing");
const addBid = require("./addBid");
const deleteListing = require("./deleteListing");
const stopListing = require("./stopListing");
const {withFilter} = require("graphql-subscriptions");

const pubsub = require("./pubSub");

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
		addBid,
		deleteListing,
		stopListing,
	},
	Subscription: {
		auctionBid: {
			subscribe: withFilter(
				() => pubsub.asyncIterator(["AUCTION_BID"]),
				(payload, variables) => {
					// Only push an update if the comment is on
					// console.log(payload);
					// the correct repository for this operation
					return payload.auctionBid.listingId === variables.listingId;
				}
			),
		},
	},
};

module.exports = resolvers;
