// patterns/ColorStrategyFactory.js
const {
    WarmColorRecommendation,
    CoolColorRecommendation,
    NeutralColorRecommendation
} = require('../service/colorStrategy');

class ColorStrategyFactory {
    static create(tone) {
        switch (tone) {
            case 'Warm':
                return new WarmColorRecommendation();
            case 'Cool':
                return new CoolColorRecommendation();
            case 'Neutral':
                return new NeutralColorRecommendation();
            default:
                throw new Error("Invalid tone");
        }
    }
}

module.exports = ColorStrategyFactory;