export const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Para formato 24 horas
    }).replace(',', ''); // Quitar la coma entre fecha y hora
};

const appwriteDate = "2025-04-01T16:37:42.378+00:00";
console.log(formatDate(appwriteDate)); // Salida: "01/04/2025 13:37" (Depende de la zona horaria)
