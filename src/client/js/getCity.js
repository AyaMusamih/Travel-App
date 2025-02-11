export async function fetchCityData() {
    try {
        const cityName = document.getElementById("city").value.trim();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: cityName })
        };

        const res = await fetch("http://localhost:8000/getCity", requestOptions);
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Failed to fetch city data:", error);
        return { error: true, message: "Could not retrieve city information." };
    }
}
