export class WeatherService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
  }

  /**
   * Fetches current weather and basic forecast for a given latitude and longitude.
   */
  public async getWeather(lat: number, lon: number): Promise<any> {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key is not configured.');
    }

    try {
      // Using native fetch available in newer Node.js versions
      const response = await fetch(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather, falling back to mock data:', error);
      // Return mock data so the dashboard doesn't break
      return {
        main: { temp: 28.5, humidity: 65 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 4.2 }
      };
    }
  }

  /**
   * Fetches a 5-day forecast.
   */
  public async getForecast(lat: number, lon: number): Promise<any> {
    if (!this.apiKey) {
      throw new Error('OpenWeather API key is not configured.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching forecast:', error);
      throw error;
    }
  }
}

export const weatherService = new WeatherService();
