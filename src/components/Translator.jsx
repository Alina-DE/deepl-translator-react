import axios from 'axios'
import React, { useState } from 'react'

// styling
import "./Translator.css"


function Translator() {

    const [languageCode, setLanguageCode] = useState("")
    const [languageName, setLanguageName] = useState("")
    const [contentInput, setContentInput] = useState("")
    const [contentOutput, setContentOutput] = useState("")

    const getTranslation = (e) => {

        e.preventDefault()

        const deeplUrl = `https://api-free.deepl.com/v2/translate?auth_key=${process.env.REACT_APP_DEEPL_KEY}&text=${contentInput}&source_lang=EN&target_lang=${languageCode}`

        axios.get(deeplUrl)
            .then(response => setContentOutput(response.data.translations[0].text))
            .catch(error => console.log("error :", error.response))
    }


    return (
        <main>
            {/* Form: origin text + languages dropdown menu + button */}
            <form onSubmit={getTranslation}>

                {/* Origin text */}
                <div>
                    <label htmlFor="input-text">English</label>

                    <textarea
                        name="input-text"
                        id="input-text"
                        cols="35"
                        rows="10"
                        placeholder="Text to translate"
                        required
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}></textarea>

                    {/* Clear both textareas */}
                    {contentInput ? <div className="clear" onClick={() => { setContentInput(""); setContentOutput("") }}>✖️</div>
                        :
                        null
                    }
                </div>

                {/* Dropdown menu for a target language */}
                <div>
                    <select name="language" id="language"
                        onChange={(e) => {
                            setLanguageCode(e.target.value);
                            setLanguageName(e.target.selectedOptions[0].text);
                            setContentOutput("");
                        }}>

                        <option value="">Choose a target language</option>

                        <option value="BG">Bulgarian</option>
                        <option value="ZH">Chinese</option>
                        <option value="CS">Czech</option>
                        <option value="DA">Danish</option>
                        <option value="NL">Dutch</option>
                        <option value="ET">Estonian</option>
                        <option value="FI">Finnish</option>
                        <option value="FR">French</option>
                        <option value="DE">German</option>
                        <option value="EL">Greek</option>
                        <option value="HU">Hungarian</option>
                        <option value="IT">Italian</option>
                        <option value="JA">Japanese</option>
                        <option value="LT">Lithuanian</option>
                        <option value="LV">Latvian</option>
                        <option value="PL">Polish</option>
                        <option value="PT-PT">Portuguese</option>
                        <option value="PT-BR">Portuguese (Brazilian)</option>
                        <option value="RO">Romanian</option>
                        <option value="RU">Russian</option>
                        <option value="SK">Slovak</option>
                        <option value="SL">Slovenian</option>
                        <option value="ES">Spanish</option>
                        <option value="SV">Swedish</option>
                    </select>

                    {/* Button to invoke a get request to deepl, disabled if no language is chosen*/}
                    <button disabled={!languageCode ? true : false}>Translate!</button>
                </div>
            </form>

            {/* Translated text */}
            <div>
                <label htmlFor="output-text">{languageName !== "Choose a target language" ? languageName : null}</label>

                <textarea name="output-text" id="output-text" cols="35" rows="10" placeholder="Result" value={contentOutput} readOnly>{contentOutput}
                </textarea>
            </div>
        </main>
    )
}

export default Translator