function StatesCards({bugs}){

    const totalBugs = bugs.length;
    const openBugs = bugs.filter((bugs) => bugs.status === "Open").length;
    const progressBugs = bugs.filter((bug) => bug.status === "In Progress").length;
    const resolvedBugs = bugs.filter((bug) => bug.status === "Resolved").length;

    let summaryMessage = "";

    if (openBugs === 0 && progressBugs === 0) {
        summaryMessage = "🎉 Great! All bugs are resolved.";
    }
    else if (openBugs > 0) {
        summaryMessage = `⚠️ You have ${openBugs} open bug(s).`;
    }
    else {
        summaryMessage = `🔥 ${progressBugs} bug(s) are currently in progress.`;
    }

    return(
      <div className="stats-container">

                <div className="stat-card">
                    <h3>🐞 Total Bugs</h3>
                    <h1>{totalBugs}</h1>
                </div>

                <div className="stat-card">
                    <h3>🟢 Open</h3>
                    <h1>{openBugs}</h1>
                </div>

                <div className="stat-card">
                    <h3>🟡 In Progress</h3>
                    <h1>{progressBugs}</h1>
                </div>

                <div className="stat-card">
                    <h3>🔵 Resolved</h3>
                    <h1>{resolvedBugs}</h1>
                </div>

                <p
                    style={{
                        fontSize: "18px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                    }}
                >
                    {summaryMessage}
                </p>

            </div>
    );

}
export default StatesCards;