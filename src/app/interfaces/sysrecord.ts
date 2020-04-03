export interface AdditionalPrivilege {
    id: number;
    uploadDate: Date;
    hospitalCode: string;
    privilegeGroupCode: string;
    pdfLocation: string;
    pdfUri: string;
    remark: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;
}

export interface Chivamember {
    id: number;
    chivaCode: string;
    prefixName: string;
    firstName: string;
    lastName: string;
    createBy: string;
    bloodGroup: any;
    beAllergic: any;
    foodAllergic: any;
    congenitalDisease: any;
    moreInformation?: any;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    inActivated: boolean;
}



export interface Hospital {
    hospitalCode: string;
    hospitalName: string;
    hospitalShortName: string;
}

export interface NewsFeed {
    id: number;
    newsfeedCode: string;
    topic: string;
    coverImageLocation: string;
    coverImageUrl: string;
    detailImageLocation: string;
    detailImageUrl: string;
    newsfeedDesc: string;
    effectiveDate: Date;
    expireDate: Date;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;
    inActivated: boolean;
}


export interface Privilegeroup {

    privilegeCode: string;
    privilegeDesc: string;
    privilegeType: string;
}

export interface Gift {
    id: number;
    giftNo: string;
    giftName: string;
    coverImageLocation: string;
    coverImageUrl: string;
    detailImageLocation: string;
    detailImageUrl: string;
    giftDetail: string;
    giftStartDate: Date;
    giftEndDate: Date;
    hospitalList: string;
    claimStatus: string;
    claimAmount: number;
    inActivated: boolean;
    giftApproveStatus: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;
}

export interface PromotionGroupForHospital {
    id: number;
    promotionId: number;
    promotionNo: string;
    hospitalCode: string;
}

export interface Promotion {
    id: number;
    promotionNo: string;
    promotionName: string;
    promotionGroup: string;
    promotionGroupForHospital: PromotionGroupForHospital[];
    coverImageLocation: string;
    coverImageUrl: string;
    detailImageLocation: string;
    detailImageUrl: string;
    paStartDate: Date;
    paEndDate: Date;
    promotionTypeBrochure: string;
    promotionTypeRedeem: string;
    redeemQty: number;
    showByLocation: string;
    gender: string;
    nationalityCode: string;
    monthOfBirth: number;
    age: string;
    ageFrom: number;
    ageTo: number;
    provinceCode: string;
    memberType: string;
    memberNotRenewStatus: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;
}

export interface PromotionGroupForHospital {
    id: number;
    promotionId: number;
    promotionNo: string;
    hospitalCode: string;
}


export interface MemberCardType {
    cardCode: string;
    cardDesc: string;
}

export interface Redeem {
    id: number;
    promoOrGiftId: number;
    redeemType: string;
    chivaCode: string;
    redeemDate: Date;
    redeemNo: string;
    promotionDetail: string;
    hospitalName: string;
    hospitalClaim: string;
    redeemCreateby: string;
    memoName: string;
    isClaim: boolean;
}

// export interface Uploadpromotion {
//     id: number;
//     processDate: Date;
//     promotionId: number;
//     promotion: Promotion;
//     uploadQty: number;
//     createBy: string;
//     createDate: Date;
//     updateBy: string;
//     updateDate: Date;
//     updateLocation: string;
// }

export interface Uploadpromotion {
    id: number;
    processDate: Date;
    promotionId: number;
    promotion: Promotion;
    projectId: number;
    project: SysEnum;
    uploadQty: number;
    chivaMembers: Chivamember[];
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;

}

export interface SysEnum {
    id: number;
    enumOrder: number;
    enumName: string;
    enumDesc: string;
    enumValue: string;
}



export interface SystemLog {
    id: number;
    logDateTime: Date;
    logType: number;
    errorMessage: string;
    targetSite: string;
}

export interface Giftimport {
    id: number;
    processDate: Date;
    giftId: number;
    gift: Gift;
    projectId: number;
    project: SysEnum;
    uploadQty: number;
    chivaMembers: Chivamember[];
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    updateLocation: string;
}

export interface ClaimPromotion {
    redeemNo: string;
}

export interface ClaimGift {
    redeemNo: string;
}


export interface Register {
    userName: string;
    email: string;
    password: string;
    employeeCode: string;
    hospitalCode: string;
    prefixName: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createBy: string;
    langCode: string;
}

export interface GetHospitalListByEmp {
    hospitalCode: string;
    hospitalName: string;
    hospitalShortName: string;
}

export interface GetEmployeeProfile {
    hospitalCode: string;
    employeeCode: string;
    prefixName: string;
    firstName: string;
    lastName: string;
    langCode: string;
}


export interface GetAllChivaUser {
    userName: string;
    email: string;
    password: string;
    employeeCode: string;
    hospitalCode: string;
    prefixName: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    createBy: string;
    langCode: string;
    inActivated: boolean;
}



export interface PromotionForMemberDetailList {
    id: number;
    promotionForMemberId: number;
    isRedeem: boolean;
    redeemDate: Date;
    chivaCode: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface UploadChiva {
    chivaCode: string;
    bloodGroup: string;
    beAllergic: string;
    foodAllergic: string;
    congenitalDisease: string;
    moreInformation: string;
}

