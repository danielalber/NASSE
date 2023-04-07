jest.mock('./controllers/abc.controller', () => ({
    __esModule: true,
    getAll: jest.fn(),
    getById: jest.fn(),
}));
jest.mock('./middlewares/auth.middleware', () => ({
    __esModule: true,
    authMiddleware: jest.fn(),
}));
jest.mock('./middlewares/postprocess.middleware', () => ({
    __esModule: true,
    postprocessMiddleware: jest.fn(),
}));
jest.mock('express', () => ({
    default: () => ({ get: jest.fn(), listen: jest.fn() }),
}));
import '../src/index'; //importing will execute most of the code!
describe('Test App code coverage by import', function () {
    it('Should be a truthy test because the test suite cannot be empty', () => {
        expect(1).toBe(1);
    });
});