export enum MobileEvents{
    BEGIN_QR_SCAN = 1
}

export interface QRScanResult{
    inmateNumber:string;
}

export interface MobileEventsMessage{
    eventType: MobileEvents
}

export interface MobileEventsResult{
    success: boolean
    result: any
}