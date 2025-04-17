import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/* 
AUTENTIFICACIÓN BÁSICA
const username = 'torres';
const password = 'admin';
const auth = Buffer.from(`${username}:${password}`).toString('base64'); 
*/

/* 
AUTENTIFICACIÓN CON JWT TOKEN

// Primero obtienes el token
const getToken = async (blogUrl: string, username: string, password: string) => {
  const tokenResponse = await fetch(`${blogUrl}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });
  
  const tokenData = await tokenResponse.json();
  return tokenData.token;
};

// Luego lo usas en tu petición
const token = await getToken(blogUrl, 'tu-usuario', 'tu-contraseña');
const response = await fetch(`${blogUrl}/wp-json/wp/v2/posts?per_page=10`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
*/

// 1. Crear el servidor

const server = new McpServer({
  name: 'Wordpress only information',
  version: '1.0.0',
})

// 2. Definir las herramientas
// Las herramientas le permite al LLM realizar acciones a través de tu servidor.
// 

server.tool(
  'wordpress-only-information',
  'Estamos Averiguando el contenido de un blog',
  {
    blogUrl: z.string().describe('Agregar la url del blog'),
  },

  async({ blogUrl }) => {
    try {

      const responsePages = await fetch(`${blogUrl}/wp-json/wp/v2/pages?per_page=20`);
      const response = await fetch(`${blogUrl}/wp-json/wp/v2/Productos?per_page=20`);

      const data = await response.json();
      const dataPages = await responsePages.json();

      if(!data.length || !dataPages.length){ 
        return {
            content: [
                {
                    type: 'text',
                    text: `No se encontró el blog ${blogUrl}`
                }
            ]
        };
      }

      return {
        content: [
            {
                type: 'text',
                text: JSON.stringify([data, dataPages])
            }
        ]
     }; 

    } catch (error) {
      return {
        content: [
            {
                type: 'text',
                text: `Error al obtener el contenido para ${blogUrl}: ${error.message}`
            }
        ]
    };
    }
  },
  
  
) 

const transport = new StdioServerTransport()
await server.connect(transport)