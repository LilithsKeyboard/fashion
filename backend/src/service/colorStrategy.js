class ColorRecommendationStrategy {
    getRecommendation() {
        throw new Error("This method must be implemented.");
    }
}

class WarmColorRecommendation extends ColorRecommendationStrategy {
    getRecommendation() {
        return ['Kırmızı', 'Turuncu', 'Sarı'];
    }
}

class CoolColorRecommendation extends ColorRecommendationStrategy {
    getRecommendation() {
        return ['Mavi', 'Mor', 'Yeşil'];
    }
}

class NeutralColorRecommendation extends ColorRecommendationStrategy {
    getRecommendation() {
        return ['Bej', 'Gri', 'Beyaz'];
    }
}

module.exports = {
    WarmColorRecommendation,
    CoolColorRecommendation,
    NeutralColorRecommendation,
};
