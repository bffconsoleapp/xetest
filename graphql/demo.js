import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
        creditunions(query: String) : [CreditUnion!]!
        premiumadjustments(query: String) : [premiumadjustment!]!
    }

    type Mutation {
        createPremiumAdjustment(data: CreatePremiumAdjustment!): premiumadjustment!
        updatePremiumAdjustment(id:ID!, data: UpdatepremiumAdjustment!): premiumadjustment!
    }

    input CreatePremiumAdjustment {
        product_name: String!
        report_period: String!
        status: String!
        last_updated: String!
        period_ending: String!
        adjustment_Type: String!
        total_borrower_fees:Float!
        CU_Retail_Rate:Float!
        protected_loan_amount:Float!
        pay_rate:Float!
        payment_due:Float!
        total_amount:Float!
        comment:String!
        pacreditunion: ID!
    }

    input UpdatepremiumAdjustment {
        total_borrower_fees:Float!
        CU_Retail_Rate:Float!
        protected_loan_amount:Float!
        pay_rate:Float!
        payment_due:Float!
        total_amount:Float!
        comment:String!
    }

    type CreditUnion {
        id: ID!
        creditUnionname: String!
        contract_number: String!
        state: String!
        premiumadjustments: [premiumadjustment!]!
       
    }

    type premiumadjustment {
        id:ID!
        product_name: String!
        report_period: String!
        status: String!
        last_updated: String!
        period_ending: String!
        adjustment_Type: String!
        total_borrower_fees:Float!
        CU_Retail_Rate:Float!
        protected_loan_amount:Float!
        pay_rate:Float!
        payment_due:Float!
        total_amount:Float!
        comment:String!
        pacreditunion: CreditUnion!
    }
`;

export default typeDefs;
