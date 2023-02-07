import { GenerateEmailConfirmationCode } from '@/utils';
import { UserRepositoryMock } from '../mocks';

const userRepositoryMock = new UserRepositoryMock();

describe('generateEmailConfirmationCode', () => {
  it('Should Create new random number', async () => {
    const sut = new GenerateEmailConfirmationCode(userRepositoryMock);
    const result = await sut.generate();
    expect(String(result).length).toEqual(6);
    expect(typeof result === 'number').toEqual(true);
  });
});
