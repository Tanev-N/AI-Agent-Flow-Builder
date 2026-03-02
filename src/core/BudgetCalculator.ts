interface BudgetItem {
  tokenBudget: number;
  isActive: boolean;
}

export class BudgetCalculator {
  calculateTotal(items: BudgetItem[]): number {
    return items
      .filter(item => item.isActive)
      .reduce((sum, item) => sum + item.tokenBudget, 0);
}


  getBudgetStatus(total: number, limit: number): 'ok' | 'warning' | 'critical' {
    if (limit === 0) return 'critical';
    const percentage = (total / limit) * 100;
    if (percentage >= 90) return 'critical';
    if (percentage >= 70) return 'warning';
    return 'ok';
  }
}