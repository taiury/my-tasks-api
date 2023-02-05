interface AddressProps {
  name: string;
  email: string;
}

interface MessageProps {
  to: AddressProps;
  from: AddressProps;
  subject: string;
  body: string;
}

interface MailProviderProtocol {
  sendEmail(message: MessageProps): Promise<void>;
}

export { MailProviderProtocol, AddressProps, MessageProps };
