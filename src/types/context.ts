export type LogDetails = {
  requestId: string;
  message: string;
  action: string;
  source: string;
  method: string;
  url: string;
  data?: string;
  ip: string;
};

export type LogLabels = {
  requestId: string;
  action: string;
  source: string;
};
