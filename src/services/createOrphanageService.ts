import { getRepository } from 'typeorm';

import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

export interface Request {
  name:             string;
  latitude:         number;
  longitude:        number;
  about:            string;
  instructions:     string;
  openingHours:     string;
  openOnWeekends:   boolean;
  images:           Image[];
}

export default class CreateOrphanageService {
  public async execute(data: Request): Promise<Orphanage> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return orphanage;
  }
}
