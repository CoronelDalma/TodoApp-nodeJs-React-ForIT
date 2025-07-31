const filters = document.querySelectorAll('input[name="filter"]');
    filters.forEach(filter => {
        filter.addEventListener('change', (e) => {
        const selectedFilter = e.target.value;
        // Aquí puedes manejar el cambio de filtro
        console.log(`Filtro seleccionado: ${selectedFilter}`);
        });
});