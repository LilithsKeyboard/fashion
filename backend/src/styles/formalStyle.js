// casualStyle.js
class FormalStyle {
    processSuggestion(rows) {
        console.log('Rows in processSuggestion:', rows); // Log the rows for debugging

        if (rows.length > 0) {
            const suggestion = rows[0]?.Suggestion; // Safely access the Suggestion property
            return suggestion || "No suggestion found for casual style.";
        } else {
            return "No suggestion found for casual style.";
        }
    }
}

// Ensure it's exported properly as a class
module.exports = FormalStyle;
