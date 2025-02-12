import { expect } from 'chai';
import { handleRefreshToken } from '../controllers/refreshTokenController.js';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';

describe('Test /refresh', () => {
    let req, res, userStub;

    beforeEach(() => {
        req = {
            cookies: {}
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

    it('should return 401 if no cookies are present', async () => {
        await handleRefreshToken(req, res);
        expect(res.sendStatus.calledWith(401)).to.be.true;
    });

    it('should return 403 if user is not found', async () => {
        req.cookies.jwt = 'fakeToken';
        userStub.resolves(null);
        await handleRefreshToken(req, res);
        expect(res.sendStatus.calledWith(403)).to.be.true;
    });

    it('should return 403 if token verification fails', async () => {
        req.cookies.jwt = 'fakeToken';
        const user = { email: 'test@example.com', refreshToken: 'fakeToken' };
        userStub.resolves(user);
        sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
            callback(new Error('Token verification failed'), null);
        });
        await handleRefreshToken(req, res);
        expect(res.sendStatus.calledWith(403)).to.be.true;
    });

    it('should return a new access token if everything is valid', async () => {
        req.cookies.jwt = 'fakeToken';
        const user = { email: 'test@example.com', role: 'user', refreshToken: 'fakeToken' };
        userStub.resolves(user);
        sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
            callback(null, { email: 'test@example.com' });
        });
        sinon.stub(jwt, 'sign').returns('newAccessToken');
        await handleRefreshToken(req, res);
        expect(res.json.calledWith({ accessToken: 'newAccessToken' })).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
        req.cookies.jwt = 'fakeToken';
        userStub.rejects(new Error('Database error'));
        await handleRefreshToken(req, res);
        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWith({ 'message': 'Database error' })).to.be.true;
    });
});