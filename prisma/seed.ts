import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import {
  ApiResponse,
  DistrictApiResponse,
  DivisionApiResponse,
  UnionApiResponse,
  UpazilaApiResponse,
} from 'src/types/locations';

const prisma = new PrismaClient();

async function main() {
  const divisionsRes = await fetch('https://bdapi.vercel.app/api/v.1/division');
  const { data } = (await divisionsRes.json()) as ApiResponse<
    DivisionApiResponse[]
  >;

  for (const div of data) {
    const createdDiv = await prisma.division.create({
      data: {
        name: div.name,
        bn_name: div.bn_name,
        url: div.url,
      },
    });

    const districtsRes = await fetch(
      `https://bdapi.vercel.app/api/v.1/district/${div.id}`,
    );
    const { data: districts } = (await districtsRes.json()) as ApiResponse<
      DistrictApiResponse[]
    >;

    for (const dis of districts) {
      const createdDis = await prisma.district.create({
        data: {
          name: dis.name,
          bn_name: dis.bn_name,
          url: dis.url,
          divisionId: createdDiv.id,
          lat: dis.lat,
          lon: dis.lon,
        },
      });

      const upazilasRes = await fetch(
        `https://bdapi.vercel.app/api/v.1/upazilla/${dis.id}`,
      );
      const { data: upazilas } = (await upazilasRes.json()) as ApiResponse<
        UpazilaApiResponse[]
      >;

      for (const upa of upazilas) {
        const createdUpa = await prisma.upazila.create({
          data: {
            name: upa.name,
            bn_name: upa.bn_name,
            url: upa.url,
            districtId: createdDis.id,
          },
        });

        const unionsRes = await fetch(
          `https://bdapi.vercel.app/api/v.1/union/${upa.id}`,
        );
        const { data: unions } = (await unionsRes.json()) as ApiResponse<
          UnionApiResponse[]
        >;

        for (const union of unions) {
          await prisma.union.create({
            data: {
              name: union.name,
              bn_name: union.bn_name,
              url: union.url,
              upazilaId: createdUpa.id,
            },
          });
        }
      }
    }
  }

  console.log('✅ Seeding complete');
}

void (async () => {
  try {
    await main();
  } catch (e) {
    console.error('❌ Error during seeding', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
