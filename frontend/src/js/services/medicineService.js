async function searchMedicine(name) {
  return apiRequest(`/medicines/search?name=${encodeURIComponent(name)}`, {
    method: "GET",
  });
}
async function identifyMedicineFromImage(imageFile) {
  const token = getToken();
  const formData = new FormData();
  formData.append("image", imageFile);
  const response = await fetch(`${API_BASE_URL}/ocr/identify`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "OCR request failed");
  return data;
}
