document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#cont");
    const itemsPerPage = 5;    // Cantidad de artículos a cargar por página
    let currentPage = 0;       // Página actual
    let isLoading = false;     // Indicador de carga
    let allLoaded = false;     // Indicador para saber si todos los artículos fueron cargados
    let observer;              // Observador para el scroll infinito

    // Función para cargar y mostrar artículos desde el JSON
    async function cargarArticulos() {
        if (isLoading || allLoaded) return; // No cargar si ya está en curso o si todos los artículos han sido cargados
        isLoading = true;

        try {
            const response = await fetch('./src/js/libros.json');
            const data = await response.json();
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToLoad = data.articulos.slice(startIndex, endIndex);

            // Crear y añadir elementos para los artículos
            itemsToLoad.forEach(articulo => {
                const articleElement = crearArticulo(articulo);
                container.appendChild(articleElement);
            });

            currentPage++;

            // Verificar si se han cargado todos los artículos
            if (endIndex >= data.articulos.length) {
                allLoaded = true; // Indicar que todos los artículos han sido cargados
            } else {
                observarUltimoArticulo(); // Observar el nuevo último artículo cargado
            }
        } catch (error) {
            console.error("Error al cargar artículos:", error);
        } finally {
            isLoading = false;
        }
    }

    // Función para crear el elemento del artículo
    function crearArticulo(articulo) {
        const article = document.createElement('article');
        article.classList.add('caja_art');

        const title = document.createElement('h2');
        title.classList.add('h2_art');
        title.textContent = articulo.nombre;

        const description = document.createElement('p');
        description.classList.add('p_arts');
        description.textContent = `ISBN: ${articulo.isbn}`;

        const image = document.createElement('img');
        image.classList.add('imagen_art');
        image.src = articulo.portada_libro;
        image.alt = articulo.nombre;

        // Comprobación para cambiar la imagen en caso de error de carga
        image.onerror = () => {
            if (!image.hasAttribute('data-error')) {
                image.src = "./src/assets/def_img.jpg";
                image.setAttribute('data-error', 'true'); // Añadir bandera para evitar bucle infinito
            }
        };

        const link = document.createElement('a');
        link.classList.add('links', 'links_dia');
        link.href = articulo.url;
        link.textContent = 'Descargar';
        link.setAttribute('download', '');

        article.append(title, description, image, link);
        return article;
    }

    // Observar el último artículo cargado
    function observarUltimoArticulo() {
        const articles = document.querySelectorAll('.caja_art');
        const lastArticle = articles[articles.length - 1]; // Obtener el último artículo

        // Desconectar el observador actual antes de crear uno nuevo
        if (observer) observer.disconnect();

        // Crear un nuevo IntersectionObserver para observar el último artículo
        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading && !allLoaded) {
                cargarArticulos(); // Cargar más artículos cuando el último entre en vista
            }
        }, {
            rootMargin: '100px' // Cargar antes de que el último artículo esté completamente visible
        });

        // Observar el último artículo
        if (lastArticle) observer.observe(lastArticle);
    }

    // Iniciar la primera carga de artículos
    cargarArticulos();
});
