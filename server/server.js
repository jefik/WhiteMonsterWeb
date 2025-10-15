const express = require("express");
const cors = require("cors");
const db = require("./db"); // Database connection
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "../public")));
// Set EJS as the view engine
app.set("view engine", "ejs");
// Changed Express look for files
app.set("views", path.join(__dirname, "../views"));

// ----------- API ------------

// Get all images from "images" table
app.get("/api/images", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM images");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all images from a specific section
app.get("/api/images/:section", async (req, res) => {
  try {
    const section = req.params.section;
    const [rows] = await db.query("SELECT * FROM images WHERE section = ?", [section]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all products + their related images (JOIN)
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.name, p.description, p.price, i.url, i.alt_text
      FROM products p
      JOIN images i ON p.image_id = i.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get all news + their related images (JOIN)
app.get("/api/news", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT n.id, n.title, n.content, n.date, n.tags, i.url, i.alt_text
      FROM news n
      JOIN images i ON n.image_id = i.id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ----------- PAGES ----------

// Home page
// Loads: images, products, news
app.get("/", async (req, res) => {
  try {
    const [images] = await db.query("SELECT * FROM images");

    const [products] = await db.query(`
      SELECT p.id, p.name, p.description, p.price, i.url, i.alt_text, n.energy, n.fat, n.saturated_fat, 
             n.carbohydrates, n.sugar, n.protein, n.salt, n.caffeine, n.ingredients
      FROM products p
      JOIN images i ON p.image_id = i.id
      JOIN nutrition_facts n ON p.id = n.product_id
    `);

    const [news] = await db.query(`
      SELECT n.id, n.title, n.content, n.tags, n.date, i.url, i.alt_text
      FROM news n
      JOIN images i ON n.image_id = i.id
    `);

    // Render index.ejs
    res.render("index", { images, products, news });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while loading homepage");
  }
});

// Products page
app.get("/product", async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.id, p.name, p.description, p.price, i.url, i.alt_text, n.energy, n.fat, n.saturated_fat, 
             n.carbohydrates, n.sugar, n.protein, n.salt, n.caffeine, n.ingredients
      FROM products p
      JOIN images i ON p.image_id = i.id
      JOIN nutrition_facts n ON p.id = n.product_id
    `);

    // Render product.ejs
    res.render("product", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while loading product page");
  }
});

// Single product detail page
app.get("/product/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    // Get specific product by ID along with nutrition facts
    const [[product]] = await db.query(
      `SELECT p.id, p.name, p.description, p.full_description, p.price, i.url, i.alt_text, n.energy, n.fat, 
              n.saturated_fat, n.carbohydrates, n.sugar, n.protein, n.salt, n.caffeine, n.ingredients
       FROM products p
       JOIN images i ON p.image_id = i.id
       JOIN nutrition_facts n ON p.id = n.product_id
       WHERE p.id = ?`,
      [productId]
    );

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // All products for the Swiper
    const [products] = await db.query(`
      SELECT p.id, p.name, p.description, p.price, i.url, i.alt_text
      FROM products p
      JOIN images i ON p.image_id = i.id
    `);

    // Render product.ejs
    res.render("product", { product, products });
  } catch (err) {
    console.error("Error while loading product detail:", err);
    res.status(500).send("Server error");
  }
});

// Events page (list all events)
app.get("/events", async (req, res) => {
  try {
    const tagFilter = req.query.tag;
    const [events] = await db.query(`
      SELECT n.id, n.title, n.content, n.tags, n.date, i.url, i.alt_text
      FROM news n
      JOIN images i ON n.image_id = i.id
    `);

    // Extract and collect all unique tags
    let allTags = [];
    events.forEach((event) => {
      if (event.tags) {
        const splitTags = event.tags.split(",").map((tag) => tag.trim());
        allTags.push(...splitTags);
      }
    });
    allTags = [...new Set(allTags)]; // Only unique tags

    // Filtering by tag
    let filteredEvents = events;
    if (tagFilter) {
      filteredEvents = events.filter((event) => event.tags.toLowerCase().includes(tagFilter.toLowerCase()));
    }

    // Get newest event based on filter
    const newestEvent = filteredEvents.length > 0 ? filteredEvents[0] : null;

    // Send all required data to EJS
    res.render("events", {
      events: filteredEvents,
      tags: allTags,
      selectedTag: tagFilter || "All",
      newestEvent,
    });
  } catch (err) {
    console.error("Error while loading events:", err);
    res.status(500).send("Error while loading events page");
  }
});

// Events LOAD MORE
app.get("/events/load", async (req, res) => {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = 5;
    const tagFilter = req.query.tag;

    const [events] = await db.query(`
      SELECT n.id, n.title, n.content, n.tags, n.date, i.url, i.alt_text
      FROM news n
      JOIN images i ON n.image_id = i.id
      ORDER BY n.date DESC
    `);

    let filteredEvents = events;
    if (tagFilter && tagFilter.toLowerCase() !== "all") {
      filteredEvents = events.filter((event) => event.tags.toLowerCase().includes(tagFilter.toLowerCase()));
    }

    const nextEvents = filteredEvents.slice(offset, offset + limit);
    res.json(nextEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});
// Events LOADING LOGO

// Single event detail page
app.get("/event/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const [[event]] = await db.query(
      `SELECT n.id, n.title, n.content, n.tags, n.date, i.url, i.alt_text
       FROM news n
       JOIN images i ON n.image_id = i.id
       WHERE n.id = ?`,
      [eventId]
    );

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.render("event", { event });
  } catch (err) {
    console.error("Error while loading event detail:", err);
    res.status(500).send("Server error");
  }
});

// All FAQs
app.get("/api/faqs", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM faqs");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// FAQs by category
app.get("/api/faqs/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const [rows] = await db.query("SELECT * FROM faqs WHERE category = ?", [category]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// FAQ page
app.get("/faq", async (req, res) => {
  try {
    const [faqs] = await db.query(`
      SELECT id, category, question, answer, icon_url
      FROM faqs
      ORDER BY category, id
    `);

    res.render("faq", { faqs });
  } catch (err) {
    console.error("Error loading FAQ:", err);
    res.status(500).send("Error while loading FAQ page");
  }
});

// ----------------- Start the server -----------------¨

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
