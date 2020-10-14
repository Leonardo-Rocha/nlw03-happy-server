import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import Orphanage from '../models/Orphanage';
import CreateOrphanageService from '../services/createOrphanageService';
import uploadConfig from '../config/upload';

const orphanagesRouter = Router();
const upload = multer(uploadConfig)

orphanagesRouter.get('/', async (request, response) => {
  const orphanagesRepository = getRepository(Orphanage);

  const orphanages = await orphanagesRepository.find({
    relations: ['images'],
  });

  return response.json(orphanages);
});

orphanagesRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const orphanagesRepository = getRepository(Orphanage);

  try {
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });
    
    return response.json(orphanage);
  }
  catch(err) {
    return response.status(404).json({ error: err });
  }
});

orphanagesRouter.post('/', upload.array('images'), async (request, response) => {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  const requestImages = request.files as Express.Multer.File[];
  const images = requestImages.map(image => {
    return { path: image.filename };
  });

  const createOrphanage = new CreateOrphanageService();

  const orphanage = await createOrphanage.execute({
    name,
    latitude,
    longitude,
    about,
    instructions,
    openingHours: opening_hours,
    openOnWeekends: open_on_weekends,
    images,
  });

  return response.status(201).json(orphanage);
});

export default orphanagesRouter;
