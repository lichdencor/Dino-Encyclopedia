export interface AdSource {
  id: string;
  name: string;
  description: string;
  getAdCode: () => string;
}

const adSources: AdSource[] = [
  {
    id: 'picsum',
    name: 'Picsum Photos',
    description: 'Imágenes aleatorias en formato banner',
    getAdCode: () => `<img src="https://picsum.photos/728/90?random=${Math.random()}" alt="Banner" style="width:728px;height:90px;object-fit:cover;" />`,
  }
];

export const adService = {
  getAdSources: () => adSources,
  getAdSourceById: (id: string) => adSources.find(source => source.id === id),
}; 