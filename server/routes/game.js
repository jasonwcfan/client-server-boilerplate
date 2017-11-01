import { ObjectId } from 'mongodb';
import { Game } from '../lib/mongoSchemas';
import mongoose from 'mongoose';

/**
 * Get a game from the database based on the given ID, if one exists
 * @param  {Object}     mongo The MongoDB database
 * @return {Function}         A function that handles the requeset
 */
export function getGame(mongo) {
    const games = mongo.collection('games');

    return async function(req, res) {
        var gameId = null;

        // Try converting the url param into a game ID to test validity
        try {
            gameId = new ObjectId(req.params[0]);
        } catch(err) {
            res.send('invalid game ID');
            return;
        }

        var game = await games.findOne({$or: [
            {redPlayerId: gameId},
            {blackPlayerId: gameId}
        ]});

        if (game == null) {
            console.log('game not found');
            res.send('game not found');
        } else {
            console.log('found game');
            res.send(game)
        }
    }
}

/**
 * Create a new game
 * @param  {Object}     mongo The MongoDB database
 * @return {Function}         A function that handles the requeset
 */
export function createGame(mongo) {
    const games = mongo.collection('games');

    return async function(req, res) {
        var newGame = new Game({
            redPlayerId: mongoose.Types.ObjectId(),
            blackPlayerId: null,
            board: Array(6).fill(Array(7).fill(0))
        });

        var result = await newGame.save();

        req.send(result);
    }
}
