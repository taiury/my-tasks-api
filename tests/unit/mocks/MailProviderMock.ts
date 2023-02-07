import { MailProviderProtocol } from '@/providers';

class MailProviderMock implements MailProviderProtocol {
  public readonly sendEmail = jest.fn();
}

export { MailProviderMock };
