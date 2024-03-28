export interface __ZoomMeeting {
  meetingNumber: string;
  role: string;
  sdkKey: string;
  sdkSecret: string;
  userName: string;
  userEmail: string;
  passWord: string;
  leaveUrl: string;
}


export interface __signature {
  errorCode: number;
  errorMessage?: any;
  method: string;
  result: string;
  status: boolean;
}