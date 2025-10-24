import mongoose from 'mongoose';
import { config } from './config';
import { User } from './models/User';
import { randomUUID } from 'crypto';
import { Cocktail } from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('cocktails');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not created');
  }

  const [user, user2, admin] = await User.create(
    {
      username: 'user',
      password: '123',
      displayName: 'user1 USERNAME',
      role: 'user',
      mail: 'user@gmail.com',
      avatar: 'fixtures/userPic.png',
      token: randomUUID(),
    },
    {
      username: 'user2',
      password: '123',
      displayName: 'User2 USERNAME',
      role: 'user',
      avatar: 'fixtures/userPic.png',
      mail: 'user2@gmail.com',
      token: randomUUID(),
    },
    {
      username: 'admin',
      password: '123',
      displayName: 'Admin Username',
      role: 'admin',
      avatar: 'fixtures/adminPic.jpg',
      mail: 'user2@gmail.com',
      token: randomUUID(),
    },
  );

  const [cocktail1, cocktail2, cocktail3, cocktail4] = await Cocktail.create(
    {
      user: user,
      title: 'Hurricane cocktail',
      image: 'fixtures/hurricane.webp',
      receipt:
        'Our tropical, rum-based hurricane cocktail is easy to make and sure to get your party started. Garnish with orange and cocktail cherries for a kitsch touch',
      isPublished: false,
      ingredients: [
        { title: 'dark rum', amount: '50ml' },
        { title: ' white rum', amount: '50ml' },
        { title: 'Lemon', amount: '1' },
        { title: 'passion fruit', amount: '1' },
      ],
      ratings: [{ user: user2, rating: 3 }, { user: user, rating: 1}],
    },

    {
      user: user,
      title: 'Bloody mary',
      image: 'fixtures/bloodyMary.jpg',
      receipt:
        "Try your hand at recreating a classic 1920s cocktail, the sidecar. It's easy to adapt – simply use cognac, or go with equal parts cognac, triple sec and lemon juice",
      isPublished: true,
      ingredients: [
        { title: 'dark rum', amount: '50ml' },
        { title: ' white rum', amount: '50ml' },
        { title: 'Lemon', amount: '1' },
        { title: 'passion fruit', amount: '1' },
      ],
      ratings: [{ user: user2, rating: 4 }, { user: user, rating: 3 }],
    },

    {
      user: user2,
      title: 'Classic champagne cocktail',
      image: 'fixtures/chap.webp',
      receipt:
        'Serve this cocktail in a flute so the sugar cube sinks to the bottom – it will drive the bubbles upward. Prosecco, crémant and cava also work well',
      isPublished: false,
      ingredients: [
        { title: 'dark rum', amount: '50ml' },
        { title: ' white rum', amount: '50ml' },
        { title: 'Lemon', amount: '1' },
        { title: 'passion fruit', amount: '1' },
      ],
      ratings: [{ user: user, rating: 2 }, { user: user2, rating: 3 }],
    },

    {
      user: user2,
      title: 'Woo woo',
      image: 'fixtures/woo.webp',
      receipt:
        'Mix vodka, peach schnapps, cranberry juice and fresh lime to make this perfect party cocktail, garnished with a lime wedge (and maybe a tiny umbrella too)',
      isPublished: true,
      ingredients: [
        { title: 'dark rum', amount: '50ml' },
        { title: ' white rum', amount: '50ml' },
        { title: 'Lemon', amount: '1' },
        { title: 'passion fruit', amount: '1' },
      ],
      ratings: [{ user: user, rating: 5 },{ user: user2, rating: 4 }],
    },
  );
  await db.close();
};

run().catch((e) => console.error(e));
