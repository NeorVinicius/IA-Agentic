import { useEffect, useState } from "react";

type ApiStatus = "checking" | "available" | "unavailable";

function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    fetch("/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`A API respondeu com HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((body: unknown) => {
        const isHealthy =
          typeof body === "object" &&
          body !== null &&
          "status" in body &&
          body.status === "ok";
        setApiStatus(isHealthy ? "available" : "unavailable");
      })
      .catch(() => {
        setApiStatus("unavailable");
      });
  }, []);

  const statusMessage = {
    checking: "Verificando conexão com a API...",
    available: "API conectada",
    unavailable: "API indisponível. Inicie os serviços e tente novamente.",
  }[apiStatus];

  return (
    <main className="page">
      <section className="welcome" aria-labelledby="page-title">
        <p className="eyebrow">Fundação do projeto</p>
        <h1 id="page-title">Sitech</h1>
        <p className="intro">
          Um espaço para conhecer a escola, seus cursos e as novidades da
          comunidade.
        </p>
        <p
          className={`api-status api-status--${apiStatus}`}
          role="status"
          aria-live="polite"
        >
          <span className="status-dot" aria-hidden="true" />
          {statusMessage}
        </p>
      </section>
    </main>
  );
}

export default App;
