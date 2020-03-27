const express = require('express');
const router = express.Router();
const candidateService = require('./candidate.service');

// routes
router.post('/register', register);
router.get('/search/:query', getAllSearch);
router.get('/admin/:userId', postAll);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function register(req, res, next) {
    candidateService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function getAll(req, res, next) {
    candidateService.getAll()
        .then(candidates => res.json(candidates))
        .catch(err => next(err));
}
function postAll(req, res, next) {
    candidateService.postAll(req.params.query,req.params.userId)
        .then(candidates => res.json(candidates))
        .catch(err => next(err));
}
function getAllSearch(req, res, next) {
    candidateService.getAllSearch(req.params.query)
        .then(candidates => res.json(candidates))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    candidateService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    candidateService.getById(req.params.id)
        .then(candidate => candidate ? res.json(candidate) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    candidateService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    candidateService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}