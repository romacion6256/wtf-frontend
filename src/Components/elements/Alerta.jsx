import React from 'react';

function Alert({ message, type }) {
  let alertClass = '';

  switch (type) {
    case 'Autenticacion fallida':
      alertClass = 'bg-red-100 border-red-400 text-red-700';
      break;
    case 'Error':
      alertClass = 'bg-red-100 border-red-400 text-red-700';
      break;
    case 'Completado':
      alertClass = 'bg-green-100 border-green-400 text-green-700';
      break;
    case 'info':
      alertClass = 'bg-blue-100 border-blue-400 text-blue-700';
      break;
    default:
      alertClass = 'bg-yellow-100 border-yellow-400 text-yellow-700';
  }

  return (
    <div className={`border-l-4 p-4 rounded-2xl ${alertClass} mt-4 mb-4 w-auto`} role="alert">
      <p className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      <p>{message}</p>
    </div>
  );
}

export default Alert;