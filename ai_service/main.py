from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import pytesseract
from PIL import Image
import io

app = FastAPI(title="HR Smart Onboarding - AI Service")

class DocumentAnalysisResult(BaseModel):
    document_type: str
    confidence: float
    extracted_text: str
    missing_fields: List[str]

@app.get("/")
def read_root():
    return {"message": "AI Service for HR Smart Onboarding is running."}

@app.post("/analyze-document", response_model=DocumentAnalysisResult)
async def analyze_document(file: UploadFile = File(...)):
    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))
        
        # OCR using Tesseract
        text = pytesseract.image_to_string(image)
        
        # Here we would normally use HuggingFace and spaCy for classification
        # For demonstration:
        doc_type = "Unknown"
        if "carte" in text.lower() or "identity" in text.lower() or "cin" in text.lower():
            doc_type = "ID_CARD"
        elif "contrat" in text.lower() or "contract" in text.lower():
            doc_type = "CONTRACT"
        elif "rib" in text.lower() or "banque" in text.lower() or "bank" in text.lower():
            doc_type = "BANK_DETAILS"
            
        return DocumentAnalysisResult(
            document_type=doc_type,
            confidence=0.85,
            extracted_text=text[:500], # return first 500 chars
            missing_fields=[]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
