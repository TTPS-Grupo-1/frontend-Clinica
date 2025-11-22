import type { FormPaginationProps } from '../interfaces/Pagination';

export default function FormPagination({
  currentStep,
  totalSteps,
  onStepChange,
  onPrev,
  onNext,
  isLastStep,
  isSubmitting = false,
  onCancel,
}: FormPaginationProps) {
  return (
    <div className="flex items-center justify-between border-t pt-6">
      <button
        type="button"
        onClick={currentStep === 1 && onCancel ? onCancel : onPrev}
        className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
      >
        {currentStep === 1 ? 'Cancelar' : 'Anterior'}
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`h-8 w-8 rounded-full border ${currentStep === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => onStepChange(i + 1)}
          >
            <p className="justify-center text-sm">{i + 1}</p>
          </button>
        ))}
      </div>
      {isLastStep ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Registrando...' : 'Registrar Donación'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
