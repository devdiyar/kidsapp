export type Review = {
  id: string;
  activityId: string;
  name: string;
  comment: string;
  rating: number;
};

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    activityId: '1',
    name: 'Frank H.',
    comment: 'Super tolles Event für die Kleinen!',
    rating: 5,
  },
  {
    id: 'r2',
    activityId: '1',
    name: 'Sabine M.',
    comment: 'Als alleinerziehende Mutter war ich sehr dankbar!',
    rating: 4.5,
  },
  {
    id: 'r3',
    activityId: '1',
    name: 'Tom K.',
    comment: 'War leider etwas zu laut für meine Tochter.',
    rating: 3,
  },
];