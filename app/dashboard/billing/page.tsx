import {
  Button,
  Card,
  StatusTag,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
  Tag,
} from "@sarunyu/system-one";

const invoices = [
  { id: "INV-00932", date: "Apr 1, 2026", total: "$240.00", status: "success" as const, label: "Paid" },
  { id: "INV-00911", date: "Mar 1, 2026", total: "$240.00", status: "success" as const, label: "Paid" },
  { id: "INV-00884", date: "Feb 1, 2026", total: "$240.00", status: "success" as const, label: "Paid" },
  { id: "INV-00861", date: "Jan 1, 2026", total: "$240.00", status: "error" as const, label: "Failed" },
];

export default function BillingPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 p-6 md:p-8">
      <header className="flex flex-col gap-2">
        <h1>Billing</h1>
        <p className="text-muted-foreground">
          Plan, payment method, and invoice history.
        </p>
      </header>

      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3>Growth plan</h3>
              <Tag text="Annual" variant="blue" size="small" />
            </div>
            <p className="text-sm text-muted-foreground">
              Renews on April 30, 2026 · 10 seats
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-foreground">$240</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md">
              Manage plan
            </Button>
            <Button variant="primary" size="md">
              Add seats
            </Button>
          </div>
        </div>
      </Card>

      <Card size="desktop" className="w-full">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3>Invoices</h3>
            <Button variant="plain" size="sm">
              Download all
            </Button>
          </div>
          <Table>
            <thead>
              <TableRow>
                <TableHeaderCell>Invoice</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
                <TableHeaderCell sortable={false}>Status</TableHeaderCell>
              </TableRow>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>{i.id}</TableCell>
                  <TableCell>{i.date}</TableCell>
                  <TableCell>{i.total}</TableCell>
                  <TableCell>
                    <StatusTag type={i.status} text={i.label} />
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </main>
  );
}
