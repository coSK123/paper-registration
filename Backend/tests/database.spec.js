import { expect } from 'chai';
import sinon from 'sinon';
import { sequelize, connectWithRetry, checkDatabaseConnection } from '../database.js';
import net from 'net';

describe('Database Connection', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('checkDatabaseConnection', () => {
        it('should resolve true when TCP connection is successful', async () => {
            const connectStub = sandbox.stub(net.Socket.prototype, 'connect').callsFake(function (port, host) {
                this.emit('connect');
            });

            const result = await checkDatabaseConnection('localhost', 3306, 5000);
            expect(result).to.be.true;
            connectStub.restore();
        });

        it('should reject with an error when TCP connection times out', async () => {
            const connectStub = sandbox.stub(net.Socket.prototype, 'connect').callsFake(function (port, host) {
                this.emit('timeout');
            });

            try {
                await checkDatabaseConnection('localhost', 3306, 5000);
            } catch (err) {
                expect(err.message).to.equal('Connection timed out');
            }
            connectStub.restore();
        });

        it('should reject with an error when TCP connection fails', async () => {
            const connectStub = sandbox.stub(net.Socket.prototype, 'connect').callsFake(function (port, host) {
                this.emit('error', new Error('Connection failed'));
            });

            try {
                await checkDatabaseConnection('localhost', 3306, 5000);
            } catch (err) {
                expect(err.message).to.equal('Connection failed');
            }
            connectStub.restore();
        });
    });

});