const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Candidate = db.Candidate;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Candidate.find().select('-hash');
}

async function getById(id) {
    return await Candidate.findById(id).select('-hash');
}

async function create(candidateParam) {
    // validate
    console.log(candidateParam)
    // if (await Candidate.findOne({ Email: candidateParam.Email })) {
    //     throw 'Email "' + candidateParam.Email + '" is already taken';
    // }

    const candidate = new Candidate(candidateParam);
    // save candidate
    await candidate.save();
}

async function update(id, candidateParam) {
    const candidate = await Candidate.findById(id);

    // validate
    if (!candidate) throw 'User not found';
    if (candidate.username !== candidateParam.username && await Candidate.findOne({ username: candidateParam.username })) {
        throw 'Username "' + candidateParam.username + '" is already taken';
    }

    // copy candidateParam properties to user
    Object.assign(candidate, candidateParam);

    await candidate.save();
}

async function _delete(id) {
    await Candidate.findByIdAndRemove(id);
}
