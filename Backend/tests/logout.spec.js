import User from '../model/user.js';
import { expect } from 'chai';
import sinon from 'sinon';
import { handleLogout } from '../controllers/logoutController.js';

describe('Test /logout', () => {
    let req, res, userStub;

    beforeEach(() => {
        req = {
            cookies: {
                jwt: 'fakeToken'    
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
            sendStatus: sinon.stub(),
            clearCookie: sinon.stub()
        };
        userStub = sinon.stub(User, 'findOne');

    });

    afterEach(() => {
        sinon.restore();
    });

    it('should logout user', async () => {
        const user = {
            refreshToken: 'fakeToken',
            update: sinon.stub().resolves()
        };
        userStub.resolves(user);
        await handleLogout(req, res);
        expect(res.sendStatus.calledWith(200)).to.be.true;
    }
    );

    it('should return 204 if user not found', async () => {
        userStub.resolves(null);
        await handleLogout(req, res);
        expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('should return 204 if no token', async () => {
        req.cookies = {};
        await handleLogout(req, res);
        expect(res.sendStatus.calledWith(204)).to.be.true;
    });

    it('should return 500 if error', async () => {
        userStub.rejects();
        await handleLogout(req, res);
        expect(res.status.calledWith(500)).to.be.true;
    });
    }   
);
