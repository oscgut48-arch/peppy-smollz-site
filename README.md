# Peppy Smollz Site

This is the official one‑page site for **Peppy Smollz**, built with [Next.js 14](https://nextjs.org/) using the App Router.  Styling is done with Tailwind CSS, animations use Framer Motion, and icons are provided by lucide-react.  The site renders everything from a single JSON file so that you can update content without touching the code.

## Development

To run the site locally, clone the repository and install dependencies:

```bash
npm install
npm run dev
```

This will start the development server at http://localhost:3000.

To build for production:

```bash
npm run build
npm run start
```

## Updating Content

All copy, media and links are defined in `src/data/content.json`.  Editing this file updates the live site without any code changes.

### Adding a New Track

1. Drop your MP3 file into the `public/audio/` folder.
2. Add a new entry in the `tracks` array inside `src/data/content.json`:

```json
{
  "title": "My New Song",
  "type": "mp3",
  "src": "/audio/my-new-song.mp3"
}
```

For streaming embeds, set `"type": "embed"` and provide an `embedUrl` instead.

### Adding a New Image

1. Place your image in the `public/images/` folder.
2. Append the file path (e.g. `"/images/my-photo.jpg"`) to the `gallery` array in `content.json`.

The gallery will automatically display all images in this array.

### Changing the Hero Section

Update the `hero` object in `content.json`.  You can change the `headline`, `subhead` or replace the `image` with a new file path in `public/images/`.

### Updating the Roadmap, Lore or Social Links

- `lore`: a string describing the story behind Peppy Smollz.
- `roadmap`: an array of phases with `phase` and `items` fields.
- `social`: update the URLs for `x`, `discord`, `youtube` or `audius`.

### Changing the Email Endpoint

The email capture form posts to Formspree.  To change the endpoint, update `formspree.endpoint` in `content.json` with your new Formspree form ID.

## Deployment

The site is ready to be deployed on [Vercel](https://vercel.com/).  Import the repository, leave the build command and output directory set to their defaults, and deploy.  All necessary environment variables are already built into `content.json`.

---

If you have any questions or need help making changes, feel free to reach out!
