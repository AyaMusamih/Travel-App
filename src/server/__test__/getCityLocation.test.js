const { findCityCoordinates } = require('../findCityCoordinates');

describe('findCityCoordinates', () => {
    let fetchMock;

    beforeAll(() => {
        // Create a mock for global fetch
        fetchMock = jest.fn();
        global.fetch = fetchMock;
    });

    afterEach(() => {
        // Clear all mock calls after each test
        fetchMock.mockClear();
    });

    afterAll(() => {
        // Reset global fetch after tests are complete
        global.fetch = undefined;
    });

    it('successfully fetches city location for a valid city name', async () => {
        const city = 'London';
        const mockLocationData = {
            postalCodes: [
                { placeName: city, lat: 51.509865, lng: -0.118092 }
            ]
        };

        fetchMock.mockResolvedValue({
            status: 200,
            json: async () => mockLocationData
        });

        const response = await findCityCoordinates(city);

        expect(response).toEqual({
            latitude: 51.509865,
            longitude: -0.118092,
            city: city
        });
    });

    it('returns a friendly error if no city is found', async () => {
        const city = 'UnknownCity';
        const emptyResponse = { postalCodes: [] };

        fetchMock.mockResolvedValue({
            status: 200,
            json: async () => emptyResponse
        });

        const response = await findCityCoordinates(city);

        expect(response).toEqual({
            message: 'City Not Found, Please Check the Spelling',
            errorOccurred: true
        });
    });

    it('handles fetch failures gracefully', async () => {
        const city = 'London';
        const errorMessage = 'Failed to fetch data';

        fetchMock.mockRejectedValue(new Error(errorMessage));

        const response = await findCityCoordinates(city);

        expect(response).toEqual({
            message: errorMessage,
            errorOccurred: true
        });
    });
});
