import {
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

export const shopType = new GraphQLObjectType({
    name: 'shopType',
    fields: {
        // 基础信息
        shopId: { type: GraphQLString },
        shopName: { type: GraphQLString },
        shopLogo: { type: GraphQLString },
        shopImage: { type: GraphQLString },
        shopSign: { type: GraphQLString },
        shopPhone: { type: GraphQLString },
        shopAddress: { type: GraphQLString },
        // 申请信息
        applyAmount: { type: GraphQLString }, // 申请金额
        applyPublishCardTime: { type: GraphQLString }, // 申请时间
        registerCapital: { type: GraphQLString }, // 注册资金
        legalName: { type: GraphQLString }, // 法人姓名
        legalPhone: { type: GraphQLString }, // 法人电话
        legalIDFront: { type: GraphQLString }, // 身份证正面
        legalIDBack: { type: GraphQLString }, // 身份证背面
        license: { type: GraphQLString }, // 营业执照
        taxCertificate: { type: GraphQLString }, // 税务登记证
        organizationCertificate: { type: GraphQLString }, // 组织机构代码证
        openAccountCertificate: { type: GraphQLString }, // 开户许可证

        // 被警告信息
        alarmLevel: { type: GraphQLInt }, // 报警级数
        applyRemoveAlarmTime: { type: GraphQLString }, // 申请解除警告时间

    },
});

export const shopsType = new GraphQLObjectType({
    name: 'shopsType',
    fields: {
        count: { type: GraphQLInt },
        shopList: { type: new GraphQLList(shopType) },
    },
});

const proofType = new GraphQLObjectType({
    name: 'proofType',
    fields: {
        file: { type: GraphQLString }, // 图片文件
        description: { type: GraphQLString }, //描述
    },
});

const reportType = new GraphQLObjectType({
    name: 'reportType',
    fields: {
        reportorPhone: { type: GraphQLString },
        reportorName: { type: GraphQLString },
        advise: { type: GraphQLString },
        reportTime: { type: GraphQLString },
        proofs:{ type: new GraphQLList(proofType) }, //证据列表
    },
});

export const reportedShopType = new GraphQLObjectType({
    name: 'reportedShopType',
    fields: {
        shopId: { type: GraphQLString },
        shopName: { type: GraphQLString },
        shopLogo: { type: GraphQLString },
        shopImage: { type: GraphQLString },
        shopSign: { type: GraphQLString },
        shopPhone: { type: GraphQLString },
        shopAddress: { type: GraphQLString },
        alarmLevel: { type: GraphQLInt },
        reports: { type: new GraphQLList(reportType) }, //举报列表
    },
});

export const applyRemoveAlarmShopType = new GraphQLObjectType({
    name: 'applyRemoveAlarmShopType',
    fields: {
        shopId: { type: GraphQLString },
        shopName: { type: GraphQLString },
        shopLogo: { type: GraphQLString },
        shopImage: { type: GraphQLString },
        shopSign: { type: GraphQLString },
        shopPhone: { type: GraphQLString },
        shopAddress: { type: GraphQLString },
        alarmLevel: { type: GraphQLInt },
        applyRemoveAlarmTime: { type: GraphQLString },
        removeAlarmProofs: { type: new GraphQLList(proofType) }, // 申请解除警告的证据
    },
});
