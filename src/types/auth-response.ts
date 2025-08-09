export type TAuthResponse = {
  auth: AuthData;
  user: Customer;
};

export type AuthData = {
  jwt: string;
  refreshToken: string;
  expiresIn: number;
  expiresAt: number;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  preferences?: {
    sports?: string[];
  };
  provider?: string;
  sendEmailNotification: boolean;
  sendPushNotification: boolean;
  country?: string;
  dob?: string;
  deviceToken?: string;
  isPasswordSet?: boolean;
};
