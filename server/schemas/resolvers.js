const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to log in!");
    },
  },

  Mutation: {
    addUser: async (parent, newUser, context) => {
      const user = await User.create(newUser);
      if (!user) {
        throw new AuthenticationError("Something is wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { username, email, password }) => {
      const user = await User.findOne({
        $or: [{ username: username }, { email: email }],
      });
      if (!user) {
        throw new AuthenticationError("This user is NOT there! Try again.");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, book, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to log in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new AuthenticationError(
            "The user with this id is NOT there! Try again."
          );
        }
        return updatedUser;
      }
    },
  },
};

module.exports = resolvers;
