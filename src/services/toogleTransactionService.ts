// transactionStore.ts
import { create } from "zustand";

type TransactionState = {
  isTransactionForm: boolean;
  toggleTransactionService: () => void;
  openTransactionService: () => void;
  closeTransactionService: () => void;
};

export const useTransactionStore = create<TransactionState>((set) => ({
  isTransactionForm: false,
  toggleTransactionService: () =>
    set((state) => ({ isTransactionForm: !state.isTransactionForm })),
  openTransactionService: () => set({ isTransactionForm: true }),
  closeTransactionService: () => set({ isTransactionForm: false }),
}));
