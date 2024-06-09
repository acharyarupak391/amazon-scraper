function formatCurrency(amount: number | string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(Number(amount));
}

function classnames(...args: any[]): string {
  return args.filter(Boolean).join(' ');
}

export { formatCurrency, classnames }