
const ColorStrategyFactory = require('../patterns/ColorStrategyFactory');
const SuggestionDecorator = require('../patterns/SuggestionDecorator');
const db = require("../models/database");

class ColorController {
    async getRecommendations(req, res) {
        try {
            // Parametreleri URL'den alıyoruz
            const { eye_color, hair_color, lip_color, skin_color } = req.params;

            // SQL sorgusunu hazırlıyoruz
            const query = `
                SELECT "tone" 
                FROM public."color" 
                WHERE "eye_color" = $1
                  AND "hair_color" = $2 
                  AND "lip_color" = $3 
                  AND "skin_color" = $4;
            `;
            const values = [eye_color, hair_color, lip_color, skin_color];

            // Veritabanı sorgusunu çalıştırıyoruz
            const result = await db.query(query, values);
            console.log(result); // Log the result to see what is returned

            // Veritabanı sonucu kontrol et

            // Tonu alıyoruz
            const tone = result[0].tone;

            console.log('dfrf'+tone)

            // Ton kontrolü
            if (!tone || tone === 'Bilinmiyor') {
                return res.status(404).json({ message: 'Uygun bir ton bulunamadı.' });
            }

            // Renk stratejisini oluşturma
            const strategy = ColorStrategyFactory.create(tone);
            let recommendations = strategy.getRecommendation();

            // Önerileri zenginleştirme
            const decorator = new SuggestionDecorator(recommendations);
            recommendations = decorator.enrich();

            console.log('melek:'+ recommendations)
            // Sonuçları döndürme
            res.status(200).json({
                status: 'success',
                tone,
                recommendations,
            });
        } catch (error) {
            console.error('Error:', error.message); // Hata ayıklama
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ColorController();
