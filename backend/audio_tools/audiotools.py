import speech_recognition as sr
import os
from pydub import AudioSegment
from speechbrain.pretrained import SpeakerRecognition
from speechbrain.pretrained import SepformerSeparation as separator


class AudioTools:
    def __init__(self):
        self.verification = SpeakerRecognition.from_hparams(source="speechbrain/spkrec-ecapa-voxceleb", savedir="pretrained_models/spkrec-ecapa-voxceleb")
        self.diarizer= separator.from_hparams(source="speechbrain/sepformer-wsj02mix", savedir='pretrained_models/sepformer-wsj02mix')
        self.sr = sr.Recognizer()


    def transcript(self):                       
        AUDIO_FILE = "received.wav"                        
        with sr.AudioFile(AUDIO_FILE) as source:
                audio = self.sr.record(source)  # read the entire audio file                  

                return self.sr.recognize_google(audio)

    def identify(self,hash):
        score, prediction = self.verification.verify_files("received.wav", "{}.wav".format(hash))
        return prediction[0]

    def diarize(self):
        est_sources = self.diarizer.separate_file(path='received.wav') 
        self.sr.recognize_google(est_sources[:, :, 0].detach().cpu().squeeze())
        self.sr.recognize_google(est_sources[:, :, 1].detach().cpu().squeeze())
