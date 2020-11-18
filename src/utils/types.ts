export interface Dictionary<T> {
  [key: string]: T
}

export interface UploadSignatureParams {
  userId: string | number
  type?: '1' | '2' // 印章类型 1-公司印章 2-法人印章
  signatureBase64: string
}

export interface AxiosResponseForUser<T extends Dictionary<any> = any> {
  msg: string
  message: string
  code: number
  data: T
}

export type AxiosResponseForZCT<T = any> = {
  msg: string
  message: string
  code: number
  data: T
}

export interface ZQTLoginRes {
  uid: string
  eid: string
  token: string
}

export type CustomStyle = {
  [key: string]: string
}

export namespace QRCode {
  export enum VerifyStatus {
    Waiting = 'waiting',
    Timeout = 'timeout',
    Success = 'success',
    Abandon = 'abandon'
  }

  export interface SuccessResponse {
    status: VerifyStatus
    data: any
  }
}

export namespace USER {
  export enum IsAuthed {
    True = '1',
    False = '0'
  }
}

export interface GetUserAccountInfoRes extends Dictionary<any> {
  managerCount: string
  isAuth: USER.IsAuthed
  createTime: string
  name: string
  type: UserType
  account: string
  organizationCount: string
  bankCount: string
  idCard: string
  companyCode: string
}

export interface Res<T extends Dictionary<any> = any> {
  msg: string
  code: number
  data: T
}

export namespace USERAPI {
  export interface Res<T extends Dictionary<any> = any> {
    msg: string
    code: number
    data: T
  }
}

export namespace ZCTAPI {
  export interface Res<T extends Dictionary<any> = any> {
    code: number
    message: string | null
    data: T
    total?: number
  }
  export interface PropertyRightListParam {
    pageNum: number
    pageSize: number
    // id?: number
    userName: string
    projectSort: string
    projectProperties: string
    listingMode: string
    status: string
    startDate: string
    endDate: string
  }
  export interface PropertyRightListItem extends Dictionary<any> {}
  export interface PropertyRightDetail extends Dictionary<any> {
    commoditiesTrading: {
      id?: string | number
      signUpStartTime: string | null
      signUpEndTime: string | null
      auctionStartTime: string | null
      auctionEndTime: string | null
      bond: number
      status: string
      projectProperties: string
      shortcutElements: string
      providerRateRules: string
      isSignUp: boolean | null
      paymentDeadline: string | null
      increasePrice: number | null
      tradingRules: string | null
    }
    listingContractList: Array<any>
  }
  export interface FinancialListParam {
    pageNum: number
    pageSize: number
    id?: number
    demandName: string
    listingMode: string
    status: string
    startDate: string
    endDate: string
  }
  export interface FinancialListItem extends Dictionary<any> {}
  export interface FinancialDetail extends Dictionary<any> {
    commoditiesTrading: {
      id?: string | number
      shortcutElements: string
      providerRateRules: string
      paymentDeadline: string | null
      investmentPrice: number | null
    }
    listingContractList: Array<any>
  }
  export interface WarrantAuditListItem extends Dictionary<any> {
    id: number
  }
  export interface WarrantAuditDetail extends Dictionary<any> {
    warrant_status: string
    project_name: string
    id: number
    user_name: string
    assignee: string
    target_name: string
    target_number: string
    turnoverEndTime: string
    create_date: string
    delisting_time: string
    trading_rules: string
    target_floor_price: number
    project_price: number
    contractDate: string
    fileList: Array<{
      fileName: string
      fileAddr: string
      type: number
    }>
  }
  export interface MakeWarrantAuditDecisionParam extends Dictionary<any> {
    id: number
    warrantStatus: number
    userId?: number
    fileName?: string
    fileAddr?: string
    authenticateNo?: string
  }
  export interface MyRegistrationListItem extends Dictionary<any> {
    id: number
    user_name: string
    bond_price: number
    pay_status: number
    status: string
    create_date: string
    sign_up_start_time: string
    sign_up_end_time: string
  }
  export interface MyBiddingPriseListItem extends Dictionary<any> {
    id: number
    examine_state: string
    start_time: string
    project_id: number
    end_time: string
    user_name: string
    create_date: string
    quote_price: number
  }
  export interface MyBiddingPriseListRes extends Dictionary<any> {
    total: number
    data: Array<MyBiddingPriseListItem>
    maxPrice: number
    personNumber: number
  }
}

export enum UserType {
  Personal = 1,
  Enterprise = 2
}

export enum AccountType {
  Phone = '1',
  Email = '2'
}

export type SendCodeParam = {
  account: string
  type: AccountType
}

export type ValidateCaptchaBody = {
  captchaKey: string
  captcha: string
}

export enum QRCodeVerifyType {
  FaceIdHs = 'faceIdHs',
  FaceIdBd = 'faceIdBd',
  FaceIdBd2 = 'faceIdBd2'
}

export type QRCodeInfoParam = {
  userId: string
  type: QRCodeVerifyType
  imgurl?: string
  imgurl2?: string
  returnUrl?: string
}

export type QRCodeCheckParam = {
  timeoutKey: string
}

export enum VerifyStatus {
  Waiting,
  Timeout,
  Success
}
