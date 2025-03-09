import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPopularTags = async () => {
  const popularTags = await prisma.tag.findMany({
    where:{
      styles : {
        some : {}
      }
    }, orderBy : {
      styles : {
        _count : "desc"
      }
    },
    take:10,
    include : {
    _count : {
      select : {styles : true}
    }
    }
  });

  return popularTags.filter(tag => tag._count.styles > 3);
};

export default { getPopularTags };