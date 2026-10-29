import { app } from "./app.js";
import { openDatabase } from "./database.js";

const database = openDatabase();
const port = Number(process.env.PORT ?? 3001);
const server = app.listen(port, () => {
  console.log(`API Sitech disponível em http://localhost:${port}`);
});

server.on("error", (error) => {
  console.error("Não foi possível iniciar a API:", error);
  database.close();
  process.exitCode = 1;
});

function shutdown(): void {
  server.close((error) => {
    database.close();
    if (error) {
      console.error("Erro ao encerrar a API:", error);
      process.exitCode = 1;
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
