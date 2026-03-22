import express from "express";
import path, { dirname } from "path";
import { getEmperors, getEras } from "./data"
import { Emperor } from "./Emperors";
import { Era } from "./Emperors";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let emperors: Emperor[] = await getEmperors();
  const search = req.query.search as string;
  const sort = req.query.sort as string;
  const order = req.query.order as string;

  // FILTER
  if (search) {
    emperors = emperors.filter(e =>
      e.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // SORT
  if (sort) {
    emperors.sort((a: any, b: any) => {
      const valA = (a as any)[sort];
      const valB = (b as any)[sort];
      if (valA < valB) return order === "desc" ? 1 : -1;
      if (valA > valB) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  // Stuur alle variabelen naar de EJS template
  res.render("index", { emperors, search, sort, order });
});

// DETAIL EMPEROR
app.get("/emperors/:id", async (req, res) => {
  const emperors = await getEmperors();
  const emperor = emperors.find((e: any) => e.id === req.params.id);

  if (!emperor) {
    return res.status(404).send("Not found");
  }

  res.render("detail", { emperor });
});

// ERA 
app.get("/eras/:id", async (req, res) => {
  const emperors = await getEmperors();
  const eras = await getEras();

  const era = eras.find((e: any) => e.id === req.params.id);

  if (!era) {
    return res.status(404).send("Era not found");
  }

  const relatedEmperors = emperors.filter(
    (e: any) => e.era.id === era.id
  );

  res.render("era", { era, relatedEmperors });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});