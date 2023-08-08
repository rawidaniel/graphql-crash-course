import db from "./_db.js";

export const resolvers = {
  Query: {
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);

      return db.games;
    },
    addGame(_, args) {
      const game = {
        ...args.game,
        id: (+db.games.at(-1).id + 1).toString(),
      };
      db.games.push(game);
      return game;
    },
    editGame(_, args) {
      db.games = db.games.map((game) => {
        // console.log(" fromm", args.edits);
        // if (game.id === args.id) {
        //   return { ...game, ...args.edits };
        // }

        // return game;
        //
        if (game.id !== args.id) return game;
        game.title = args.edits.title || game.title;
        game.platform = args.edits.platform || game.platform;
        return game;
      });

      return db.games.find((game) => game.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },

  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },
};
