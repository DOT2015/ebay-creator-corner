import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching Amazon product data from:', url);

    // Fetch the Amazon page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Amazon page: ${response.status}`);
    }

    const html = await response.text();

    // Extract product title
    let title = '';
    const titleMatch = html.match(/<span id="productTitle"[^>]*>(.*?)<\/span>/s);
    if (titleMatch) {
      title = titleMatch[1].trim().replace(/\s+/g, ' ');
    }

    // Extract price - try multiple selectors
    let price = '';
    const pricePatterns = [
      /<span class="a-offscreen"[^>]*>\$([\d,]+\.?\d*)<\/span>/,
      /<span class="a-price-whole"[^>]*>([\d,]+\.?\d*)<\/span>/,
      /<span[^>]*class="[^"]*a-price[^"]*"[^>]*>.*?\$([\d,]+\.?\d*).*?<\/span>/s,
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        // Clean up the price - remove commas and any HTML tags
        const priceValue = match[1].replace(/,/g, '').replace(/<[^>]*>/g, '');
        price = `$${priceValue}`;
        break;
      }
    }

    // Extract main product image
    let imageUrl = '';
    const imagePatterns = [
      /"hiRes":"(https:\/\/[^"]+)"/,
      /"large":"(https:\/\/[^"]+)"/,
      /id="landingImage"[^>]*src="([^"]+)"/,
    ];

    for (const pattern of imagePatterns) {
      const match = html.match(pattern);
      if (match) {
        imageUrl = match[1];
        break;
      }
    }

    console.log('Extracted product data:', { title, price, imageUrl });

    if (!title && !price && !imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Could not extract product data from Amazon page' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        title: title || 'Title not found',
        price: price || 'Price not found',
        image_url: imageUrl || '',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching Amazon product:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch product data';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
