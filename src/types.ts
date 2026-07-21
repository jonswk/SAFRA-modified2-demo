export interface RegistrationData {
  email: string;
  password?: string;
  confirmPassword?: string;
  name: string;
  nationality: string;
  memberId: string;
  nric: string;
  gender: string;
  dob: string;
  mobile: string;
  emailAck: boolean;
  termsAck: boolean;
  captchaAck: boolean;
}

export type ViewState =
  | 'LANDING'
  | 'REGISTER_EMPTY'
  | 'REGISTER_PW_ERROR'
  | 'REGISTER_SYS_ERROR'
  | 'REGISTER_SUCCESS'
  | 'MEMBER_PORTAL';

export interface AlertBanner {
  type: 'error' | 'success' | 'info';
  title: string;
  message: string;
  visible: boolean;
}
