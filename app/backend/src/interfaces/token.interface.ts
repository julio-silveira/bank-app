
interface Token {
  data: {
    username: string;
  }
  iat: number;
  exp: number;
}

export default Token