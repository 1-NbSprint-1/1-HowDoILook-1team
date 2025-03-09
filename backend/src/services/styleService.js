import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createStyle = async (styleData, tagNames) => {
  return await prisma.$transaction(async (prisma) => {
    const tags = await Promise.all(
      tagNames.map(async (name) => {
        const tag = await prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        });
        return tag;
      })
    );

    const newStyle = await prisma.style.create({
      data: {
        ...styleData,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
    });

    return newStyle;
  });
};

const updateStyle = async (styleId, styleData, tagNames) => {
  console.log(styleData);
  return await prisma.$transaction(async (prisma) => {
    let tagConnections = {};

    if (Array.isArray(tagNames)) {
      const tags = await Promise.all(
        tagNames.map(async (name) => {
          const tag = await prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          });
          return tag;
        })
      );

      console.log(styleData);

      tagConnections = {
        set: [], // 기존 관계를 제거
        connect: tags.map((tag) => ({ id: tag.id })),
      };
    }

    const updatedStyle = await prisma.style.update({
      where: { id: styleId },
      data: {
        ...styleData,
        ...(Array.isArray(tagNames) && { tags: tagConnections }),
      },
    });

    return updatedStyle;
  });
};

export default { createStyle, updateStyle };
