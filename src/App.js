import './App.css';
import {useState} from "react";

function App() {
    const [message, setMessage] = useState('');
    const [responseText, setResponseText] = useState('');
    const [responseTags, setResponseTags] = useState('');


    const handleTextChange = (event) => {
        setMessage(event.target.value);
    };

    function handleSendButton() {
        const queryParam = JSON.stringify({message})
        console.log(queryParam)
        fetch('http://localhost:8080/article', {
            // mode: 'no-cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: queryParam
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setResponseText(data.text);
                const concatenatedString = data.tags.reduce((accumulator, currentValue) => accumulator + "\n" + currentValue, '');
                setResponseTags(concatenatedString);
            })
            .catch(error => console.error('Pizda:', error));
    }

    return (
        <div>
            <div style={{display: 'grid', gridTemplateColumns: '600px 100px',gridTemplateRows:'400px'}}>
                <textarea value={message} onChange={handleTextChange}/>
                <button id="greateButton" onClick={handleSendButton} style={{fontStyle: '24px',backgroundColor:'pink'}}>поиск</button>
            </div>
            <div style={{display: 'grid', border: '4mm ridge rgba(211, 220, 50, .6)'}}>
                <p style={{borderBottom: 'dashed red'}}>{responseText}</p>
                <p style={{borderBottom: 'dashed red'}}>{responseTags}</p>
                <p>Links</p>
            </div>
        </div>
    );
}

export default App;
