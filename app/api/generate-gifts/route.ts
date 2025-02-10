import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Configure longer timeout
export const maxDuration = 300 // 5 minutes timeout
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

type GiftSuggestion = {
  name: string
  price: string
  reason: string
  whereToBuy: string
  message: string
  imagePrompt: string
}

const DEFAULT_STORES = {
  amazon: 'https://www.amazon.com/s?k=',
  etsy: 'https://www.etsy.com/search?q=',
  walmart: 'https://www.walmart.com/search?q='
}

function generateShoppingLink(product: string, store: string): string {
  const cleanProduct = encodeURIComponent(product.toLowerCase().trim())
  const storeLower = store.toLowerCase()
  
  if (storeLower.includes('amazon')) {
    return `${DEFAULT_STORES.amazon}${cleanProduct}`
  }
  if (storeLower.includes('etsy')) {
    return `${DEFAULT_STORES.etsy}${cleanProduct}`
  }
  if (storeLower.includes('walmart')) {
    return `${DEFAULT_STORES.walmart}${cleanProduct}`
  }
  
  // Default to Amazon if store is not recognized
  return `${DEFAULT_STORES.amazon}${cleanProduct}`
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 180000, // 3 minutes timeout for OpenAI requests
})

type OpenAIError = {
  status?: number;
  message?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { partnerName, ageRange, hobbies, interests, priceRange, occasion, allergies } = body

    // Validate required fields
    if (!partnerName || !ageRange || !hobbies || !priceRange || !occasion) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `As a thoughtful gift advisor, suggest 5 perfect Valentine's Day gifts for ${partnerName}. 
    Consider the following details:
    - Age Range: ${ageRange}
    - Hobbies: ${hobbies.join(', ')}
    - Interests: ${interests || 'Not specified'}
    - Price Range: ${priceRange}
    - Occasion: ${occasion}
    - Avoid/Allergies: ${allergies || 'None specified'}

    Please provide the response in the following JSON format:
    {
      "suggestions": [
        {
          "name": "Specific Product Name",
          "price": "$XX.XX - Price should always include dollar sign",
          "reason": "Why it's perfect",
          "whereToBuy": "Specify only: Amazon, Etsy, or Walmart",
          "message": "Romantic message",
          "imagePrompt": "A clear, detailed description for generating an image of this gift"
        }
      ]
    }

    Make sure to provide exactly 5 gift suggestions. For each suggestion:
    - Name should be a specific product (e.g., "Personalized Heart Photo Frame" instead of just "Photo Frame")
    - Price must include dollar sign
    - WhereToBuy must be either Amazon, Etsy, or Walmart only
    - Include a romantic message
    - Provide a clear image description`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7
    })

    const responseText = completion.choices[0].message.content || '{}'
    let suggestions
    
    try {
      suggestions = JSON.parse(responseText)
      
      // Generate images and proper shopping links for each suggestion
      const suggestionsWithImages = await Promise.all(
        suggestions.suggestions.map(async (suggestion: GiftSuggestion) => {
          try {
            const image = await openai.images.generate({
              model: "dall-e-3",
              prompt: suggestion.imagePrompt + ". Photorealistic product photography style, clean background, high quality, professional lighting.",
              size: "1024x1024",
              quality: "standard",
              n: 1,
            });

            // Generate proper shopping link
            const shoppingLink = generateShoppingLink(suggestion.name, suggestion.whereToBuy)

            return {
              ...suggestion,
              imageUrl: image.data[0]?.url || null,
              whereToBuy: shoppingLink
            };
          } catch (error) {
            console.error('Error generating image:', error);
            return {
              ...suggestion,
              imageUrl: null,
              whereToBuy: generateShoppingLink(suggestion.name, suggestion.whereToBuy)
            };
          }
        })
      );

      suggestions.suggestions = suggestionsWithImages;
    } catch (error) {
      console.error('Error parsing OpenAI response:', error)
      return NextResponse.json(
        { error: 'Failed to parse gift suggestions' },
        { status: 500 }
      )
    }

    return NextResponse.json(suggestions)
  } catch (error: unknown) {
    console.error('Error generating gift suggestions:', error)
    const err = error as OpenAIError
    return NextResponse.json(
      { 
        error: 'Failed to generate gift suggestions',
        details: err.message || 'Unknown error'
      },
      { status: err.status || 500 }
    )
  }
} 