import type { LoanTransaction } from "../types/loan-transaction"

export const mockLoanTransactionData: LoanTransaction[] = [
  {
    id: "1",
    institution: "上海**商业银行",
    serviceCode: "网贷放款",
    accountingDate: "2029-04-29",
    voucherAccountingDate: null,
    transactionDate: "2029-04-29",
    transactionTime: "2025-06-25 16:40:59",
    transactionSerialNumber: "36717794079906856",
    counterpartAccount: "4013100083396567",
    receiptNumber: "9990000033671779408280092672000",
    counterpartAccountName: "奇司",
    repaymentAmount: 0,
    transactionStatus: "记账成功",
    responseCode: "00000000",
    responseMessage: "处理成功"
  },
  {
    id: "2",
    institution: "上海**商业银行",
    serviceCode: "网贷放款",
    accountingDate: "2029-05-28",
    voucherAccountingDate: null,
    transactionDate: "2029-05-28",
    transactionTime: "2025-06-25 18:55:15",
    transactionSerialNumber: "36717963036957736",
    counterpartAccount: "4013100083396567",
    receiptNumber: "9990000033671796303947431936000",
    counterpartAccountName: "奇司",
    repaymentAmount: 0,
    transactionStatus: "记账成功",
    responseCode: "00000000",
    responseMessage: "处理成功"
  },
  {
    id: "3",
    institution: "上海**商业银行",
    serviceCode: "网贷放款",
    accountingDate: "2029-08-08",
    voucherAccountingDate: null,
    transactionDate: "2029-08-08",
    transactionTime: "2025-06-26 14:06:14",
    transactionSerialNumber: "36719411298273198",
    counterpartAccount: "4013100083396567",
    receiptNumber: "9990000033671941130143989760000",
    counterpartAccountName: "奇司",
    repaymentAmount: 0,
    transactionStatus: "记账成功",
    responseCode: "00000000",
    responseMessage: "处理成功"
  }
]
