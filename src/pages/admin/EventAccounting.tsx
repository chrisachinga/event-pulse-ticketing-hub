
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Download, 
  ChevronRight, 
  DollarSign, 
  CreditCard, 
  Activity, 
  ArrowDownRight, 
  ArrowUpRight
} from 'lucide-react';
import { mockEvents } from '@/data/mockData';

// Mock finance data
const financialSummary = {
  totalRevenue: 1250000,
  ticketSales: 987000,
  sponsorships: 200000,
  fees: 63000,
  expenses: {
    venue: 350000,
    marketing: 125000,
    staff: 87000,
    equipment: 98000,
    misc: 42000,
  },
  transactions: [
    { id: '1', date: '2025-03-15', type: 'sales', description: 'Ticket batch #1', amount: 450000 },
    { id: '2', date: '2025-03-22', type: 'sales', description: 'Ticket batch #2', amount: 325000 },
    { id: '3', date: '2025-03-27', type: 'sales', description: 'VIP tickets', amount: 212000 },
    { id: '4', date: '2025-03-12', type: 'expense', description: 'Venue deposit', amount: -125000 },
    { id: '5', date: '2025-03-18', type: 'expense', description: 'Marketing materials', amount: -85000 },
    { id: '6', date: '2025-03-25', type: 'expense', description: 'Staff payment', amount: -87000 },
    { id: '7', date: '2025-04-01', type: 'revenue', description: 'Sponsorship - TechCorp', amount: 150000 },
    { id: '8', date: '2025-04-05', type: 'expense', description: 'Equipment rental', amount: -98000 },
  ]
};

const EventAccounting = () => {
  const { id } = useParams<{ id: string }>();
  const event = mockEvents.find(event => event.id === id);

  if (!event) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </DashboardLayout>
    );
  }

  const totalExpenses = Object.values(financialSummary.expenses).reduce((sum, expense) => sum + expense, 0);
  const netProfit = financialSummary.totalRevenue - totalExpenses;

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{event.title} - Financial Dashboard</h1>
            <p className="text-gray-500">Financial overview and transaction history</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <h3 className="text-2xl font-bold">{financialSummary.totalRevenue.toLocaleString()} KES</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <ArrowDownRight className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <h3 className="text-2xl font-bold">{totalExpenses.toLocaleString()} KES</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <ArrowUpRight className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <h3 className="text-2xl font-bold">{netProfit.toLocaleString()} KES</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                  <h3 className="text-2xl font-bold">
                    {Math.round((netProfit / financialSummary.totalRevenue) * 100)}%
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ticket Sales</span>
                  <span className="font-medium">{financialSummary.ticketSales.toLocaleString()} KES</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${(financialSummary.ticketSales / financialSummary.totalRevenue) * 100}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sponsorships</span>
                  <span className="font-medium">{financialSummary.sponsorships.toLocaleString()} KES</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full" 
                    style={{ width: `${(financialSummary.sponsorships / financialSummary.totalRevenue) * 100}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Service Fees</span>
                  <span className="font-medium">{financialSummary.fees.toLocaleString()} KES</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="bg-green-500 h-full" 
                    style={{ width: `${(financialSummary.fees / financialSummary.totalRevenue) * 100}%` }} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(financialSummary.expenses).map(([category, amount]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center">
                      <span className="text-sm capitalize">{category}</span>
                      <span className="font-medium">{amount.toLocaleString()} KES</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                      <div 
                        className="bg-red-400 h-full" 
                        style={{ width: `${(amount / totalExpenses) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {financialSummary.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'expense' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </div>
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.amount.toLocaleString()} KES
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EventAccounting;
