export async function fetchCityImage(cityName) {
    try {
        const requestOptions = {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ city: cityName })
        };

        const res = await fetch("http://localhost:8000/getCityPicture", requestOptions);
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching city image:", error);
        return { error: true, message: "Unable to load city image." };
    }
}
