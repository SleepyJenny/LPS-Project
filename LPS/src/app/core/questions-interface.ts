export interface QuestionsInterface {
    id: number,
    topic: string,
    type: "single-choice" | "multiple-choice" | "fill-in", // mögliche typen können mit pipe | vordefiniertt werden
    question: string,
    options: string[], // bleibt bei fill-in Fragen leer
    correctAnswer: string | string[], // erlaubt eine oder mehrere Antworten
}
