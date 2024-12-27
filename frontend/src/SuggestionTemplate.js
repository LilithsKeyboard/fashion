// SuggestionTemplate.js
class SuggestionTemplate {
    constructor(styleSuggestion, toneSuggestion) {
        this.styleSuggestion = styleSuggestion;
        this.toneSuggestion = toneSuggestion;
    }

    formatSuggestions() {
        return `
            Merhabalar, hoş geldiniz! Seçtiğiniz stile göre '${this.styleSuggestion}' önerilerini giymenizi tavsiye ederiz.
            Ayrıca, yaptığınız seçimlere baktığımda 3 renk öneriyorum. Bu üç rengi gardırobunuzda kullanabilirsiniz:
            ${this.toneSuggestion}.
        `;
    }
}

export default SuggestionTemplate;
