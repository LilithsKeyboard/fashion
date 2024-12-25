// SuggestionDecorator.js
class SuggestionDecorator {
    constructor(recommendations) {
        this.recommendations = recommendations;
    }

    enrich() {
        // Example: Add some enhancements or additional information to the recommendations
        return this.recommendations.map(color => `Renk önerisi: ${color}`);
    }
}

module.exports = SuggestionDecorator;
