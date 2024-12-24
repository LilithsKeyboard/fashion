const CasualStyle = require('../styles/casualStyle'); // Correct import
const FormalStyle = require('../styles/formalStyle');
const SportyStyle = require('../styles/sportyStyle');
const PartyStyle = require('../styles/partyStyle');

class StyleFactory {
    static getStyle(style) {
        switch (style.toLowerCase()) {
            case 'casual':
                return new CasualStyle(); // Correct instantiation
            case 'formal':
                return new FormalStyle();
            case 'sporty':
                return new SportyStyle();
            case 'party':
                return new PartyStyle();
            default:
                throw new Error('Unknown style type.');
        }
    }
}

module.exports = StyleFactory;
