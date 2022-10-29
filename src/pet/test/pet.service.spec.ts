import { PrismaService } from '../../prisma/prisma.service';
import { PetService } from '../pet.service';
import { v4 as uuidv4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';

const testPet = 'dog1';
const testAge = 1;
const typeId = uuidv4();
const statusId = 1;

const petArray = [
  { name: testPet, age: testAge, typeId, statusId },
  { name: 'Test Cat 2', age: 2, typeId, statusId },
  { name: 'Test Cat 3', age: 3, typeId, statusId },
];

const onePet = petArray[0];

const db = {
  pet: {
    findMany: jest.fn().mockResolvedValue(petArray),
    findUnique: jest.fn().mockResolvedValue(onePet),
  },
};

describe('PetService', () => {
  let petService: PetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    petService = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(petService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of pets', async () => {
      const pets = await petService.findAll();

      expect(pets).toEqual(petArray);
    });
  });

  describe('getOne', () => {
    it('should return one pet', async () => {
      expect(petService.findOne(9)).resolves.toEqual(onePet);
    });
  });
});
