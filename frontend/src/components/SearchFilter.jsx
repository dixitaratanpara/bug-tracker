function SearchFilter({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
     priorityFilter,
    setPriorityFilter,
    sortOrder,
    setSortOrder,
}) {
    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <input type="text"
                    placeholder="🔍 Search Bugs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "16px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>

                <select value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                    }}
                >
                    <option value="All">All Status</option>

                    <option value="Open">Open</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Resolved">Resolved</option>

                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        marginLeft: "10px",
                    }}
                >
                    <option value="All">All Priorities</option>

                    <option value="High">High</option>

                    <option value="Medium">Medium</option>

                    <option value="Low">Low</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        marginLeft: "10px",
                    }}
                >
                    <option value="Newest">Newest First</option>

                    <option value="Oldest">Oldest First</option>
                </select>



            </div>
        </>
    );
}

export default SearchFilter;