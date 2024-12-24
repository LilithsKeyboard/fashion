const database = require('./database'); // Singleton Database instance

async function color() {
    const query = 'SELECT * FROM public."color" ORDER BY "id" ASC';
    try {
        const color = await database.query(query);
        console.log(color);
    } catch (error) {
        console.error('Error fetching color:', error.message);
    } finally {
        database.disconnect(); // Bağlantıyı kapatmak için
    }
}

color();
