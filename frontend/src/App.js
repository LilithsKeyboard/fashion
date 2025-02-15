import React, { Component } from 'react';
import axios from 'axios';
import FormDataBuilder from './formDataBuilder';
import SuggestionTemplate from './SuggestionTemplate'; // Importing the new class
import './App.css'; // Importing the external CSS

class StyleSelectionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: new FormDataBuilder().build(),
            style: '',
            styleSuggestion: '',
            toneSuggestion: '',
            loading: false,
            error: '',
            errors: {},
            formattedSuggestions: '',
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        const builder = new FormDataBuilder()
            .setEyeColor(this.state.formData.eye_color)
            .setHairColor(this.state.formData.hair_color)
            .setSkinColor(this.state.formData.skin_color)
            .setLipColor(this.state.formData.lip_color);

        if (name === 'eye_color') builder.setEyeColor(value);
        if (name === 'hair_color') builder.setHairColor(value);
        if (name === 'skin_color') builder.setSkinColor(value);
        if (name === 'lip_color') builder.setLipColor(value);

        this.setState({ formData: builder.build(), errors: { ...this.state.errors, [name]: '' } });
    };

    handleStyleChange = (e) => {
        this.setState({ style: e.target.value });
    };

    validate = () => {
        const newErrors = {};
        Object.keys(this.state.formData).forEach((key) => {
            if (!this.state.formData[key]) newErrors[key] = 'Bu alan boş bırakılamaz.';
        });
        this.setState({ errors: newErrors });
        return Object.keys(newErrors).length === 0;
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (!this.validate()) return;

        this.setState({ loading: true });

        try {
            const [styleResponse, colorResponse] = await Promise.all([
                axios.get(`http://localhost:8080/style/${this.state.style}`),
                axios.get(`http://localhost:8080/color/${this.state.formData.eye_color}/${this.state.formData.hair_color}/${this.state.formData.lip_color}/${this.state.formData.skin_color}`),
            ]);

            // Pass the suggestions to the SuggestionTemplate class
            const suggestionTemplate = new SuggestionTemplate(
                styleResponse.data.suggestions,
                colorResponse.data.recommendations
            );

            this.setState({
                styleSuggestion: styleResponse.data.suggestions,
                toneSuggestion: colorResponse.data.recommendations,
                formattedSuggestions: suggestionTemplate.formatSuggestions(), // Get the formatted message
            });
        } catch (error) {
            console.error('There was an error:', error);
            this.setState({ error: 'Bir hata oluştu, lütfen tekrar deneyin.' });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        return (
            <div className="container">
                <h1>Stil ve Renk Öneri Formu</h1>
                <div className="selectionBox"> {/* Added box for selections */}
                    <form onSubmit={this.handleSubmit} className="form">
                        <label className="label">
                            Stil:
                            <select value={this.state.style} onChange={this.handleStyleChange} className="input">
                                <option value="">Bir stil seçin</option>
                                <option value="casual">Casual</option>
                                <option value="formal">Formal</option>
                                <option value="party">Party</option>
                                <option value="sporty">Sporty</option>
                            </select>
                            {this.state.errors.style && <p className="error">{this.state.errors.style}</p>}
                        </label>

                        <label className="label">
                            Göz Rengi:
                            <select name="eye_color" value={this.state.formData.eye_color} onChange={this.handleInputChange} className="input">
                                <option value="">Bir renk seçin</option>
                                <option value="blue">Mavi</option>
                                <option value="green">Yeşil</option>
                                <option value="brown">Kahverengi</option>
                            </select>
                            {this.state.errors.eye_color && <p className="error">{this.state.errors.eye_color}</p>}
                        </label>

                        <label className="label">
                            Saç Rengi:
                            <select name="hair_color" value={this.state.formData.hair_color} onChange={this.handleInputChange} className="input">
                                <option value="">Bir renk seçin</option>
                                <option value="brown">Kahverengi</option>
                                <option value="red">Kızıl</option>
                                <option value="black">Siyah</option>
                                <option value="blonde">Sarı</option>
                            </select>
                            {this.state.errors.hair_color && <p className="error">{this.state.errors.hair_color}</p>}
                        </label>

                        <label className="label">
                            Ten Rengi:
                            <select name="skin_color" value={this.state.formData.skin_color} onChange={this.handleInputChange} className="input">
                                <option value="">Bir ton seçin</option>
                                <option value="light">Açık</option>
                                <option value="wheat">Buğday</option>
                                <option value="dark">Esmer</option>
                            </select>
                            {this.state.errors.skin_color && <p className="error">{this.state.errors.skin_color}</p>}
                        </label>

                        <label className="label">
                            Dudak Rengi:
                            <select name="lip_color" value={this.state.formData.lip_color} onChange={this.handleInputChange} className="input">
                                <option value="">Bir renk seçin</option>
                                <option value="pink">Pembe</option>
                                <option value="nude">Nude</option>
                                <option value="red">Kırmızı</option>
                            </select>
                            {this.state.errors.lip_color && <p className="error">{this.state.errors.lip_color}</p>}
                        </label>

                        <button type="submit" className="button" disabled={this.state.loading}>
                            {this.state.loading ? 'Yükleniyor...' : 'Gönder'}
                        </button>
                    </form>
                </div>

                {this.state.error && <p className="error">{this.state.error}</p>}

                {/* Render formatted suggestions in a separate box */}
                {this.state.formattedSuggestions && (
                    <div className="suggestionBox"> {/* Added box for suggestions */}
                        <h2>Öneriler</h2>
                        <p>{this.state.formattedSuggestions}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default StyleSelectionForm;
