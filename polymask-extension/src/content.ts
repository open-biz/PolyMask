// PolyMask Content Script
// Detects Polymarket event slugs and communicates with the popup

function getSlugFromUrl(): string | null {
  const url = window.location.href;
  // Matches polymarket.com/event/[slug] or polymarket.com/market/[slug]
  const match = url.match(/polymarket\.com\/(event|market)\/([^/?#]+)/);
  return match ? match[2] : null;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request: any, _sender: any, sendResponse: (response: any) => void) => {
  if (request.type === 'GET_MARKET_CONTEXT') {
    const slug = getSlugFromUrl();
    sendResponse({ slug });
  }
  return true;
});

console.log('PolyMask Context Detector active');
