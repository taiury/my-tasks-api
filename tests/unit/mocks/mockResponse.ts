type MockStatus = (status: number) => MockResponseProtocol;
type MockJson = (json: unknown) => MockResponseProtocol;

interface MockResponseProtocol {
  status: MockStatus;
  json: MockJson;
}

class MockResponse implements MockResponseProtocol {
  public readonly status: MockStatus = jest.fn().mockReturnValue(this);
  public readonly json: MockJson = jest.fn().mockReturnValue(this);
}

export { MockResponse, MockResponseProtocol, MockJson, MockStatus };
