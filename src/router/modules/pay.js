export default [
    {
        path: "/payment",
        name: "payment",
        meta: {
            title: "Payment",
            showHeader: true
        },
        component: () => import("@/views/pay/index")
    },
    {
        path: "/paySuccess",
        name: "paySuccess",
        meta: {
            title: "Payment",
            showHeader: true
        },
        component: () => import("@/views/pay/payment.vue")
    },
    {
        path: "/payMethod",
        name: "payMethod",
        meta: {
            title: "payMethod",
            showHeader: true
        },
        component: () => import("@/views/pay/payMethod")
    },
    // {
    //     path: "/paySuccess",
    //     name: "paySuccess",
    //     meta: {
    //         title: "Payment Successful",
    //         showHeader: true
    //     },
    //     component: () => import("@/views/pay/paySuccess")
    // },
    {
        path: "/payCard",
        name: "payCard",
        meta: {
            title: "Payment",
            showHeader: true
        },
        component: () => import("@/views/pay/payCard")
    }   
]