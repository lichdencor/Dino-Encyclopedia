export interface DinoApiResponse {
  Name: string;
  Description: string;
}


export async function getRandomDinoFact(): Promise<string> {
  try {
    const res = await fetch('https://dinosaur-facts-api.shultzlab.com/dinosaurs/random');
    if (!res.ok) throw new Error('No se pudo obtener el fact de dinosaurio');
    const data: DinoApiResponse = await res.json();
    if (data && data.Name && data.Description) {
      return `You know that the ${data.Name} ${data.Description}`;
    } else {
      return 'No fact found for any dinosaur.';
    }
  } catch (e) {
    return 'No se pudo obtener un dato de dinosaurio en este momento.';
  }
}
