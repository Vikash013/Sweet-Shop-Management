// Simple script to test API connectivity
export const testShopsAPI = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found - please login first');
      return;
    }

    const response = await fetch('http://localhost:3002/api/shops', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const shops = await response.json();
      console.log(`✅ API working! Found ${shops.length} shops`);
      console.log('First 3 shop images:');
      shops.slice(0, 3).forEach((shop: any, index: number) => {
        console.log(`${index + 1}. ${shop.name}: ${shop.imageUrl}`);
      });
    } else {
      console.log('❌ API error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Network error:', error);
  }
};

// Add to window for easy testing
(window as any).testShopsAPI = testShopsAPI;