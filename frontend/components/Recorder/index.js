import { useState, useEffect } from 'react'
import RecordRTC, { invokeSaveAsDialog, StereoAudioRecorder } from 'recordrtc';
import styles from '../../styles/Home.module.css'
export default function Recorder({ username, method }) {
    const [audioBlob, setAudioBlob] = useState()
    const [pBar,showPBar]=useState(false)
    const [pWidth,setPWidth]=useState(100)
    const [recState,setRecState]=useState(null)
    const [output,setOutput]=useState("Transctiption will be displayed here")
    useEffect(() => {
        if (audioBlob) {
            var data = new FormData()
            data.append('file', audioBlob, 'file')
            data.append('username', username)
            fetch(`http://localhost:5000/getTranscription`, {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(res => { 
                setOutput(res)})
            .catch(err => console.log(err));

        }
    }, [audioBlob])
    function handleRecordClick() {
        if(buttonText == 'STOP'){
            recState.stopRecording(function () {
                let blob = recState.getBlob();
                setAudioBlob(blob)
            });
        }
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(async function (stream) {
            let recorder = RecordRTC(stream, {
                type: 'audio',
                recorderType: StereoAudioRecorder,
                mimeType: 'audio/wav',
            });
            setRecState(recorder)
            recorder.startRecording();
            showPBar(true)
            const sleep = m => new Promise(r => setTimeout(r, m));
            
            
        });
        if (buttonText === 'RECORD') {
            setButtonColor('cyan')
            setButtonText('STOP')
        }
        else {
            setButtonColor('orange')
            setButtonText('RECORD')
        }
    }
    const [buttonText, setButtonText] = useState('RECORD')
    const [buttonColor, setButtonColor] = useState('orange')
    return (<div className={styles.voicesection}>
        {pBar && <div className={styles.progressbar} style={{ width:`${pWidth}%`}}></div>}
        <button onClick={handleRecordClick} style={{ backgroundColor: buttonColor }}>{buttonText}</button>
        <h2>{output}</h2>
    </div>)

}
