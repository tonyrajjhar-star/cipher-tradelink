import {
  CreditCard,
  BookOpen,
  Send,
} from "lucide-react";
import { PipelinePage } from "./NegotiatingBankProcess";

const DEBIT_STAGES = [
  {
    id: 1,
    title: "Debit Authorization",
    icon: CreditCard,
    description:
      "Validates the debit instruction against the customer's mandate, available balance, and approved transaction limits. Multi-factor authorization is captured from the designated signatories per the account operating rules. The system checks for any holds, blocks, or regulatory freezes on the source account. Only fully authorized debits are released to the settlement engine.",
  },
  {
    id: 2,
    title: "Account Settlement Ledger Posting",
    icon: BookOpen,
    description:
      "Posts the debit entry to the customer ledger and the corresponding credit to the nostro or suspense account in real time. Double-entry bookkeeping rules are enforced and reconciled against the day's running balance. Value-date logic is applied for cross-border or back-dated settlements per scheme rules. The posted entries are immutable and feed downstream regulatory and MIS reporting.",
  },
  {
    id: 3,
    title: "Confirmation & Notification Dispatch",
    icon: Send,
    description:
      "Generates the formal debit advice and dispatches it to the customer via their preferred channels — email, SMS, and secure inbox. Counterparty banks receive the corresponding SWIFT MT900/MT910 confirmation messages where applicable. All notifications are logged with delivery status for audit and dispute handling. The case is then closed and archived in the transaction history.",
  },
];

const DebitTransaction = () => (
  <PipelinePage
    title="Debit Transaction"
    subtitle="Settlement Workflow · 3 Stages"
    stages={DEBIT_STAGES}
    accent="#3386C3"
  />
);

export default DebitTransaction;
