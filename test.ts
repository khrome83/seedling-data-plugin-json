import {
  assertEquals,
} from "https://deno.land/std@0.70.0/testing/asserts.ts";
// import { denock } from "https://deno.land/x/denock@0.2.0/mod.ts";
// Fixed type issue until https://github.com/SachaCR/denock/issues/7 is merged
import { denock } from "https://raw.githubusercontent.com/use-seedling/denock/master/mod.ts";
import json from "./mod.ts";

const response = {
  success: (data: Record<string, unknown>) => {
    return data;
  },
  skip: (data: Record<string, unknown>) => {
    return data;
  },
  error: (data: Record<string, unknown>) => {
    return data;
  },
  end: (data: Record<string, unknown>) => {
    return data;
  },
  retry: (data: Record<string, unknown>) => {
    return data;
  },
};

Deno.test("JSON in body of data directive", async () => {
  const request = {
    attrs: {},
    body: `
      {
        "foo": "bar"
      }
    `,
    root: Deno.cwd(),
  };

  const output = await json(request, response);

  assertEquals(output, { foo: "bar" });
});

Deno.test("JSON from file attribute of data directive", async () => {
  const request = {
    attrs: {
      file: "test.json",
    },
    body: "",
    root: Deno.cwd(),
  };

  const output = await json(request, response);

  assertEquals(output, { foo: "bar" });
});

Deno.test("JSON from url attribute of data directive", async () => {
  const request = {
    attrs: {
      url: "https://example.com/test.json",
    },
    body: "",
    root: Deno.cwd(),
  };

  denock({
    method: "GET",
    protocol: "https",
    host: "example.com",
    path: "/test.json",
    replyStatus: 200,
    responseBody: { foo: "bar" },
  });

  const output = await json(request, response);

  assertEquals(output, { foo: "bar" });
});
