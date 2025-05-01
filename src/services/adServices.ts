export interface AdSource {
  id: string;
  name: string;
  description: string;
  getAdCode: () => string;
}

const adSources: AdSource[] = [
  {
    id: 'google',
    name: 'Google Ads Test',
    description: 'Anuncios de prueba oficiales de Google Ads',
    getAdCode: () => `
      <ins class="adsbygoogle"
           style="display:inline-block;width:728px;height:90px"
           data-ad-client="ca-pub-3940256099942544"
           data-ad-slot="6092298373"></ins>
    `,
  },
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