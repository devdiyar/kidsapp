import { ImageSourcePropType } from 'react-native';

export type Activity = {
  id: string;
  title: string;
  location: string;
  date: string;
  price: string;
  imageUrl: ImageSourcePropType;
  status?: string | null;
  description?: string;
  rating: number;
  ratingCount:number;
};

export const ACTIVITIES_DATA: Activity[] = [
  {
      id: '1',
      title: 'Adventsgrabung',
      location: 'VK Stadium',
      date: '28.03 20:00',
      price: '5€',
      imageUrl: require('../../assets/images/Adventsgrabung.jpg'),
      status: null,
      description: 'Ein winterliches Abenteuer für Kinder, bei dem kleine Überraschungen im Schnee ausgegraben werden.',
      rating: 4.5,
      ratingCount: 128,
    },
    {
      id: '2',
      title: 'Illusions',
      location: 'Spielplatz an der Hörde',
      date: '07.03 14:00',
      price: 'Gratis', 
      imageUrl: require('../../assets/images/Illusion.jpg'), 
      status: 'Hat begonnen',
      rating: 2.5,
      ratingCount: 128,
    },
    {
      id: '3',
      title: "Woman's Day",
      location: 'VK Stadium',
      date: '03.04 20:00',
      price: 'Gratis',
      imageUrl: require('../../assets/images/WomansDay.jpg'),
      status: null,
      rating: 3,
      ratingCount: 128,
    },
    {
    id: '4',
    title: "Kulturrucksack Party",
    location: 'Jugendzentrum Herne',
    date: '26.03 14:00',
    price: 'Gratis',
    imageUrl: require('../../assets/images/Kulturrucksack_Party.jpg'),
    status: null,
    rating: 4.5,
    ratingCount: 128,
    },
    {
      id: '5',
      title: 'Kinder-Flohmarkt',
      location: 'Marktplatz Innenstadt',
      date: '15.06 10:00',
      price: 'Standgebühr 5€',
      imageUrl: require('../../assets/images/Flohmarkt.jpg'),
      status: 'Anmeldung\nerforderlich',
      rating: 4.5,
      ratingCount: 128,
    },
    {
      id: '6',
      title: 'Waldabenteuer für Kids',
      location: 'Stadtwald Süd',
      date: '22.06 15:00',
      price: '3€',
      imageUrl: require('../../assets/images/Waldabenteuer.jpg'),
      status: null,
      rating: 4.5,
      ratingCount: 128,
    },
    {
      id: '7',
      title: 'Märchenstunde in der Bibliothek',
      location: 'Stadtbibliothek Zentrum',
      date: '29.06 11:00',
      price: 'Gratis',
      imageUrl: require('../../assets/images/Märchenstunde.jpg'),
      status: 'Fast\nausgebucht',
      rating: 4.5,
      ratingCount: 128,
    },
    {
      id: '8',
      title: 'Sportfest der Grundschulen',
      location: 'Sportanlage West',
      date: '06.07 09:00',
      price: 'Gratis',
      imageUrl: require('../../assets/images/Sportfest.jpg'),
      status: null,
      rating: 4.5,
      ratingCount: 128,
    },
    {
      id: '9',
      title: 'Kreativwerkstatt: Töpfern',
      location: 'Kunstschule "Farbtupfer"',
      date: '13.07 14:30',
      price: '10€ Materialkosten',
      imageUrl: require('../../assets/images/Töpfern.jpg'),
      status: null,
      rating: 4.5,
      ratingCount: 128,
    },
];