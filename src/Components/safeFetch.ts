import { z } from "zod";
import { UserSchema } from "./UserInput";

type Response<Type> =
  | {
      success: true;
      status: number;
      data: Type;
    }
  | {
      success: false;
      status: number | null;
      error: string;
    };

type Methods = "GET" | "POST" | "PATCH" | "DELETE";

export const safeFetch = async <Schema extends z.ZodTypeAny>(
  method: Methods,
  url: string,
  schema: Schema,
  payload?: UserSchema
): Promise<Response<z.infer<typeof schema>>> => {
  console.log("first");
  try {
    console.log("second");
    const response = await fetch(url, {
      method,
      headers: payload
        ? {
            "Content-Type": "application/JSON",
          }
        : {},
      body: payload ? JSON.stringify(payload) : undefined,
    });
    console.log("third");
    const data = await response.json();
    console.log(data);
    if (response.status >= 400)
      return {
        success: false,
        status: response.status,
        error: data,
      };
    const result = schema.safeParse(data);
    console.log("fifth");
    console.log(result);
    if (!result.success)
      return {
        success: false,
        status: response.status,
        error: await response.json(),
      };

    return { data: result.data, success: true, status: response.status };
  } catch (error) {
    return { success: false, status: null, error: "Network error" };
  }
};
