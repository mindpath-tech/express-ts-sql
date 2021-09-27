import RequestContext from './helpers/context';
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      context: RequestContext;
      locale: string;
    }
  }
}
