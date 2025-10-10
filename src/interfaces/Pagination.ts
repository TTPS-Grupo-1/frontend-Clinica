export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export interface FormPaginationProps {
  currentStep: number;
  totalSteps: number;
  onStepChange: (step: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isLastStep: boolean;
  isSubmitting?: boolean;
  onCancel?: () => void;
}