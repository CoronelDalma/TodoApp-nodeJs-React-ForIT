function TaskFilters({ onFilterChange, currentFilter, onSearch }) {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="task-filters">
            <input
                type="text"
                placeholder="Buscar tareas..."
                onChange={handleSearchChange}
            />
            <div className="filters">
                <label>
                <input
                    type="radio"
                    name="filter"
                    value="all"
                    checked={currentFilter === 'all'}
                    onChange={handleFilterChange}
                />
                Todas
                </label>
                <label>
                <input
                    type="radio"
                    name="filter"
                    value="active"
                    checked={currentFilter === 'active'}
                    onChange={handleFilterChange}
                />
                Activas
                </label>
                <label>
                <input
                    type="radio"
                    name="filter"
                    value="completed"
                    checked={currentFilter === 'completed'}
                    onChange={handleFilterChange}
                />
                Completadas
                </label>
            </div>
        </div>
    );
}

export default TaskFilters;