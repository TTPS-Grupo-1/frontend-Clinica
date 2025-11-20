import Skeleton from '../../../components/Skeleton';

export default function TransferenciaSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-[80px]">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">
        <Skeleton height="h-8" width="w-80" className="mb-6" />

        <div className="space-y-8">
          {/* Skeleton del selector de pacientes */}
          <div>
            <Skeleton height="h-5" width="w-20" className="mb-2" />
            <Skeleton height="h-12" width="w-full" rounded={true} />
          </div>

          {/* Skeleton del selector de tratamientos */}
          <div className="space-y-6">
            <div>
              <Skeleton height="h-5" width="w-24" className="mb-2" />
              <Skeleton height="h-12" width="w-full" rounded={true} />
            </div>

            <div>
              <Skeleton height="h-5" width="w-40" className="mb-2" />
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Skeleton height="h-4" width="w-32" className="mb-1" />
                        <Skeleton height="h-3" width="w-48" />
                      </div>
                      <Skeleton height="h-4" width="w-4" rounded={false} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton del formulario */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <Skeleton height="h-4" width="w-4" rounded={false} />
                <Skeleton height="h-4" width="w-24" />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Skeleton height="h-10" width="w-20" />
              <Skeleton height="h-10" width="w-36" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
