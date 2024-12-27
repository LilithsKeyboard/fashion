class FormDataBuilder {
    constructor() {
        this.formData = {
            eye_color: '',
            hair_color: '',
            skin_color: '',
            lip_color: '',
        };
    }

    setEyeColor(color) {
        this.formData.eye_color = color;
        return this;
    }

    setHairColor(color) {
        this.formData.hair_color = color;
        return this;
    }

    setSkinColor(color) {
        this.formData.skin_color = color;
        return this;
    }

    setLipColor(color) {
        this.formData.lip_color = color;
        return this;
    }

    build() {
        return this.formData;
    }
}

export default FormDataBuilder;
