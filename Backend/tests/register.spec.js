import bcrypt from 'bcrypt';
import User from '../model/user.js';
import sinon from 'sinon';
import { expect } from 'chai';
import { handleNewUser } from '../controllers/registerController.js';
import { validateUserInput } from '../services/validationService.js';

describe('User Registration', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                email: "newUser@gmail.com",
                password: "12345678",
                firstname: "New",
                lastname: "User",
                role: "Student"
            },
            cookies: {
                jwt: 'testToken'
            }
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Input Validation', () => {
        it('should validate correct user input', () => {
            const result = validateUserInput(req.body);
            expect(result.isValid).to.be.true;
            expect(result.data).to.deep.equal(req.body);
        });

        it('should reject invalid email format', () => {
            req.body.email = 'invalid-email';
            const result = validateUserInput(req.body);
            expect(result.isValid).to.be.false;
            expect(result.error).to.equal('Invalid email format');
        });

        it('should reject short password', () => {
            req.body.password = '123';
            const result = validateUserInput(req.body);
            expect(result.isValid).to.be.false;
            expect(result.error).to.equal('Password must be at least 8 characters long');
        });

        it('should reject invalid role', () => {
            req.body.role = 'InvalidRole';
            const result = validateUserInput(req.body);
            expect(result.isValid).to.be.false;
            expect(result.error).to.equal('Invalid role');
        });
    });

    describe('Registration Process', () => {
        it('should return 400 if request body is empty', async () => {
            const emptyReq = { cookies: { jwt: 'testToken' } };
            await handleNewUser(emptyReq, res);
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ message: 'User data required' })).to.be.true;
        });

        it('should return 403 if user is not administrator', async () => {
            const jwtStub = sinon.stub(req, 'cookies').value({ jwt: 'testToken' });
            const userFindStub = sinon.stub(User, 'findOne').resolves({ role: 'Student' });
            
            await handleNewUser(req, res);
            expect(res.status.calledWith(403)).to.be.true;
            expect(res.json.calledWith({ message: 'Access Denied' })).to.be.true;

            jwtStub.restore();
            userFindStub.restore();
        });

        it('should return 409 if user already exists', async () => {
            const jwtStub = sinon.stub(req, 'cookies').value({ jwt: 'testToken' });
            const userFindStub = sinon.stub(User, 'findOne');
            userFindStub.onFirstCall().resolves({ role: 'Administrator' });
            userFindStub.onSecondCall().resolves({ email: "newUser@gmail.com" });
            
            await handleNewUser(req, res);
            expect(res.status.calledWith(409)).to.be.true;
            expect(res.json.calledWith({ message: 'User already exists' })).to.be.true;

            jwtStub.restore();
            userFindStub.restore();
        });

        it('should successfully register new user', async () => {
            const jwtStub = sinon.stub(req, 'cookies').value({ jwt: 'testToken' });
            const userFindStub = sinon.stub(User, 'findOne');
            userFindStub.onFirstCall().resolves({ role: 'Administrator' });
            userFindStub.onSecondCall().resolves(null);
            
            sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
            sinon.stub(User, 'create').resolves({
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role
            });

            await handleNewUser(req, res);
            expect(res.status.calledWith(201)).to.be.true;
            expect(res.json.calledWith(sinon.match({
                success: sinon.match.string,
                user: {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    role: req.body.role
                }
            }))).to.be.true;

            jwtStub.restore();
            userFindStub.restore();
        });

        it('should handle unexpected errors', async () => {
            const jwtStub = sinon.stub(req, 'cookies').value({ jwt: 'testToken' });
            const userFindStub = sinon.stub(User, 'findOne');
            userFindStub.onFirstCall().resolves({ role: 'Administrator' });
            userFindStub.onSecondCall().rejects(new Error('Database error'));
            
            await handleNewUser(req, res);
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ 
                message: 'An unexpected error occurred during registration' 
            })).to.be.true;

            jwtStub.restore();
            userFindStub.restore();
        });
    });
});