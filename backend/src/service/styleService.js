const StyleFactory = require('../patterns/styleFactory');

exports.getRecommendation = async (style) => {
    // Factory Method kullanarak stil objesi oluştur
    const styleInstance = StyleFactory.getStyle(style);

    if (!styleInstance) {
        throw new Error(`Unknown style: ${style}`);
    }

    // Stil objesi üzerinden öneriyi veritabanından al
    const recommendation = await styleInstance.getSuggestion();
    return recommendation;
};
