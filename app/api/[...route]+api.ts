import { Hono } from "hono"

/**
 * Create Hono app instance
 * Note: We don't use basePath here as we define full paths in routes
 * to avoid conflicts with Expo Router's path handling
 */
const app = new Hono()

// Define API routes
app.get("/api/hello", async (c) => {
  return c.json({ message: "Hello from Hono API!" })
})

// Add more routes as needed
// app.post("/api/users", async (c) => { ... })
// app.put("/api/items/:id", async (c) => { ... })

/**
 * Export the Hono app for middleware use
 */
export default app

/**
 * Export standard Expo Router handlers to ensure compatibility
 * These handlers forward requests to the Hono app
 */
export const GET = async (request: Request) => {
  try {
    return await app.fetch(request)
  } catch (error) {
    console.error("Error in GET handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const POST = async (request: Request) => {
  try {
    return await app.fetch(request)
  } catch (error) {
    console.error("Error in POST handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Add other HTTP method handlers as needed
export const PUT = async (request: Request) => {
  try {
    return await app.fetch(request)
  } catch (error) {
    console.error("Error in PUT handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export const DELETE = async (request: Request) => {
  try {
    return await app.fetch(request)
  } catch (error) {
    console.error("Error in DELETE handler:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
