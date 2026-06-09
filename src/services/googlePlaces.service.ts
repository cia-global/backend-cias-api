
export async function getPlaceDetails(placeId: string) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,reviews",
        "Accept-Language": "es",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Google Places Error: ${response.status}`
    );
  }

  return response.json();
}