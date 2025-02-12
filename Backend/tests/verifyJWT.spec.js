import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { verifyJWT } from '../middleware/verifyJWT.js';

describe('Test verifyJWT middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            sendStatus: sinon.stub()
        };
        next = sinon.stub();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 401 if no token is provided', () => {
        verifyJWT(req, res, next);
        expect(res.sendStatus.calledWith(401)).to.be.true;
    });

    it('should return 403 if token verification fails', () => {
        req.headers['authorization'] = 'Bearer fakeToken';
        sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
            callback(new Error('Token verification failed'), null);
        });
        verifyJWT(req, res, next);
        expect(res.sendStatus.calledWith(403)).to.be.true;
    });

    it('should call next() if token is valid', () => {
        req.headers['authorization'] = 'Bearer validToken';
        sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
            callback(null, { email: 'test@example.com' });
        });
        verifyJWT(req, res, next);
        expect(next.calledOnce).to.be.true;
    });
});