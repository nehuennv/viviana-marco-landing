import { useState, useEffect } from 'react';

// ⚠️ TU CONFIGURACIÓN REAL
const BASEROW_TOKEN = 'RGLLjgYjrFUZnUTEoq5eu89cicbbAlj6';
const TABLE_ID = '783181';

export function useBaserow() {
    const [treatmentsData, setTreatmentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(
                    `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true&size=200`,
                    {
                        headers: {
                            Authorization: `Token ${BASEROW_TOKEN}`,
                        },
                    }
                );

                if (!response.ok) throw new Error(`Error Baserow: ${response.status}`);

                const data = await response.json();

                // Mapeamos TODO desde la base de datos
                // Asegúrate que las columnas en Baserow se llamen:
                // "Nombre", "Slug", "Precio", "Duracion", "Categoria", "Activo"
                const formatted = data.results.map((item) => ({
                    title: item.Nombre,       // Título real (ej: "Botox")
                    slug: item.Slug,
                    price: item.Precio,
                    duration: item.Duracion,  // (ej: "30m")
                    category: item.Categoria?.value || 'Otros', // Leemos el valor del Single Select
                    active: item.Activo
                }));

                setTreatmentsData(formatted);
            } catch (error) {
                console.error("Error cargando tratamientos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, []);

    // Helpers
    const getPrice = (slug) => {
        const found = treatmentsData.find(t => t.slug === slug);
        if (!found || !found.price) return null;
        return `$${Number(found.price).toLocaleString('es-AR')}`;
    };

    const isActive = (slug) => {
        if (loading) return true;
        const found = treatmentsData.find(t => t.slug === slug);
        if (!found) return true;
        return found.active;
    };

    // NUEVO: Exportamos la data cruda para poder agruparla en el componente
    return { treatmentsData, getPrice, isActive, loading };
}