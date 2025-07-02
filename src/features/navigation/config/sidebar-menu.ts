import type { MenuItem } from "@/features/case-management/types"

export const sidebarMenuItems: MenuItem[] = [
  {
    id: "risk-control",
    label: "全流程风险掌控",
    icon: "Shield",
    path: "/risk-control",
    children: [
      {
        id: "pre-loan",
        label: "贷前管理",
        icon: "FileSearch",
        path: "/risk-control/pre-loan",
        children: [
          {
            id: "credit-approval",
            label: "授信审批",
            icon: "CheckCircle",
            path: "/risk-control/pre-loan/credit-approval",
            implemented: true, // 已实现
          },
        ],
      },
      {
        id: "during-loan",
        label: "贷中管理",
        icon: "FileText",
        path: "/risk-control/during-loan",
        children: [
          {
            id: "loan-approval",
            label: "贷款审批",
            icon: "FileCheck",
            path: "/risk-control/during-loan/loan-approval",
            implemented: true, // 已实现
          },
        ],
      },

    ],
  },
  {
    id: "customer-management",
    label: "客户管理",
    icon: "Users",
    path: "/customers",
    implemented: true, // 已实现
  },
  {
    id: "case-management",
    label: "案件管理",
    icon: "FileText",
    path: "/cases",
    implemented: true, // 已实现
    children: [
      {
        id: "case-list",
        label: "案件列表",
        icon: "List",
        path: "/", // 指向首页，与案件列表相同
        implemented: true, // 已实现
      },
    ],
  },
  {
    id: "image-management",
    label: "影像件管理",
    icon: "Image",
    path: "/image-management/monitoring", // 直接指向子页面
    implemented: true, // 已实现
    children: [
      {
        id: "image-monitoring",
        label: "影像检测查询",
        icon: "Search",
        path: "/image-management/monitoring",
        implemented: true, // 已实现
      },
    ],
  },
  {
    id: "approval-center",
    label: "审批中心",
    icon: "ClipboardCheck",
    path: "/approval-center",
    children: [
      {
        id: "approval-list",
        label: "审批列表",
        icon: "List",
        path: "/approval-center/list",
      },
    ],
  },
  {
    id: "due-diligence",
    label: "尽调管理",
    icon: "FileSearch2",
    path: "/due-diligence",
  },
  {
    id: "identity-record",
    label: "实名记录",
    icon: "UserCheck",
    path: "/identity-record",
  },
  {
    id: "credit-management",
    label: "额度管理",
    icon: "CreditCard",
    path: "/credit-management",
    implemented: true, // 已实现
    children: [
      {
        id: "credit-ledger",
        label: "额度台账",
        icon: "FileSpreadsheet",
        path: "/credit-management/ledger",
        implemented: true, // 已实现
      },
    ],
  },
  {
    id: "business-query",
    label: "业务查询",
    icon: "Search",
    path: "/business-query",
    implemented: true, // 已实现
    children: [
      {
        id: "credit-application",
        label: "授信申请",
        icon: "FileText",
        path: "/business-query/credit-application",
        implemented: true, // 已实现
      },
      {
        id: "credit-agreement",
        label: "授信协议",
        icon: "FileCheck",
        path: "/business-query/credit-agreement",
        implemented: true, // 已实现
      },
      {
        id: "loan-contract",
        label: "贷款合同",
        icon: "FileSignature",
        path: "/business-query/loan-contract",
        implemented: true, // 已实现
      },
      {
        id: "credit-withdrawal",
        label: "额度提现",
        icon: "CreditCard",
        path: "/business-query/credit-withdrawal",
        implemented: true, // 已实现
      },
    ],
  },
  {
    id: "product-management",
    label: "产品管理",
    icon: "Package",
    path: "/product-management",
    implemented: true, // 已实现
    children: [
      {
        id: "product-query",
        label: "产品查询",
        icon: "Search",
        path: "/product-management/product-query",
        implemented: true, // 已实现
      },
    ],
  },
  {
    id: "loan-core",
    label: "贷款核心",
    icon: "CreditCard",
    path: "/loan-core",
    implemented: true, // 已实现
    children: [
      {
        id: "account-query",
        label: "账户查询",
        icon: "Search",
        path: "/loan-core/account-query",
        implemented: true, // 已实现
      },
      {
        id: "card-binding-query",
        label: "绑卡查询",
        icon: "CreditCard",
        path: "/loan-core/card-binding-query",
        implemented: true, // 已实现
      },
      {
        id: "transaction-query",
        label: "流水查询",
        icon: "FileText",
        path: "/loan-core/transaction-query",
        implemented: true, // 已实现
        children: [
          {
            id: "loan-transaction",
            label: "贷款交易流水",
            icon: "List",
            path: "/loan-core/transaction-query/loan-transaction",
            implemented: true, // 已实现
          },
        ],
      },
    ],
  },
]
