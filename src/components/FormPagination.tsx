import type { FormPaginationProps } from "../interfaces/Pagination";

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
    <div className="flex justify-between items-center pt-6 border-t">
      <button
        type="button"
        onClick={currentStep === 1 && onCancel ? onCancel : onPrev}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {currentStep === 1 ? "Cancelar" : "Anterior"}
      </button>
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`w-8 h-8 rounded-full border ${currentStep === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => onStepChange(i + 1)}
          >
            <p className="text-sm justify-center">{i + 1}</p>
          </button>
        ))}
      </div>
      {isLastStep ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? "Registrando..." : "Registrar Donación"}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
