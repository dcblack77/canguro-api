import { Auth } from '../../shared/auth';

describe('Shared Auth', () => {
  let auth: Auth;

  beforeEach(async () => {
    auth = new Auth();
/*     const app: TestingModule = await Test.createTestingModule({
      providers: [Auth]
    }).compile();

    sharedModule = app.get<SharedModule>(SharedModule); */
  });

/*   it('sign token', async () => {
    let token = await auth.signToken({sub: 'string-id'});
    console.log(token);
  }); */

/*   describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  }); */
});