const JWT_SECRET = "secred"
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      try {
        if(args.author && args.genre) {
            return Book.find({
              genres: {$all: [args.genre]}
            }).populate('author')
        } else {
            if(args.author) {
                return Book.find({}).populate('author');
            }
            if(args.genre) {
                return Book.find({
                  genres: {$all: [args.genre]}
                }).populate('author')
            }
        }
        return Book.find({}).populate('author');
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    allBooksByAuthor: async(root, args) => {
      const author = await Author.findOne({ name: args.author });
      const books = await Book.find({ author: { $in: author.id } }).populate(
        "author"
      );
      return books;
    },
    allBooksByGender: async(root, args) => {
      const books = await Book.find({ genres: { $in: args.genre } }).populate(
        "author"
      );
      return books;
    },
    allAuthors: () => {
      try {
        return  Author.find({});
      } catch(err) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
      })
      }
    }
    },
    Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
   Mutation: {
     addBook: async (root, args, { authUser }) => {
      if (!authUser) {
        throw new AuthenticationError("You need to be logged in to add a book");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (e) {
            throw new UserInputError("Couldn't create new author", {
              invalidArgs: { author: args.author },
              errorMessages: validationErrors,
            });
        }
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres,
      });
      try {
        await book.save();
      } catch (e) {
          throw new UserInputError("Couldn't create new book", {
            invalidArgs: args,
            errorMessages: validationErrors,
          });
        }
      const savedBook = await book.populate("author").execPopulate();
      pubsub.publish("BOOK_ADDED", { bookAdded: savedBook });
      return savedBook;
    },
    addAuthor: async (root, args) => {
    const author = new Author({ ...args, id: uuid() })
    try {
      await author.save()
    } catch (error) {
      throw new AuthorInputError(error.message, {
        invalidArgs: args,
      })
    }
    return author
    },
    createUser: async (root, args) => {
    const user = new User({ ...args });
    try {
      await user.save();
    } catch (error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      });
    }
    return user;
  },
  login: async (root, args) => {
    const user = await User.findOne({ username: args.username });
    console.log(args)
    console.log(root)
    if (!user || args.password !== "secred") {
      throw new UserInputError("wrong credentials");
    }
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    return { value: jwt.sign(userForToken, JWT_SECRET) };
  },
  editAuthor: async (root, args, {currentUser}) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        return Author.findOneAndUpdate({
          name: args.name
        }, {
          born: args.born
        }, {
          new: true
        });
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    }
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers;
