export async function callLLM(
    modelName: string,
    apiKey: string,
    messages: { role: string; content: string }[],
    baseUrl: string
): Promise<string> {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: modelName,
                api_key: apiKey,
                messages: messages,
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error as Error;
    }
}
