import { useState, useEffect } from 'react';

// ⚠️ TU CONFIGURACIÓN REAL
// 1. TOKEN: Créalo en Baserow -> Settings -> Database Tokens
const BASEROW_TOKEN = 'RGLLjgYjrFUZnUTEoq5eu89cicbbAlj6';

// 2. ID DE TABLA: Extraído de tu link (baserow.io/.../table/783181/...)
const TABLE_ID = '783181';

export function useBaserow() {
    const [treatmentsData, setTreatmentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch(
                    `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true&size=200`,
                    { headers: { Authorization: `Token ${BASEROW_TOKEN}` } }
                );
                if (!response.ok) throw new Error(`Error Baserow: ${response.status}`);
                const data = await response.json();

                const formatted = data.results.map((item) => ({
                    slug: item.Slug,
                    price: item.Precio,
                    duration: item.Duracion,
                    active: item.Activo // Leemos el Checkbox de Baserow
                }));

                setTreatmentsData(formatted);
            } catch (error) {
                console.error("Error cargando precios:", error);
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

    // NUEVO: Función para saber si mostramos o no el tratamiento
    const isActive = (slug) => {
        // Si todavía está cargando, asumimos que SI está activo (para no que no parpadee vacío)
        if (loading) return true;

        const found = treatmentsData.find(t => t.slug === slug);
        // Si no está en la base de datos, lo mostramos por defecto (o false si prefieres estricto)
        if (!found) return true;

        // Devolvemos el valor del checkbox
        return found.active;
    };

    return { getPrice, isActive, loading };
}