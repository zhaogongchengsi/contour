import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { join } from "path";

import DefaultLayout from "./layout/default";

const layouts = {
  default: DefaultLayout,
};

const setup = async () => {
  const router = new Bun.FileSystemRouter({
    style: "nextjs",
    dir: join(import.meta.dir, "pages"),
  });

  const isDev = Bun.env.mode === "development";

  const { routes } = router;

  const staticConfig = isDev ? {} : { assets: "static", prefix: "/assets" };

  const app = new Elysia()
    .use(swagger())
    .use(html())
    .use(
      staticPlugin({
        ...staticConfig,
        ignorePatterns: ["static/index.html"],
      })
    );

  for (const [path, file] of Object.entries(routes)) {
    const { meta, page: Page } = await import(file);

    if (!path) {
      console.warn(`${file} does not export a page function`);
      return;
    }

    const _meta = Object.assign(
      { method: "get", title: "App Title", description: "app description", layout: "default" },
      meta
    );

    const { method, layout } = _meta;

    const render = () => {
      if (Object.keys(layouts).includes(layout)) {
        const PageLayout = layouts[layout as keyof typeof layouts];
        return (
          <PageLayout meta={_meta}>
            <Page />
          </PageLayout>
        );
      }

      return (
        <DefaultLayout meta={meta}>
          <Page />
        </DefaultLayout>
      );
    };

    switch (method) {
      case "get":
        app.get(path, render);
        break;
      case "post":
        app.post(path, render);
        break;
      case "put":
        app.put(path, render);
        break;
      default:
        break;
    }
  }

  app.get('edit', async () => {
    const html = Bun.file(join(import.meta.dir, "../static/index.html"), { type: "application/html" });
    return await html.text();
  })

  app.listen(4567);

  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
};

await setup();
