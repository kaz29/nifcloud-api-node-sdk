class Result<Response = {}> {
  constructor(
    public readonly statusCode: number,
    public readonly main: Response,
  ) {}
}

export default Result
