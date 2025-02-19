// components/BrevoForm.js
import React, { useState } from 'react';
import { PrismicRichText } from '@prismicio/react';
const BrevoForm = ({data}) => {

  const [formData, setFormData] = useState({
    NOME: '',
    COGNOME: '',
    MESSAGGIO: '',
    SMS: '',
    EMAIL: '',
    OPT_IN: false,
    countryCode: '+39'
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.EMAIL) {
      newErrors.EMAIL = 'Questo campo non può essere lasciato vuoto.';
    } else if (!/\S+@\S+\.\S+/.test(formData.EMAIL)) {
      newErrors.EMAIL = 'Le informazioni fornite non sono valide.';
    }

    if (formData.SMS && !(/^\d{6,19}$/.test(formData.SMS))) {
      newErrors.SMS = 'Il campo SMS deve contenere tra i 6 e i 19 caratteri numerici.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Prepara i dati nel formato corretto per Brevo
    const submissionData = {
      ...formData,
      SMS: formData.SMS ? `${formData.countryCode}${formData.SMS}` : '', // Combina prefisso e numero
      EMAIL: formData.EMAIL.trim(), // Rimuove spazi extra
      OPT_IN: formData.OPT_IN ? 1 : 0, // Converte boolean in 1/0
    };

    try {
      const response = await fetch(data.codice_form, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }

      setSubmitStatus('success');
      setFormData({
        NOME: '',
        COGNOME: '',
        MESSAGGIO: '',
        SMS: '',
        EMAIL: '',
        OPT_IN: false,
        countryCode: '+39'
      });
    } catch (error) {
      console.error('Errore:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="overflow-scroll">
      <div className="p-2">

        <div className="text-center mb-3">
          <h3 className="text-center  uppercase font-secondary text-[30px] tracking-wider leading-none mb-1">{data.titolo_form}</h3>
          <PrismicRichText field={data.testo_form}  />
        </div>

        {submitStatus === 'error' && (
          <div className="mb-2 p-1.5 bg-[#ffeded] text-[#661d1d] rounded-[3px] border border-[#ff4949] text-left">
            {data.messaggio_errore}
          </div>
        )}
        
        {submitStatus === 'success' && (
          <div className="mb-2 p-1.5 bg-[#e7faf0] text-[#085229] rounded-[3px] border border-[#13ce66] text-left">
          {data.messaggio_conferma}
          </div>
        )}

        <form 
          onSubmit={handleSubmit}
          data-type="subscription"
        >
          <div className="space-y-1">
            {/* Nome */}
            <div className="mb-0.8">
              <input
                type="text"
                id="NOME"
                name="NOME"
                maxLength="200"
                value={formData.NOME}
                onChange={handleChange}
                placeholder={data.label_nome}
                className="w-full p-1 px-2 border border-grey  placeholder-grey"
              />
            </div>

            {/* Cognome */}
            <div className="mb-0.8">
              <input
                type="text"
                id="COGNOME"
                name="COGNOME"
                maxLength="200"
                value={formData.COGNOME}
                onChange={handleChange}
                placeholder={data.label_cognome}
                className="w-full p-1 px-2 border border-grey  placeholder-grey"
              />
            </div>

            {/* Messaggio */}
            <div className="mb-0.8">
              <textarea
                id="MESSAGGIO"
                name="MESSAGGIO"
                rows="2"
                maxLength="500"
                value={formData.MESSAGGIO}
                onChange={handleChange}
                placeholder={data.label_messaggio}  
                className="w-full p-1 px-2 border border-grey  placeholder-grey"
              />
            </div>

            {/* SMS */}
            <div className="mb-0.8">
              <div className="flex gap-1">
                <select
                  name="SMS__COUNTRY_CODE"
                  value={formData.countryCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                  className="w-[120px]  p-1 px-2 border border-grey  placeholder-grey"
                >
                  <option value="+39">+39 IT</option>
                  <option value="+1">+1 US</option>
                  <option value="+44">+44 GB</option>
                  {/* Add more options as needed */}
                </select>
                <input
                  type="tel"
                  id="SMS"
                  name="SMS"
                  value={formData.SMS}
                  onChange={handleChange}
                  placeholder="SMS"
                  className={`flex-1 p-0.8 border w-full p-1 px-2 border border-grey  placeholder-grey ${
                    errors.SMS ? 'border-[#ff4949]' : ''
                  }`}
                />
              </div>
              {errors.SMS && (
                <p className="mt-0.4 text-[#661d1d] text-sm">{errors.SMS}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-1">
              <input
                type="email"
                id="EMAIL"
                name="EMAIL"
                value={formData.EMAIL}
                onChange={handleChange}
                placeholder="Email"
                required
                className={`w-full p-0.8  p-1 px-2 border border-grey  placeholder-grey ${
                  errors.EMAIL ? 'border-[#ff4949]' : ''
                }`}
              />
              {errors.EMAIL && (
                <p className="mt-0.4 text-[#661d1d] text-sm">{errors.EMAIL}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="mt-2 mb-2 flex items-center gap-1">
              <label className="flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  id="OPT_IN"
                  name="OPT_IN"
                  checked={formData.OPT_IN}
                  onChange={handleChange}
                  className="mt-0.2"
                />
                
              </label>
              <PrismicRichText field={data.messaggio_policy} components={{
                paragraph: ({ children }) => <p className="text-xs">{children}</p>
              }} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-1 bg-grey text-white tracking-wide hover:bg-[#2d3540] transition-colors"
            >
              INVIA
            </button>
          </div>

          <input type="text" name="email_address_check" value="" className="hidden" />
          <input type="hidden" name="locale" value="it" />
        </form>
      </div>
    </div>
  );
};

export default BrevoForm;