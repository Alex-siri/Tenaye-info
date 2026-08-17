const visionClient = require("../config/googleVision");
const extractTextFromImage = async (imageBuffer) => {
  const [result] = await visionClient.textDetection({
    image: { content: imageBuffer },
  });
  const detections = result.textAnnotations;
  if (!detections || detections.length === 0) {
    return "";
  }
  return detections[0].description;
};
module.exports = { extractTextFromImage };
