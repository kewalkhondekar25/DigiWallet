export interface SignUpRequestBody {
  name: string,
  email: string,
  password: string
};

export interface createdUser {
  id: number,
  name: string,
  email: string,
  isVerified: boolean,
  createdAt: Date
}

export interface accessTokenType {
  id: number,
  name: string,
  email: string
}

export interface refreshTokenType {
  id: number
};