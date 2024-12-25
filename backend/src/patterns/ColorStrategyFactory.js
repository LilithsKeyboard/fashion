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
            case 'cold':
                return new CoolColorRecommendation();
            case 'Neatural':
                return new NeutralColorRecommendation();
            default:
                throw new Error("Invalid tone");
        }
    }
}

module.exports = ColorStrategyFactory;
