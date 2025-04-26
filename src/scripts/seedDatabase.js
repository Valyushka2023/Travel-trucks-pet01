

import mongoose from 'mongoose';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Camper from '../../src/models/Camper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb+srv://vvpto82023:mMkyLqZFngTzKMPc@cluster0.vxst1.mongodb.net/campers?retryWrites=true&w=majority&appName=Cluster0');

    const filePath = path.join(__dirname, '../../src/db/campers.json');
    const data = await fs.readFile(filePath, 'utf8');
    const campersData = JSON.parse(data);

    await Camper.deleteMany({});
    console.log('Колекцію Camper очищено');

    const campersToInsert = campersData.items.map(camper => {
      const { _id, gallery, ...rest } = camper; // Видаляємо _id та отримуємо gallery

      let galleryArray = [];
      if (typeof gallery === 'string') {
        try {
          const galleryObjects = JSON.parse(gallery);
          if (Array.isArray(galleryObjects)) {
            galleryArray = galleryObjects.map(img => img.original); // Беремо оригінальні URL зображень
          }
        } catch (error) {
          console.error('Помилка парсингу gallery:', error);
        }
      } else if (Array.isArray(gallery)) {
        galleryArray = gallery.map(img => img.original); // Якщо gallery вже масив об'єктів
      }

      return { ...rest, gallery: galleryArray }; // Повертаємо решту полів та оброблений gallery
    });

    const insertedCampers = await Camper.insertMany(campersToInsert);
    console.log(`${insertedCampers.length} кемперів завантажено в базу даних.`);

    mongoose.disconnect();
  } catch (error) {
    console.error('Помилка завантаження даних:', error);
  }
}

seedDatabase();
