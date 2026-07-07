import React, { useState, useRef, useEffect } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isFileProcessing, setIsFileProcessing] = useState(false);

  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  // Инициализация микрофона (Google Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "ru-RU";

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        // Пересобираем весь текст с нуля, чтобы избежать дублирования из Снимок.PNG
        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        // Выводим чистый итоговый текст + промежуточный в конце
        setText(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Ошибка распознавания:", event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  // Локальная транскрибация файла (для учебных целей без сервера)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsFileProcessing(true);
    setText("Инициализация модели Whisper...");

    try {
      const { pipeline } = await import("@huggingface/transformers");

      // Используем стабильную модель от onnx-community и отключаем квантование через dtype: 'fp32'
      const transcriber = await pipeline(
        "automatic-speech-recognition",
        "onnx-community/whisper-tiny",
        {
          dtype: "fp32",
        },
      );

      setText("Декодирование аудиофайла...");

      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const audioData = audioBuffer.getChannelData(0);

      setText("Whisper обрабатывает аудио локально...");
      const result = await transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
      });

      setText(`[Успешно распознано локально через Whisper]:\n\n${result.text}`);
    } catch (error) {
      console.error(error);
      setText(
        `Ошибка локальной обработки: ${error.message}\n\nУбедитесь, что загружаемый файл — валидный аудиофайл.`,
      );
    } finally {
      setIsFileProcessing(false);
      event.target.value = null;
    }
  };

  return (
    <div className="app-container">
      <div className="transcriber-box">
        <h2>Аудио Транскрибатор</h2>

        <div className="controls">
          <button
            className={`btn mic-btn ${isRecording ? "recording" : ""}`}
            onClick={toggleRecording}
            disabled={isFileProcessing}
          >
            {isRecording ? "⏹ Остановить запись" : "🎙 Запись с микрофона"}
          </button>

          <button
            className="btn upload-btn"
            onClick={() => fileInputRef.current.click()}
            disabled={isFileProcessing || isRecording}
          >
            📂 {isFileProcessing ? "Обработка..." : "Загрузить AUDIO"}
          </button>

          <input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
        </div>

        <div className="textarea-wrapper">
          <textarea
            className="text-display"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Здесь появится распознанный текст..."
          />
        </div>
      </div>
    </div>
  );
}
