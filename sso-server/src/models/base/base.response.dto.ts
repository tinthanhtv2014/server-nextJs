export interface ApiResponse {
  statusCode: number;
  message: string;
  error: string | null;
  isBusinessError: boolean;
  errorDetail: string | null;
  isEncrypted?: boolean | false;
  resultApi: any;
  total?: number;
}
