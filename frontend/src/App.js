import React, { useState } from 'react';
import axios from 'axios';

const UserSelectionForm = () => {
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [skinColor, setSkinColor] = useState('');
    const [lipColor, setLipColor] = useState('');
    const [style, setStyle] = useState('');
    const [toneSuggestion, setToneSuggestion] = useState('');
    const [styleSuggestion, setStyleSuggestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Backend'e gönderim
            const response = await axios.post('http://localhost:5000/api/color', {
                hairColor,
                eyeColor,
                skinColor,
                lipColor,
            });
            setToneSuggestion(response.data.tone);

            const styleResponse = await axios.post('http://localhost:5000/api/style', { style });
            setStyleSuggestion(styleResponse.data.suggestion);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Saç Rengi:
                <select value={hairColor} onChange={(e) => setHairColor(e.target.value)}>
                    <option value="kızıl">Kızıl</option>
                    <option value="kahve">Kahve</option>
                    <option value="siyah">Siyah</option>
                    <option value="sarı">Sarı</option>
                </select>
            </label>

            <label>
                Göz Rengi:
                <select value={eyeColor} onChange={(e) => setEyeColor(e.target.value)}>
                    <option value="mavi">Mavi</option>
                    <option value="kahve">Kahve</option>
                    <option value="yeşil">Yeşil</option>
                </select>
            </label>

            <label>
                Ten Rengi:
                <select value={skinColor} onChange={(e) => setSkinColor(e.target.value)}>
                    <option value="açık">Açık</option>
                    <option value="buğday">Buğday</option>
                    <option value="esmer">Esmer</option>
                </select>
            </label>

            <label>
                Dudak Rengi:
                <select value={lipColor} onChange={(e) => setLipColor(e.target.value)}>
                    <option value="pembe">Pembe</option>
                    <option value="nude">Nude</option>
                    <option value="kırmızı">Kırmızı</option>
                </select>
            </label>

            <label>
                Stil:
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="party">Party</option>
                    <option value="sporty">Sporty</option>
                </select>
            </label>

            <button type="submit">Gönder</button>

            <div>
                <p>Renk Önerisi: {toneSuggestion}</p>
                <p>Stil Önerisi: {styleSuggestion}</p>
            </div>
        </form>
    );
};

export default UserSelectionForm;
