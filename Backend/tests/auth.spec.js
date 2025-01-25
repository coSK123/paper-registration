import { expect } from 'chai';
import { handleLogin } from "../controllers/authController.js";
import sinon from 'sinon';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

describe('Test /auth', () => {
    let req, res, userStub;

    beforeEach(() => {
        req = {
            body: {
                email: "admin@gmail.com",
                password: "1234"
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            sendStatus: sinon.stub(),
            cookie: sinon.stub()
        };
        userStub = sinon.stub(User, 'findOne');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should login admin', async () => {
        const user = {
            email: "admin@gmail.com",
            password: await bcrypt.hash("1234", 10),
            save: sinon.stub().resolves()
        };
        userStub.resolves(user);
        sinon.stub(bcrypt, 'compare').resolves(true);
        sinon.stub(jwt, 'sign').returns('fakeToken');

        await handleLogin(req, res);

        expect(res.json.calledWith({ accessToken: 'fakeToken' })).to.be.true;
    });

    it('should return 400 if email or password is missing', async () => {
        req.body = {};
        await handleLogin(req, res);
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.json.calledWith({ 'message': 'Email and Password are required' })).to.be.true;
    });

    it('should return 401 if user is not found', async () => {
        userStub.resolves(null);
        await handleLogin(req, res);
        expect(res.sendStatus.calledWith(401)).to.be.true;
    });

    it('should return 401 if password does not match', async () => {
        const user = {
            email: "admin@gmail.com",
            password: await bcrypt.hash("wrongpassword", 10)
        };
        userStub.resolves(user);
        sinon.stub(bcrypt, 'compare').resolves(false);

        await handleLogin(req, res);

        expect(res.sendStatus.calledWith(401)).to.be.true;
    });

    it('should return 500 if there is a server error', async () => {
        userStub.rejects(new Error('Server error'));
        await handleLogin(req, res);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ 'message': 'Server error' })).to.be.true;
    });
});