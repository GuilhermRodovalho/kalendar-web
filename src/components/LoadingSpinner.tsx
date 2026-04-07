export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12" role="status" aria-label="Carregando">
      <div className="w-8 h-8 border-4 border-border border-t-ring rounded-full animate-spin" />
    </div>
  );
}
