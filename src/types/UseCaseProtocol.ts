interface UseCaseProtocol<DTO, typeReturn> {
  execute(DTO: DTO): Promise<typeReturn>;
}

export { UseCaseProtocol };
