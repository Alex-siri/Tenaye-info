const geminiModel = require('../config/gemini');
const Medicine = require('../models/Medicine');

const getRelevantMedicines = async (question) => {
    const words = question.split(/\s+/).filter((w) => w.length > 3);
    if (words.length === 0) return [];

    const regexes = words.map((w) => new RegExp(w, 'i'));

    const matches = await Medicine.find({
        $or: regexes.flatMap((r) => [{ 'name.en': r }, { genericName: r }]),
    }).limit(3);

    return matches;
};

const buildContext = (medicines) => {
    if (medicines.length === 0) return 'No specific medicine data was found for this question.';

    return medicines
        .map(
            (m) =>
                `Medicine: ${m.name.en}\nPurpose: ${m.purpose?.en || 'N/A'}\nDosage: ${m.dosage?.en || 'N/A'}\nSide Effects: ${m.sideEffects?.en || 'N/A'}\nWarnings: ${m.warnings?.en || 'N/A'}`
        )
        .join('\n\n');
};

const askChatbot = async (question, isFirstMessage) => {
    const relevantMedicines = await getRelevantMedicines(question);
    const context = buildContext(relevantMedicines);

    const prompt = `You are Tenaye AI, a medicine information assistant for Ethiopian users. You provide educational information only and always remind users to consult a doctor or pharmacist for medical decisions. Never invent dosages or facts not in the provided context.

    ${isFirstMessage ? "Since this is the first interaction, you MUST introduce yourself by explicitly saying 'Hello! I am Tenaye AI, your medicine information assistant.' before addressing the user's question." : "Do NOT introduce yourself, greet the user, or repeat the disclaimer. Get straight to the answer."}

Relevant medicine data:
${context}

User question: ${question}

Answer clearly and briefly, in a friendly and helpful tone.`;

    const result = await geminiModel.generateContent(prompt);
    let responseText = result.response.text();

    if (isFirstMessage) {
        // Guarantee introduction
        const intro = "Hello! I am Tenaye AI, your medicine information assistant.";
        if (!responseText.includes("Tenaye AI")) {
            responseText = `${intro} ${responseText}`;
        }
    }

    return responseText;
};

module.exports = { askChatbot };