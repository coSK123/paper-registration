import bcrypt from 'bcrypt';
import User from '../model/user.js';
import sinon from 'sinon';
import { expect } from 'chai';
import { handleNewUser } from '../controllers/registerController.js';

describe('Test /register', () => {
    let req, res, userStub;

    beforeEach(() => {
        req = {
            body: {
                email: "newUser@gmail.com",
                password: "1234",
                firstname: "New",
                lastname: "User",
                role: "Student"
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            sendStatus: sinon.stub()
        };
        userStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 400 if email or password is missing', async () => {
        req.body.email = "";
        await handleNewUser(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ 'message': 'Not all required fields where filled out' })).to.be.true;
    });

    it('should return 409 if user already exists', async () => {
        userStub.resolves({ email: "newUser@gmail.com" });
        await handleNewUser(req, res);
        expect(res.status.calledWith(409)).to.be.true;
        expect(res.json.calledWith({ 'message': 'User already exists' })).to.be.true;
    });

    it('should register new user', async () => {
        userStub.resolves(null);
        sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
        const saveStub = sinon.stub(User.prototype, 'save').resolves();
        await handleNewUser(req, res);
        expect(saveStub.calledOnce).to.be.true;
        expect(res.status.calledWith(201)).to.be.true;
    });

    it('should return 500 if error occurs', async () => {
        userStub.rejects(new Error('Database error'));
        await handleNewUser(req, res);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ 'message': 'Database error' })).to.be.true;
    });
});