const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Candidate = db.Candidate;
const User=require('./../users/user.service')
module.exports = {
    getAll,
    postAll,
    getAllSearch,
    getById,
    create,
    update,
    delete: _delete
};

async function getAllSearch(query) {
    if(query !='' && query!='undefined'){
        return await Candidate.find({ $or: [ 
            { FirstName: { $regex: query, $options: "i" } }, 
            {LastName:{ $regex: query, $options: "i" }},
            {Email:{ $regex: query, $options: "i" }} ] }).select('-hash');
}
return await Candidate.find().select('-hash');
}
async function getAll() {
    return await Candidate.find().select('-hash');
}
async function postAll(query,userId) {
    var user= await User.getByUserId(userId)
    console.log(user)
    if(user.permissionLevel==10 && query && query!='undefined'){
        console.log('user.permissionLevel==10 && query && query!="undefined")')
        return await Candidate.find(
            {
                $and : [
                    {
                        $or: [{ FirstName: { $regex: query, $options: "i" } },{LastName:{ $regex: query, $options: "i" }},{Email:{ $regex: query, $options: "i" }} ]
                    }
                ]
            }).select('-hash');
    }
    if(user.permissionLevel<10 && query && query!='undefined')
    {
        console.log('user.permissionLevel<10 && query && query!="undefined"')
        return await Candidate.find(
            {
                $and : [
                    {
                        $or: [{ FirstName: { $regex: query, $options: "i" } },{LastName:{ $regex: query, $options: "i" }},{Email:{ $regex: query, $options: "i" }} ]
                    },
                    {
                        UserId:userId
                    }
                ]
            }).select('-hash');
    }
    if(user.permissionLevel==10){
        console.log('user.permissionLevel==10')
        return await Candidate.find().select('-hash');
    }
        console.log('last user based , user.permissionLevel=' + user.permissionLevel)
        return await Candidate.find(
        {
            UserId:userId
        }).select('-hash');
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
    console.log('update in service '+ candidate)
    // validate
    if (!candidate) throw 'User not found';
    if (candidate.Email !== candidateParam.Email && await Candidate.findOne({ Email: candidateParam.Email })) {
        throw 'Username "' + candidateParam.Email + '" is already taken';
    }

    // copy candidateParam properties to user
    Object.assign(candidate, candidateParam);

    await candidate.save();
}

async function _delete(id) {
    await Candidate.findByIdAndRemove(id);
}
