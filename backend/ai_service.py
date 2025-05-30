import os
from dotenv import load_dotenv

load_dotenv()

# Check if AI summarization should be enabled
ENABLE_AI_SUMMARY = os.getenv("GOOGLE_API_KEY") and os.getenv("GOOGLE_API_KEY") != "your-google-api-key-here"

if ENABLE_AI_SUMMARY:
    try:
        from langchain_google_genai import ChatGoogleGenerativeAI
        from langchain.schema import HumanMessage
        
        # Initialize the Gemini model
        llm = ChatGoogleGenerativeAI(
            model=os.getenv("GEMINI_MODEL", "gemini-2.0-flash"),
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.3
        )
    except Exception as e:
        print(f"Warning: Could not initialize AI service: {e}")
        ENABLE_AI_SUMMARY = False

def summarize_text(text: str) -> str:
    """
    Summarize the given text using Google Gemini via LangChain
    Falls back to basic summary if AI is not available
    """
    if not ENABLE_AI_SUMMARY:
        # Basic fallback summary - first 150 characters
        if len(text) <= 150:
            return text
        return text[:150] + "..."
    
    try:
        prompt = f"""
        Please provide a concise and informative summary of the following text. 
        Focus on the main ideas, key points, and important details. 
        Keep the summary clear and easy to understand.
        
        Text to summarize:
        {text}
        
        Summary:
        """
        
        message = HumanMessage(content=prompt)
        response = llm([message])
        
        return response.content.strip()
    
    except Exception as e:
        print(f"Error summarizing text: {e}")
        # Fallback to basic summary
        if len(text) <= 150:
            return text
        return text[:150] + "..." 