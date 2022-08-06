export interface LocalUser {
  userId: number;
  token: string;
}

export const localUser: LocalUser = {
  userId: 0,
  token: '',
};

export const generalRequestHeader = () => {
  return { token: localUser.token };
};
