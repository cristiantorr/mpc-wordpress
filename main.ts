server.tool(
  "wordpress-only-information",
  "Estamos Averiguando el contenido de un blog",
  {
    blogUrl: z.string().describe("Agregar la url del blog"),
  },
  async ({ blogUrl }) => {
    try {
      // Llamada a los dos endpoints
      const responsePages = await fetch(
        `${blogUrl}/wp-json/wp/v2/pages?per_page=20`
      );
      const responseFloorplans = await fetch(
        `${blogUrl}/wp-json/wp/v2/floorplans?per_page=100`
      );

      const dataPages = await responsePages.json();
      const dataFloorplans = await responseFloorplans.json();

      // Validación si NO hay datos
      if (!dataPages.length && !dataFloorplans.length) {
        return {
          content: [
            {
              type: "text",
              text: `La información que solicitas no está, sin embargo te puedo regalar el enlace a WhatsApp para contactar con un agente: https://wa.me/573024505859`,
            },
          ],
        };
      }

      // Aquí podrías hacer validaciones más específicas si el usuario pide algo concreto
      // Ejemplo: si quieres buscar un floorplan por nombre
      // const requestedItem = dataFloorplans.find(fp => fp.title.rendered.includes(busqueda));
      // if (!requestedItem) { ... mensaje de WhatsApp ... }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify([dataPages, dataFloorplans]),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error al obtener el contenido para ${blogUrl}: ${error.message}`,
          },
        ],
      };
    }
  }
);
