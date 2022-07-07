// Decrypt files

import React from "react";
import { useState, useEffect } from "react";
import "./decrypt.css";
import fernet from 'fernet';

function download(blob, filename) {
    /* Function to download the Response */
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

export default function Decrypt() {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [text, setText] = useState(null);
    const [data, setData] = useState(null);
    const [m_token, setToken] = useState(null);
    const [isSelect, setSelect] = useState(false);

    const onFileChange = event => {
    
        // Update the state
        setSelectedFile(event.target.files[0]);
        setSelect(true)
      
      };

    const onTextChange = event => {
    
        // Update the state
        setText(event.target.value);
      
    };

    const submit = (event) => {
        // Update the state
        const reader = new FileReader();
        reader.readAsText(selectedFile);
        reader.addEventListener('load', (e) => {
            setData(e.target.result)
        });
    }

    useEffect(() => {
        if (text === null) {

        } else {
            var secret = new fernet.Secret(text);
            var token = new fernet.Token({
                 secret: secret,
                 token: data,
                 ttl: 0
                 })
            const l = token.decode()
            
            const csv_list = String.raw`${l}`.split('\r\n')
            console.log(csv_list)
            let csvContent = csv_list.map(e => e+'\r');

            const blob = new Blob(csvContent, {type: "text/csv"}); 

            download(blob, 'data.csv')
        }
    }, [data])

    const iStyle = {
        paddingLeft: '10px',
        fontSize: '18px'
    }
      
    return (
        <>
        <div className="decrypt-title">Decrypt Files</div>
        <div>Some files retrieved through Uscalt need to be decrypted. 
            You can do that here. All you need is your file and the secret token</div>
        <hr/>
        <div>The token can be found in your email. Copy the entire text.</div>
        <hr/>
        <div style={{fontWeight: 'bolder'}}>You should only receive text that looks like this: Lb9l1X6-Kx6iAZMhUjfBk9HV9Uw-l_DgBFCDdi3vAos=</div>
        <div className="decrypt-container">
            <div className="decrypt-wrapper">
                <div className="decrypt-f-input">
                    <div className="decrypt-title-card">
                        Pick a file
                    </div>
                    <label htmlFor="file-upload" className="f-upload-custom">
                        {isSelect ? selectedFile.name : 'Select a File' }
                        <input id="file-upload" type="file" onChange={onFileChange} />
                    </label>
                </div>
                <div className="decrypt-t-input">
                    <div className="decrypt-title-card">
                        Enter the key
                    </div>
                    <input style={iStyle} type="text" onChange={onTextChange} />
                </div>
                <div className="decrypt-submit" onClick={submit}>
                    Download
                </div>
                <div>{m_token}</div>
            </div>
        </div>

        </>
    )
}