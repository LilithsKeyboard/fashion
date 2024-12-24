const db = require('../models/database'); // Singleton DB connection
const StyleFactory = require('../patterns/styleFactory');

const getStyleRecommendation = async (req, res) => {
    const styleName = req.params.style;

    try {
        console.log('Requested Style:', styleName);

        // Query to get suggestions based on the style
        const query = 'SELECT "Suggestion" FROM public."StyleSuggestions" WHERE "StyleName" = $1;';
        const result = await db.query(query, [styleName]);

        console.log('Raw Query Result:', result); // Log raw query result for debugging

        // Check if result contains rows
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'Style not found.' });
        }

        // Process results using the appropriate style class
        const styleProcessor = StyleFactory.getStyle(styleName); // Factory to get the right class
        const processedSuggestion = styleProcessor.processSuggestion(result); // Pass the result directly

        // Send the processed suggestion in the response
        return res.json({ suggestions: processedSuggestion });
    } catch (error) {
        console.error('Error fetching style suggestions:', error.message);
        return res.status(500).json({ message: 'An error occurred while fetching suggestions.' });
    }
};

module.exports = {
    getStyleRecommendation,
};
