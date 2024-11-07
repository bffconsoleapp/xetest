import uuidv4 from 'uuid/v4.js'


// Demo Credit Union data
let creditunions = [{
    id: '1',
    creditUnionname: 'creditUnionname - 1',
    contract_number: 'contract_number - 1',
    state: 'state - 1',
  }, {
    id: '2',
    creditUnionname: 'creditUnionname - 2',
    contract_number: 'contract_number - 2',
    state: 'state - 2',
  }, {
    id: '3',
    creditUnionname: 'creditUnionname - 3',
    contract_number: 'contract_number - 3',
    state: 'state - 3',
  }]

let premiumadjustments = [{
    id: '10',
    product_name: 'Product Name - 1',
    report_period: 'Report Period - 1',
    status: 'status - 1',
    last_updated: 'Last Updated - 1',
    period_ending: 'Period Ending - 1',
    adjustment_Type: 'Adjustment Type - 1',
    total_borrower_fees:'1',
    CU_Retail_Rate:'1',
    protected_loan_amount:'1',
    pay_rate:'1',
    payment_due:'1',
    total_amount:'1',
    comment:'comment - 1',
    pacreditunion: '1'
  },{
    id: '11',
    product_name: 'Product Name - 2',
    report_period: 'Report Period - 2',
    status: 'status - 2',
    last_updated: 'Last Updated - 2',
    period_ending: 'Period Ending - 2',
    adjustment_Type: 'Adjustment Type - 2',
    total_borrower_fees:'2',
    CU_Retail_Rate:'2',
    protected_loan_amount:'2',
    pay_rate:'2',
    payment_due:'2',
    total_amount:'2',
    comment:'comment - 2',
    pacreditunion: '1'
  },{
    id: '12',
    product_name: 'Product Name - 3',
    report_period: 'Report Period - 3',
    status: 'status - 3',
    last_updated: 'Last Updated - 3',
    period_ending: 'Period Ending - 3',
    adjustment_Type: 'Adjustment Type - 3',
    total_borrower_fees:'3',
    CU_Retail_Rate:'3',
    protected_loan_amount:'3',
    pay_rate:'3',
    payment_due:'3',
    total_amount:'3',
    comment:'comment - 3',
    pacreditunion: '1'
  }]

const resolvers = {
  Query: {
    creditunions(parent, args, ctx, info) {
        if (!args.query) {
            return creditunions
        }

        return creditunions.filter((creditunion) => {
            return creditunion.creditUnionname.toLowerCase().includes(args.query.toLowerCase())
        })
    },
    premiumadjustments(parent, args, ctx, info) {
        if (!args.query) {
            return premiumadjustments
        }

        return premiumadjustments.filter((premiumadjustment) => {
            return premiumadjustment.pacreditunion.toLowerCase().includes(args.query.toLowerCase())
        })
    },
},
Mutation: {
    createPremiumAdjustment(parent, args, ctx, info) {
        // const userExists = users.some((user) => user.id === args.data.author)

        // if (!userExists) {
        //     throw new Error('User not found')
        // }

        const objpremiumadjustment = {
            id: uuidv4(),
            ...args.data
        }

        premiumadjustments.push(objpremiumadjustment)

        return objpremiumadjustment
    },
    updatePremiumAdjustment(parent, args, ctx, info) {
        console.log(args)
        const paExists = premiumadjustments.some((premiumadjustment) => premiumadjustment.id === args.id)
        console.log("PA Exist checking"+paExists)
        if (!paExists) {
            throw new Error('Premium Adjustment does not exist')
        }
        
        const paIndex = premiumadjustments.findIndex((premiumadjustment) => premiumadjustment.id === args.id)
        premiumadjustments[paIndex].total_borrower_fees = args.data.total_borrower_fees
        premiumadjustments[paIndex].CU_Retail_Rate = args.data.CU_Retail_Rate
        premiumadjustments[paIndex].protected_loan_amount = args.data.protected_loan_amount
        premiumadjustments[paIndex].pay_rate = args.data.pay_rate
        premiumadjustments[paIndex].payment_due = args.data.payment_due
        premiumadjustments[paIndex].total_amount = args.data.total_amount
        premiumadjustments[paIndex].comment = args.data.comment
        
        return premiumadjustments[paIndex]
    },
},
CreditUnion: {
    premiumadjustments(parent, args, ctx, info) {
        return premiumadjustments.filter((premiumadjustment) => {
            return premiumadjustment.pacreditunion === parent.id
        })
    }
},
premiumadjustment: {
    pacreditunion(parent, args, ctx, info) {
        return creditunions.find((creditunion) => {
            return creditunion.id === parent.pacreditunion
        })
    },
},
};

export default resolvers;
