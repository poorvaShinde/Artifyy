import { PredictionServiceClient } from '@google-cloud/aiplatform';

export async function generateImageWithGCP(prompt: string): Promise<string> {
  const base64Key = process.env.GCP_KEY_BASE64!;
  const keyJson = Buffer.from(base64Key, 'base64').toString('utf-8');
  const credentials = JSON.parse(keyJson);

  const client = new PredictionServiceClient({
    credentials,
  });

  const projectId = process.env.GCP_PROJECT_ID!;
  const location = 'us-central1';
  const publisher = 'google';
  const model = 'imagegeneration@006';

  const endpoint = `projects/${projectId}/locations/${location}/publishers/${publisher}/models/${model}`;

  const instanceValue = {
    prompt: prompt,
  };
  const instance = {
    structValue: {
      fields: {
        prompt: { stringValue: prompt },
      },
    },
  };

  const instances = [instance];
  const parameters = {
    structValue: {
      fields: {
        sampleCount: { numberValue: 1 },
      },
    },
  };

  const request = {
    endpoint,
    instances,
    parameters,
  };

//API-call
  const [response] = await client.predict(request);

  const prediction = response.predictions?.[0];
  const imageBytes = prediction?.structValue?.fields?.bytesBase64Encoded?.stringValue;

  if (!imageBytes) {
    throw new Error('No image generated from Vertex AI');
  }

  return `data:image/png;base64,${imageBytes}`;
}
