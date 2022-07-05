import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { AppModule } from '../../app.module';
import { TypeService } from '../type.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('TypeService DB', () => {
  let prisma: PrismaService;
  let typeService: TypeService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    typeService = moduleRef.get(TypeService);

    await prisma.cleanDatabase();
  });

  it('types should be empty on init', async () => {
    const types = await typeService.findAll();

    expect(types).toEqual([]);
  });

  describe('Create a new type', () => {
    it('should create type', async () => {
      const typeName = 'cat';
      const newType = await typeService.create(typeName);

      expect(newType).toEqual({
        id: expect.any(Number),
        name: typeName,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should throw an error on creating without name', async () => {
      try {
        await typeService.create(null);
      } catch (error) {
        expect(error.statusCode).toBe(400);
      }
    });

    it('should throw an error on creating with duplicate name', async () => {
      const typeName = 'cat';

      try {
        await typeService.create(typeName);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('Find types', () => {
    it('types should has value', async () => {
      const types = await typeService.findAll();

      expect(types).toEqual([
        {
          id: expect.any(Number),
          name: expect.any(String),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ]);
    });
  });

  describe('Update a type', () => {
    it('should update type', async () => {
      const oldType = await prisma.type.findUnique({ where: { name: 'cat' } });
      const typeName = 'dog';

      const updatedType = await prisma.type.update({
        data: { name: typeName },
        where: { id: oldType.id },
      });

      expect(updatedType).toEqual({
        id: expect.any(Number),
        name: typeName,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should throw an error on updating without id', async () => {
      try {
        await typeService.update({ id: null, name: 'alpaca' });
      } catch (error) {
        expect(error.statusCode).toBe(400);
      }
    });

    it('should throw an error on updating without name', async () => {
      const type = await prisma.type.findFirst();

      try {
        await typeService.update({ id: type.id, name: null });
      } catch (error) {
        expect(error.statusCode).toBe(400);
      }
    });
  });

  describe('Delete a type', () => {
    it('should delete type', async () => {
      const type = await prisma.type.findUnique({ where: { name: 'dog' } });

      await typeService.delete(type.id);

      try {
        await typeService.findById(type.id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw an error on deleting id that not exist', async () => {
      try {
        await typeService.delete(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should throw an error on deleting without id', async () => {
      try {
        await typeService.delete(null);
      } catch (error) {
        expect(error.statusCode).toBe(404);
      }
    });
  });
});
