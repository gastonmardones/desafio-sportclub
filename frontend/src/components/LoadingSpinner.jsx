const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center p-12" role="status">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <span className="sr-only">Cargando...</span>
      <p className="mt-4 text-gray-600">Cargando beneficios...</p>
    </div>
  )
}

export default LoadingSpinner

