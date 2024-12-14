export interface ListForUserBillRecord {
    page: ListForUserBillRecordPage
    result: ListForUserBillRecordData[]
}
export interface ListForUserBillRecordData {
    customerLogo: string;
    customerName: '直播平台' | '充电+'
    showTitle: string;
    type: number;
    payAmount: string;
    feeTypeSymbol: string;
    feeTypeSymbol2: null;
    payAmountDetail: null;
    ctime: number;
    channelName: string;
    txId: string;
    status: string;
    endTime: number;
}
export interface ListForUserBillRecordPage {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPage: number;
}