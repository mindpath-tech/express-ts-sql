import { Request } from 'express';
import logger from '@mindpath/logger';
import { v4 as uuid } from 'uuid';
import { LogDetails, LogLabels } from '@src/types/context';

export default class RequestContext {
  private requestId: string;
  private url: string;
  private ip: string;
  private method: string;

  constructor(request: Request) {
    this.requestId = uuid();
    const logDetails = {
      requestId: this.requestId,
      method: request.method,
      url: request.url,
      ip: request.ip,
      message: 'New Request',
      action: 'begin',
      source: 'requestContext#constructor',
      data: request.body,
    };

    logger.info({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  public logEnd(): void {
    const logDetails = {
      requestId: this.requestId,
      method: this.method,
      url: this.url,
      ip: this.ip,
      message: 'Request has been completed',
      action: 'end',
      source: 'requestContext#logEnd',
    };

    logger.info({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  public logInfo(logInfo: Partial<LogDetails>): void {
    const logDetails = this.logDetails(logInfo);

    logger.info({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  public logError(logInfo: Partial<LogDetails>): void {
    const logDetails = this.logDetails(logInfo);
    logger.error({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  public logWarn(logInfo: Partial<LogDetails>): void {
    const logDetails = this.logDetails(logInfo);
    logger.warn({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  public logDebug(logInfo: Partial<LogDetails>): void {
    const logDetails = this.logDetails(logInfo);
    logger.debug({
      message: logDetails,
      labels: this.logLabels(logDetails),
    });
  }

  private logLabels(logInfo: LogDetails): LogLabels {
    return {
      action: logInfo.action,
      source: logInfo.source,
      requestId: this.requestId,
    };
  }

  private logDetails(logInfo: Partial<LogDetails>): LogDetails {
    // This function make sure order of fields so that it is easily readable.
    return {
      requestId: this.requestId,
      method: this.method,
      url: this.url,
      ip: this.ip,
      message: logInfo.message,
      action: logInfo.action,
      source: logInfo.source,
      data: logInfo.data,
    } as LogDetails;
  }
}
